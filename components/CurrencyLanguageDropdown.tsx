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
  const currencies: any = queryClient.getQueryData("currencies");

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
    <div
      className={`${styles.dropdown} ${footerStyle} border border-primary py-2 px-4 topbar-text`}
    >
      <div className={`${styles.dropdownToggle} topbar-link`}>
        <img className="me-2" src="/img/flags/en.png" width="20" alt="en" />
        {`En / ${currency}`}
      </div>
    </div>
  );
}

const CurrencyLanguageDropdown = memo(CurrencyLanguageDropdownComponent);

export default CurrencyLanguageDropdown;

CurrencyLanguageDropdown.whyDidYouRender = true;
