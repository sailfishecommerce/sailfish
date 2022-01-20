import axios from "axios";
import { useQuery } from "react-query";

import useSwellProducts from "./useSwellProducts";
import useRequest from "./useRequest";

export default function useAlgoliaIndex() {
  const { allProducts } = useSwellProducts();
  const { data, status } = useQuery("allProducts", allProducts);
  const { useCategories } = useRequest();
  const { categoryData, categoryStatus } = useCategories();

  function addProductToAlgoliaIndex() {
    axios
      .post("/api/add-products-to-algolia-index", data?.results)
      .then((response) => {
        console.log("response addProductToAlgoliaIndex", response);
      })
      .catch((error) => console.error("error addProductToAlgoliaIndex", error));
  }

  function addCategoriesToAlgoliaIndex() {
    axios
      .post("/api/add-products-to-algolia-index", categoryData?.results)
      .then((response) => {
        console.log("response addProductToAlgoliaIndex", response);
      })
      .catch((error) => console.error("error addProductToAlgoliaIndex", error));
  }

  return {
    addProductToAlgoliaIndex,
    status,
    categoryStatus,
    addCategoriesToAlgoliaIndex,
  };
}
