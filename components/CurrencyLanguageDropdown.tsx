/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect, memo } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateCurrency } from "@/redux/currency-language-slice";
import useCurrency from "@/hooks/useCurrency";
import { useToast } from "@/hooks";
import styles from "@/styles/Dropdown.module.css";
import useSwellCart from "@/hooks/useSwellCart";
import { updateCart } from "@/redux/cart-slice";

interface Props {
  position?: string;
}

function CurrencyLanguageDropdownComponent({ position }: Props) {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccessful, hasError } = useToast();
  const { currencies, selectCurrencies } = useCurrency();
  const { currency } = useAppSelector((state) => state.currencyLanguage);
  const footerStyle = position === "bottom" ? styles.bottom : "";
  const { getACart } = useSwellCart();

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

  useEffect(() => {
    function updateCartAfterCurrencyChange() {
      getACart()
        .then((response) => {
          dispatch(updateCart(response));
        })
        .catch(() =>
          toast.error("unable to update cart after currency change")
        );
    }
    updateCartAfterCurrencyChange();
  }, [currency]);

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
      <Dropdown.Menu>
        <Dropdown.Item>
          <select
            onChange={selectCurrency}
            className="form-select form-select-sm"
          >
            <option>Select Currency</option>
            {currencies &&
              currencies.map((currency: any) => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code}
                </option>
              ))}
          </select>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const CurrencyLanguageDropdown = memo(CurrencyLanguageDropdownComponent);

export default CurrencyLanguageDropdown;

CurrencyLanguageDropdown.whyDidYouRender = true;
