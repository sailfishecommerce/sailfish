import aa from "search-insights";
import useAlgoliaInsight from "./useAlgoliaInsight";

import { useAppSelector } from "./useRedux";

export default function useAlgoliaEvents() {
  const { userToken }: any = useAlgoliaInsight();

  function clickedObjectIDsAfterSearch(
    insights: (
      arg0: string,
      arg1: { eventName: string; userToken: string; queryID: string }
    ) => void,
    queryID: string
  ) {
    if (userToken) {
      insights("clickedObjectIDsAfterSearch", {
        eventName: "Product Clicked after searching",
        userToken,
        queryID,
      });
    }
  }

  function itemViewed(eventName: string, index: string, objectIDs: string[]) {
    aa("viewedObjectIDs", {
      eventName,
      userToken,
      index,
      objectIDs,
    });
  }

  function filterViewed(index: string, filters: string[]) {
    aa("viewedFilters", {
      eventName: "filter_viewed",
      userToken,
      index,
      filters,
    });
  }

  function filterClicked(index: string, filters: string[]) {
    aa("clickedFilters", {
      eventName: "filter_clicked",
      userToken,
      index,
      filters,
    });
  }

  function productAddedToCart(index: string, objectIDs: string[]) {
    aa("convertedObjectIDs", {
      eventName: "product_added_to_cart",
      userToken,
      index,
      objectIDs,
    });
  }

  function productAddedToCartAfterSearch(
    index: string,
    queryID: string,
    objectIDs: string[]
  ) {
    aa("convertedObjectIDsAfterSearch", {
      eventName: "product_added_to_cart_after_search",
      userToken,
      queryID,
      index,
      objectIDs,
    });
  }

  function itemClicked(eventName: string, index: string, objectIDs: string[]) {
    aa("clickedObjectIDs", {
      eventName,
      userToken,
      index,
      objectIDs,
    });
  }

  return {
    clickedObjectIDsAfterSearch,
    filterViewed,
    filterClicked,
    productAddedToCart,
    itemClicked,
    productAddedToCartAfterSearch,
    itemViewed,
  };
}
