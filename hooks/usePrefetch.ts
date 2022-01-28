import { useQueryClient } from "react-query";
import useCategory from "@/hooks/useCategory";
import useCurrency from "./useCurrency";
import useAccount from "@/hooks/useAccount";
import useSwellCart from "./useSwellCart";

export default function usePrefetch() {
  const { listEnabledCurrencies } = useCurrency();
  const { listAllCategory } = useCategory();
  const { getUserAccount } = useAccount();
  const { getACart } = useSwellCart();

  const queryClient = useQueryClient();

  async function getCategories() {
    await queryClient.fetchQuery("listAllCategory", listAllCategory, {
      staleTime: Infinity,
    });
  }

  async function fetchCurrencies() {
    await queryClient.fetchQuery("currencies", listEnabledCurrencies, {
      staleTime: Infinity,
    });
  }

  async function getUserAccountDetails() {
    await queryClient.fetchQuery("getAccount", getUserAccount, {
      staleTime: Infinity,
    });
  }

  async function getCart() {
    await queryClient.fetchQuery("cart", getACart);
  }

  return {
    getCategories,
    fetchCurrencies,
    getUserAccountDetails,
    getCart,
  };
}
