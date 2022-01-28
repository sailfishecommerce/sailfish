import { useMutation, useQueryClient } from "react-query";
import { useToast } from "@/hooks";
import useSwellCart from "./useSwellCart";

export default function useMutationAction() {
  const queryClient = useQueryClient();
  const {
    updateCartItemQuantity,
    applyGiftCode,
    addToCart,
    addToCartModal,
    removeCartItem,
  } = useSwellCart();
  const { errorToast, loadToast, successToast } = useToast();

  function useUpdateCartItem() {
    return useMutation(
      ({ product, quantity }: any) => updateCartItemQuantity(product, quantity),
      {
        onSettled: () => {
          queryClient.invalidateQueries("cart");
        },
      }
    );
  }

  function useAddItemToCart() {
    return useMutation(
      ({ product, quantity }: any) => addToCart(product, quantity),
      {
        onSettled: () => {
          queryClient.invalidateQueries("cart");
        },
      }
    );
  }

  function useRemoveFromCart() {
    return useMutation((item: any) => removeCartItem(item), {
      onSettled: () => {
        queryClient.invalidateQueries("cart");
      },
    });
  }

  function dataStatus(mutationKey: any, success: string, error?: string) {
    const errorData = error ? error : mutationKey.error;

    return mutationKey.status === "error"
      ? errorToast(errorData)
      : mutationKey.status === "loading"
      ? loadToast()
      : successToast(success);
  }

  function useAddItemToCartModal() {
    return useMutation(
      ({ product, productQty, selectedOptions }: any) =>
        addToCartModal(product, productQty, selectedOptions),
      {
        onSettled: () => {
          queryClient.invalidateQueries("cart");
        },
      }
    );
  }

  return {
    useUpdateCartItem,
    useAddItemToCart,
    useRemoveFromCart,
    dataStatus,
    useAddItemToCartModal,
  };
}
