import { useMutation, useQueryClient } from "react-query";
import { useRef } from "react";

import { useToast } from "@/hooks";
import useSwellCart from "@/hooks/useSwellCart";

export default function useMutationAction() {
  const queryClient = useQueryClient();
  const toastID = useRef(null);
  const { loadingToast, updateToast } = useToast();
  const {
    updateCartItemQuantity,
    applyGiftCode,
    addToCart,
    addToCartModal,
    removeCartItem,
  } = useSwellCart();

  function useUpdateCartItem() {
    return useMutation(
      ({ product, quantity }: any) => updateCartItemQuantity(product, quantity),
      {
        onMutate: () => {
          loadingToast(toastID);
        },
        onSettled: () => {
          queryClient.invalidateQueries("cart");
        },
        onSuccess: () => {
          updateToast(toastID, "success", "product updated");
        },
        onError: () => {
          updateToast(toastID, "error", "error updating product");
        },
      }
    );
  }

  function useAddItemToCart() {
    return useMutation(
      ({ product, quantity }: any) => addToCart(product, quantity),
      {
        onMutate: () => {
          loadingToast(toastID);
        },
        onSettled: () => {
          queryClient.invalidateQueries("cart");
        },
        onSuccess: (_, variables) => {
          updateToast(toastID, "success", `${variables.product.name} added`);
        },
        onError: () => {
          updateToast(toastID, "error", "error adding product");
        },
      }
    );
  }

  function useRemoveFromCart() {
    return useMutation((item: any) => removeCartItem(item), {
      onMutate: () => {
        loadingToast(toastID);
      },
      onSettled: () => {
        queryClient.invalidateQueries("cart");
      },
      onSuccess: (_, variables, context) => {
        updateToast(toastID, "success", `${variables.product.name} removed`);
      },
      onError: () => {
        updateToast(toastID, "error", "error removing product");
      },
    });
  }

  function useAddItemToCartModal() {
    return useMutation(
      ({ product, productQty, selectedOptions }: any) =>
        addToCartModal(product, productQty, selectedOptions),
      {
        onSettled: () => {
          queryClient.invalidateQueries("cart");
        },
        onMutate: () => {
          loadingToast(toastID);
        },
        onSuccess: (_, variables, context) => {
          updateToast(toastID, "success", `${variables.product.name} added`);
        },
        onError: () => {
          updateToast(toastID, "error", "error adding product");
        },
      }
    );
  }

  return {
    useUpdateCartItem,
    useAddItemToCart,
    useRemoveFromCart,
    useAddItemToCartModal,
  };
}
