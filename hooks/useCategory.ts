import swellClientInit from "@/lib/config";
import { useQuery } from "react-query";

export default function useCategory() {
  const { swell, initializeSwell } = swellClientInit();
  initializeSwell();

  async function listAllCategory() {
    return await swell.categories.list({
      limit: 25,
    });
  }
  async function getACategory(categoryIdOrSlug: string) {
    console.log("categoryIdOrSlug", categoryIdOrSlug);
    return await swell.categories.get(categoryIdOrSlug);
  }
  async function getProductsInACategory(slug: string) {
    return await swell.products.list({
      category: slug,
      limit: 25,
      page: 1,
    });
  }
  async function useCategoryProducts(slug: string) {
    const { data, status } = useQuery("useCategoryProducts", () =>
      getProductsInACategory(slug)
    );
    return {
      data,
      status,
    };
  }

  return {
    listAllCategory,
    getACategory,
    getProductsInACategory,
    useCategoryProducts,
  };
}
