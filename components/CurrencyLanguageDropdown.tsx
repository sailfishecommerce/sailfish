/* eslint-disable @next/next/no-img-element */
import { Dropdown } from "react-bootstrap";

import currencylanguage from "@/json/CurrencyLanguage.json";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateCurrency } from "@/redux/currency-language-slice";
import useCurrency from "@/hooks/useCurrency";
import { useToast } from "@/hooks";
import styles from "@/styles/Dropdown.module.css";

interface Props {
  position?: string;
}

export default function CurrencyLanguageDropdown({ position }: Props) {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccessful, hasError } = useToast();
  const { currencies, selectCurrencies } = useCurrency();
  const { currency } = useAppSelector((state) => state.currencyLanguage);
  const footerStyle = position === "bottom" ? styles.bottom : "";

  function selectCurrency(e: any): any {
    const loading = isLoading();
    return selectCurrencies(e.target.value)
      .then((response) => {
        console.log("response", response);
        isSuccessful(loading, `${response.currency} selected`);
        dispatch(updateCurrency(response.currency));
      })
      .catch((error) => {
        hasError(loading, "an error occured, please try again");
        dispatch(updateCurrency("USD"));
        console.error("error", error);
      });
  }

  return (
    <Dropdown
      className={`${styles.dropdown} ${footerStyle} topbar-text dropdown disable-autohide`}
    >
      <Dropdown.Toggle className={`${styles.dropdownToggle} topbar-link dropdown-toggle`}>
        <img className="me-2" src="/img/flags/en.png" width="20" alt="en" />
        {`En / ${currency}`}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <select
            onChange={selectCurrency}
            className="form-select form-select-sm"
          >
            {currencies &&
              currencies.map((currency: any) => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code}
                </option>
              ))}
          </select>
        </Dropdown.Item>
        {currencylanguage.language.map((language) => (
          <Dropdown.Item key={language.label} className="pb-1">
            <img
              className="me-2"
              src={language.img}
              width="20"
              alt={language.alt}
            />
            {language.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
