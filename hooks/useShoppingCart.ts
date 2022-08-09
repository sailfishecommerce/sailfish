import useMutationAction from "@/hooks/useMutationAction";

export default function useShoppingCart() {
  const { useRemoveFromCart, useAddItemToCartModal, useUpdateCartItem } =
    useMutationAction();

  const { useAddItemToCart } = useMutationAction();
  const removeCartItem = useRemoveFromCart();
  const addItemToCart = useAddItemToCart();
  const addItemToCartModal = useAddItemToCartModal();
  const updateCartItem = useUpdateCartItem();

  return {
    addItemToCart,
    removeCartItem,
    addItemToCartModal,
    updateCartItem,
  };
}
