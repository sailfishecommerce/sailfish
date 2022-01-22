import swellClientInit from "@/lib/config";
import { cartDetailsType, productOptionType, productType } from "@/types";

export default function useSwellCart() {
  const { swell, initializeSwell } = swellClientInit();
  initializeSwell();

  async function getACart() {
    return await swell.cart.get();
  }

  async function addToCart(product: productType, quantity: number) {
    return await swell.cart.addItem({
      product_id: product.id,
      quantity,
    });
  }

  async function addToCartModal(
    product: productType,
    productQuantity: any,
    productOptions: productOptionType
  ) {
    return await swell.cart.addItem({
      product_id: product.id,
      quantity: productQuantity,
      options: productOptions,
    });
  }

  async function updateCartItem(product: any) {
    return await swell.cart.updateItem(product.id, product.updateData);
  }

  async function updateCartItemQuantity(
    product: productType,
    quantity: number
  ) {
    return await swell.cart.updateItem(product.id, {
      quantity,
    });
  }

  async function updateAllCartItem(data: any[]) {
    return await swell.cart.setItems(data);
  }

  async function removeCartItem(product: { id: string }) {
    console.log("product rmo", product);
    return await swell.cart.removeItem(product.id);
  }

  async function emptyCart() {
    return await swell.cart.setItems([]);
  }

  async function recoverCart(checkoutId: string) {
    return await swell.cart.recover(checkoutId);
  }

  async function submitOrder() {
    return await swell.cart.submitOrder();
  }

  async function updateCartBilling(cartDetails: cartDetailsType) {
    return await swell.cart.update({
      billing: {
        name: cartDetails.name,
        address1: cartDetails.address1,
        address2: cartDetails.address2,
        city: cartDetails.city,
        state: cartDetails.state,
        zip: cartDetails.zip,
        country: cartDetails.country,
        card: {
          token: cartDetails.token,
        },
      },
    });
  }

  async function applyGiftCode(code: string) {
    return await swell.cart.applyCoupon(code);
  }
  return {
    getACart,
    addToCart,
    updateCartItem,
    updateAllCartItem,
    removeCartItem,
    updateCartItemQuantity,
    emptyCart,
    recoverCart,
    submitOrder,
    applyGiftCode,
    updateCartBilling,
    addToCartModal,
  };
}
