import { useQueryClient } from "react-query";

export default function useShoppingCart() {
  const queryClient = useQueryClient();

  function getShopCart():any {
    const cart = queryClient.getQueryData("getCart");
    return cart;
  }

  return {
    getShopCart,
  };
}
