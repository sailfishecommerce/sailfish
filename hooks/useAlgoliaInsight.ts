/* eslint-disable react-hooks/exhaustive-deps */
import aa from "search-insights";

import { useAppSelector } from "./useRedux";

import searchClient from "@/lib/algoliaConfig";

export default function useAlgoliaInsight() {
  const { userToken }: any = useAppSelector((state) => state.user);

  aa("init", {
    appId: "CZT5MA7JLJ",
    apiKey: `${process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY}`,
  });

  searchClient.search([
    { indexName: "New_Livehealthy_products_index", params: { userToken } },
  ]);

  return {
    userToken,
  };
}
