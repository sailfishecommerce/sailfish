import { useQueryClient } from "react-query";

import swellClientInit from "@/lib/config";
import { useAppSelector } from "./useRedux";

export default function useCurrency() {
  const { swell, initializeSwell } = swellClientInit();
  initializeSwell();

  const { currency } = useAppSelector((state) => state.currencyLanguage);
  const queryClient = useQueryClient();

  function getCurrencies() {
    const currencies = queryClient.getQueryData("currencies");
    return currencies;
  }
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
    selectCurrencies,
    getSelectedCurrencies,
    currency,
    getCurrencies,
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
