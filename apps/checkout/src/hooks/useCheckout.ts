import {
  clearCart,
  selectCartItems,
  selectCartTotal,
  setLastOrderId,
  useAddCartMutation,
  useAppDispatch,
  useAppSelector,
} from "@greencart/store";

const DEFAULT_USER_ID = 1;

export function useCheckout(onOrderPlaced: (orderId: number) => void) {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const [addCart, { isLoading, error }] = useAddCartMutation();

  const handleConfirm = async () => {
    const result = await addCart({
      userId: DEFAULT_USER_ID,
      products: items.map((item) => ({ id: item.id, quantity: item.quantity })),
    });
    if ("data" in result && result.data) {
      dispatch(setLastOrderId(result.data.id));
      dispatch(clearCart());
      onOrderPlaced(result.data.id);
    }
  };

  return { items, total, isLoading, error, handleConfirm };
}
