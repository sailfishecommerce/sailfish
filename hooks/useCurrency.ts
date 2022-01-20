import swell from "swell-js";
import { useQuery } from "react-query";
import { useAppSelector } from "./useRedux";

export default function useCurrency() {
  const { data: currencies } = useQuery("currencies", listEnabledCurrencies);
  const { currency } = useAppSelector((state) => state.currencyLanguage);
  async function listEnabledCurrencies() {
    return await swell.currency.list();
  }

  async function selectCurrencies(currency: string) {
    return await swell.currency.select(currency);
  }

  async function getSelectedCurrencies() {
    return await swell.currency.selected();
  }
  return {
    listEnabledCurrencies,
    currencies,
    selectCurrencies,
    getSelectedCurrencies,
    currency,
  };
}

export function currencySymbolFormatter(currency: {
  symbol: string;
  code: string;
}) {
  const currencyCode = currency ? currency.code : "";
  if (currency.symbol === "$" && currency.code !== "USD") {
    return `${currencyCode} ${currency.symbol}`;
  } else {
    return currency.symbol;
  }
}
