/* eslint-disable @next/next/no-img-element */
import { useQuery } from "react-query";
import { useAppDispatch } from "@/hooks/useRedux";
import { quickViewModal } from "@/redux/ui-slice";
import useCart from "@/hooks/useCart";
import useProductOptions from "@/hooks/useProductOptions";
import useVbout from "@/hooks/useVbout";
import useAlgoliaEvents from "@/hooks/useAlgoliaEvents";
import { productType } from "@/types";
import useSwellCart from "./useSwellCart";

export default function useProduct(product: productType) {
  const { addItemToCart, cart }: any = useCart();
  const { getACart } = useSwellCart();
  const { data, status } = useQuery("getCart", getACart);
  const { optionHandler } = useProductOptions();
  const { addProductViewVbout, addCartItemVbout } = useVbout();
  const { itemViewed, productAddedToCart } = useAlgoliaEvents();
  const dispatch = useAppDispatch();

  function quickViewHandler(product: any) {
    const itemId =
      product.objectID !== undefined ? product.objectID : [product.id];
    itemViewed("quick_view_of_product_by_modal", itemId);
    dispatch(quickViewModal(product));
  }

  function addCartItemVboutHandler() {
    const content = {
      email: cart?.account?.email || "",
      id: product.id,
      cartId: cart?.id || product.id,
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      productImage: product.images[0].file.url,
    };
    addCartItemVbout(content);
  }

  function addToCartHandler(e: any) {
    e.preventDefault();
    addItemToCart(product);
    // tcjs("trigger", "hm", "add-product-to-cart");
    // addCartItemVboutHandler();
    productAddedToCart([product.objectID]);
  }

  function addProductViewVboutHandler() {
    const data = {
      id: product.slug,
      productId: product.id,
      productName: product.name,
      price: product.price,
      productImage: product.images[0].file.url,
      description: product.description,
      link: `/products/${product.slug}`,
    };
    addProductViewVbout(data);
  }

  function productViewEvent() {
    addProductViewVboutHandler();
    itemViewed("product_viewed", [product.objectID]);
  }

  return {
    productViewEvent,
    addToCartHandler,
    quickViewHandler,
    optionHandler,
  };
}
