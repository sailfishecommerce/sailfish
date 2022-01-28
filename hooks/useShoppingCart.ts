import useMutationAction from "./useMutationAction";

export default function useShoppingCart() {
  const {
    useRemoveFromCart,
    dataStatus,
    useAddItemToCartModal,
    useUpdateCartItem,
  } = useMutationAction();

  const { useAddItemToCart } = useMutationAction();
  const removeCartItem = useRemoveFromCart();
  const addItemToCart = useAddItemToCart();
  const addItemToCartModal = useAddItemToCartModal();
  const updateCartItem = useUpdateCartItem();

  return {
    addItemToCart,
    dataStatus,
    removeCartItem,
    addItemToCartModal,
    updateCartItem,
  };
}
