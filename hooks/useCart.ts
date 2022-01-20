import useToast from "@/hooks/useToast";
import useSwellCart from "@/hooks/useSwellCart";
import { useAppDispatch } from "@/redux/store";
import { updateCart } from "@/redux/cart-slice";
import { toggleSlideCart } from "@/redux/ui-slice";
import { useAppSelector } from "./useRedux";
import { productOptionType, productType, useCartType } from "@/types";
import useLoading from "./useLoading";

export default function useCart() {
  const { isLoading, isSuccessful, hasError } = useToast();
  const {
    updateCartItemQuantity,
    applyGiftCode,
    addToCart,
    addToCartModal,
    removeCartItem,
  } = useSwellCart();
  const dispatch = useAppDispatch();
  const { slideCart } = useAppSelector((state) => state.UI);
  const { productOption } = useAppSelector((state) => state.product);
  const { cart }: useCartType = useAppSelector((state) => state.cart);
  const { updateLoadingState } = useLoading();

  function updateQuantity(product: any, quantity: number) {
    const toastId = isLoading();
    updateLoadingState();
    return updateCartItemQuantity(product, quantity)
      .then((response) => {
        dispatch(updateCart(response));
        isSuccessful(toastId, "updated successfully");
        console.log(
          "response increaseQuantity updateCartItemQuantity",
          response
        );
        updateLoadingState();
      })
      .catch((error) => {
        console.log("error updateCartItemQuantity", error);
        hasError(toastId, "an error occured, please check your network");
        updateLoadingState();
      });
  }

  function toggleCart() {
    dispatch(toggleSlideCart());
  }

  function addItemToCart(product: productType) {
    const toastId = isLoading();
    updateLoadingState();
    addToCart(product, productOption)
      .then((response) => {
        console.log("response addItemToCart", response);
        if (!response?.errors) {
          dispatch(updateCart(response));
          isSuccessful(toastId, `${product?.name} added to cart`);
          dispatch(toggleSlideCart());
        } else {
          hasError(toastId, response.errors.itemOptions.message);
        }
        updateLoadingState();
      })
      .catch((error) => {
        console.log("error addItemToCart", error);
        hasError(toastId, "an error occured, please check your network");
        updateLoadingState();
      });
  }

  function removeFromCart(item: any) {
    const toastId = isLoading();
    updateLoadingState();
    return removeCartItem(item)
      .then((response) => {
        dispatch(updateCart(response));
        isSuccessful(toastId, `${item.product.name} removed from cart`);
        updateLoadingState();
      })
      .catch((error) => {
        console.log("removeCartItem error", error);
        hasError(toastId, "an error occured, please check your network");
        updateLoadingState();
      });
  }

  function addItemToCartWithOptions(
    product: productType,
    productQty: number,
    selectedOptions: productOptionType
  ) {
    const toastId = isLoading();
    updateLoadingState();
    addToCartModal(product, productQty, selectedOptions)
      .then((response: any) => {
        if (!response?.errors) {
          dispatch(updateCart(response));
          isSuccessful(toastId, `${product?.name} added to cart`);
          dispatch(toggleSlideCart());
        } else {
          hasError(toastId, response.errors.itemOptions.message);
        }
        updateLoadingState();
      })
      .catch((error: { message: any }) => {
        hasError(toastId, `unable to add to cart ${error?.message}`);
        updateLoadingState();
      });
  }

  function applyDiscountCode(code: string) {
    updateLoadingState();
    const loading = isLoading();
    return applyGiftCode(code)
      .then((response) => {
        updateLoadingState();
        isSuccessful(loading, response?.message);
        console.log("response", response);
        return response;
      })
      .catch((error) => {
        console.error("error", error);
        hasError(loading, error?.message);
        updateLoadingState();
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
  };
}
