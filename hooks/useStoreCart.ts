/* eslint-disable react-hooks/exhaustive-deps */
import { ReactText } from "react";
import axios from "axios";
import formatCartItem from "@/lib/formatCart";
import { useAppDispatch } from "@/redux/store";
import { useAppSelector } from "./useRedux";
import useToast from "@/hooks/useToast";
import {
  updateCartId,
  updateStoreCartCurrency,
  updateStoreCartItem,
} from "@/redux/store-cart-slice";
import { updateCart } from "@/redux/cart-slice";

export default function useStoreCart(product: any) {
  const { currency } = useAppSelector((state) => state.currencyLanguage);
  const { cart } = useAppSelector((state) => state.storeCart);
  const dispatch = useAppDispatch();
  const { isLoading, isSuccessful, hasError } = useToast();

  console.log("cart.items.length", cart.items.length);

  function createCart() {
    const loading = isLoading();
    const cartItem = formatCartItem(product, currency, 1);
    console.log("product", product);
    dispatch(updateStoreCartItem(cartItem));
    dispatch(updateStoreCartCurrency(currency));
    createCartItem(loading, product.name, {
      items: [cartItem],
      display_currency: currency,
    });
  }

  function createCartItem(loading: ReactText, name: string, cart: any) {
    return axios
      .post("/api/cart/create", cart)
      .then((response: any) => {
        console.log("create cart", response);
        console.log("Rresponse.ID", response.id);
        dispatch(updateCartId(response.data.id));
        dispatch(updateCart(response.data));
        isSuccessful(loading, `${name} added to cart`);
      })
      .catch((error) => {
        console.log("error", error);
        hasError(loading, "an error occurred");
      });
  }

  function updateStoreCart() {
    const loading = isLoading();
    const cartItem = formatCartItem(product, currency, 1);
    dispatch(updateStoreCartItem(cartItem));
    dispatch(updateStoreCartCurrency(currency));
    const updatedCart = {
      id: cart.cartId,
      items: [...cart.items, cartItem],
    };
    console.log("updatedCart", updatedCart);
    updateCartItem(loading, product.name, {
      id: cart.cartId,
      cart: updatedCart,
    });
  }

  function updateCartItem(loading: ReactText, name: string, cart: any) {
    return axios
      .post("/api/cart/update", cart)
      .then((response: any) => {
        console.log("create cart", response);
        dispatch(updateCart(response.data));
        isSuccessful(loading, `${name} added to cart`);
      })
      .catch((error) => {
        console.log("error", error);
        hasError(loading, "an error occurred");
      });
  }

  function addToCart() {
    return cart.items.length === 0 ? createCart() : updateStoreCart();
  }

  return {
    addToCart,
  };
}
