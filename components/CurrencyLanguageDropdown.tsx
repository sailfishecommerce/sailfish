/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useQuery, useQueryClient } from "react-query";
import { Dropdown } from "react-bootstrap";
import { memo } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateCurrency } from "@/redux/currency-language-slice";
import useCurrency from "@/hooks/useCurrency";
import { useToast } from "@/hooks";
import styles from "@/styles/Dropdown.module.css";

interface Props {
  position?: string;
}

function CurrencyLanguageDropdownComponent({ position }: Props) {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccessful, hasError } = useToast();
  const { selectCurrencies } = useCurrency();
  const queryClient = useQueryClient();
  const currencies:any = queryClient.getQueryData("currencies");

  const { currency } = useAppSelector((state) => state.currencyLanguage);
  const footerStyle = position === "bottom" ? styles.bottom : "";

  function selectCurrency(e: any): any {
    const loading = isLoading();
    return selectCurrencies(e.target.value)
      .then((response) => {
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
      <Dropdown.Toggle
        className={`${styles.dropdownToggle} topbar-link dropdown-toggle`}
      >
        <img className="me-2" src="/img/flags/en.png" width="20" alt="en" />
        {`En / ${currency}`}
      </Dropdown.Toggle>
      {status === "error" ? (
        "unable to load currencies"
      ) : status === "loading" ? (
        "loading currencies"
      ) : (
        <Dropdown.Menu>
          <Dropdown.Item>
            <select
              onChange={selectCurrency}
              className="form-select form-select-sm"
            >
              <option>Select Currency</option>
              {currencies &&
                currencies?.map((currency: any) => (
                  <option key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code}
                  </option>
                ))}
            </select>
          </Dropdown.Item>
        </Dropdown.Menu>
      )}
    </Dropdown>
  );
}

const CurrencyLanguageDropdown = memo(CurrencyLanguageDropdownComponent);

export default CurrencyLanguageDropdown;

CurrencyLanguageDropdown.whyDidYouRender = true;
