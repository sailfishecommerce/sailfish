import aa from "search-insights";
import { useAppSelector } from "./useRedux";

export default function useAlgoliaEvents() {
  const { userToken }: any = useAppSelector((state) => state.user);

  function clickedObjectIDsAfterSearch(
    insights: (
      arg0: string,
      arg1: { eventName: string; userToken: string; queryID: string }
    ) => void,
    queryID: string
  ) {
    insights("clickedObjectIDsAfterSearch", {
      eventName: "Product Clicked after searching",
      userToken,
      queryID,
    });
  }

  function clickedProductAfterSearch(
    queryID: string,
    objectIDs: string[],
    positions: number[]
  ) {
    aa("clickedObjectIDsAfterSearch", {
      userToken,
      eventName: "Product clicked after a search",
      index: "New_Livehealthy_products_index",
      queryID,
      objectIDs,
      positions,
    });
  }

  function itemViewed(eventName: string, objectIDs: string[] | any) {
    aa("viewedObjectIDs", {
      eventName,
      userToken,
      index: "New_Livehealthy_products_index",
      objectIDs,
    });
  }

  function filterViewed(filters: string[]) {
    aa("viewedFilters", {
      eventName: "filter_viewed",
      userToken,
      index: "New_Livehealthy_products_index",
      filters,
    });
  }

  function filterClicked(filters: string[]) {
    aa("clickedFilters", {
      eventName: "filter_clicked",
      userToken,
      index: "New_Livehealthy_products_index",
      filters,
    });
  }

  function productAddedToCart(objectIDs: string[] | any) {
    aa("convertedObjectIDs", {
      eventName: "product_added_to_cart",
      userToken,
      index: "New_Livehealthy_products_index",
      objectIDs,
    });
  }

  function productAddedToCartAfterSearch(
    queryID: string,
    objectIDs: string[] | any
  ) {
    aa("convertedObjectIDsAfterSearch", {
      userToken,
      index: "New_Livehealthy_products_index",
      eventName: "product_added_to_cart_after_search",
      queryID,
      objectIDs,
    });
  }

  function itemClicked(eventName: string, objectIDs: string[]) {
    aa("clickedObjectIDs", {
      eventName,
      userToken,
      index: "New_Livehealthy_products_index",
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
    clickedProductAfterSearch,
  };
}
