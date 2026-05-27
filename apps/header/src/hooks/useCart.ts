import { useNavigate } from "react-router-dom";
import {
  closeCart,
  openCart,
  removeFromCart,
  selectCartCount,
  selectCartIsOpen,
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  useAppDispatch,
  useAppSelector,
} from "@greencart/store";

export function useCart() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectCartTotal);
  const isOpen = useAppSelector(selectCartIsOpen);

  const handleOpen = () => dispatch(openCart());
  const handleClose = () => dispatch(closeCart());

  const handleCheckout = () => {
    dispatch(closeCart());
    navigate("/checkout");
  };

  const handleUpdateQuantity = (id: number, quantity: number) =>
    dispatch(updateQuantity({ id, quantity }));

  const handleRemove = (id: number) => dispatch(removeFromCart(id));

  return {
    items,
    count,
    total,
    isOpen,
    handleOpen,
    handleClose,
    handleCheckout,
    handleUpdateQuantity,
    handleRemove,
  };
}
