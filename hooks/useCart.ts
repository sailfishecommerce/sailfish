import { useQuery, useQueryClient } from "react-query";
import useToast from "@/hooks/useToast";
import useSwellCart from "@/hooks/useSwellCart";
import { useAppDispatch } from "@/redux/store";
import { updateCart } from "@/redux/cart-slice";
import { toggleSlideCart } from "@/redux/ui-slice";
import { useAppSelector } from "./useRedux";
import { productOptionType, productType } from "@/types";

export default function useCart() {
  const { isLoading, isSuccessful, hasError } = useToast();
  const {
    updateCartItemQuantity,
    applyGiftCode,
    addToCart,
    addToCartModal,
    getACart,
    removeCartItem,
  } = useSwellCart();
  const dispatch = useAppDispatch();
  const { slideCart } = useAppSelector((state) => state.UI);
  const queryClient = useQueryClient();
  const cart = queryClient.getQueryData("cart");

  function updateQuantity(product: any, quantity: number) {
    const toastId = isLoading();

    return updateCartItemQuantity(product, quantity)
      .then((response) => {
        dispatch(updateCart(response));
        isSuccessful(toastId, "updated successfully");
        console.log(
          "response increaseQuantity updateCartItemQuantity",
          response
        );
      })
      .catch((error) => {
        console.log("error updateCartItemQuantity", error);
        hasError(toastId, "an error occured, please check your network");
      });
  }

  const useCartData = () => useQuery("cart", getACart);

  function toggleCart() {
    dispatch(toggleSlideCart());
  }

  function addItemToCart(product: productType, quantity: number) {
    const toastId = isLoading();

    addToCart(product, quantity)
      .then((response) => {
        console.log("response addItemToCart", response);
        dispatch(updateCart(response));
        isSuccessful(toastId, `${product?.name} added to cart`);
        dispatch(toggleSlideCart());
      })
      .catch((error) => {
        console.log("error addItemToCart", error);
        hasError(toastId, error);
      });
  }

  function removeFromCart(item: any) {
    const toastId = isLoading();
    return removeCartItem(item)
      .then((response) => {
        dispatch(updateCart(response));
        isSuccessful(toastId, `${item.product.name} removed from cart`);
      })
      .catch((error) => {
        console.log("removeCartItem error", error);
        hasError(toastId, "an error occured, please check your network");
      });
  }

  function addItemToCartWithOptions(
    product: productType,
    productQty: number,
    selectedOptions: productOptionType
  ) {
    const toastId = isLoading();

    addToCartModal(product, productQty, selectedOptions)
      .then((response: any) => {
        if (!response?.errors) {
          dispatch(updateCart(response));
          isSuccessful(toastId, `${product?.name} added to cart`);
          dispatch(toggleSlideCart());
        } else {
          hasError(toastId, response.errors.itemOptions.message);
        }
      })
      .catch((error: { message: any }) => {
        hasError(toastId, `unable to add to cart ${error?.message}`);
      });
  }

  function applyDiscountCode(code: string) {
    const loading = isLoading();
    return applyGiftCode(code)
      .then((response) => {
        isSuccessful(loading, response?.message);
        console.log("response", response);
        return response;
      })
      .catch((error) => {
        console.error("error", error);
        hasError(loading, error?.message);

        return error;
      });
  }

  return {
    updateQuantity,
    toggleCart,
    slideCart,
    cart,
    addItemToCartWithOptions,
    addItemToCart,
    applyDiscountCode,
    removeFromCart,
    useCartData,
  };
}
