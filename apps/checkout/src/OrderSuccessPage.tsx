import "./i18n";
import { OrderSuccess } from "./components/OrderSuccess";
import { useAppSelector, selectLastOrderId } from "@greencart/store";

export default function OrderSuccessPage() {
  const orderId = useAppSelector(selectLastOrderId);
  return <OrderSuccess orderId={orderId} />;
}
