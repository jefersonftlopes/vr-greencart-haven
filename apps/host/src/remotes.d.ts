declare module "header/Header" {
  const Header: React.ComponentType;
  export default Header;
}
declare module "footer/Footer" {
  const Footer: React.ComponentType;
  export default Footer;
}
declare module "cards/ProductList" {
  const ProductList: React.ComponentType;
  export default ProductList;
}
declare module "cards/ProductCard" {
  import type { Product } from "@greencart/types";
  const ProductCard: React.ComponentType<{ product: Product }>;
  export default ProductCard;
}
declare module "checkout/CheckoutPage" {
  const CheckoutPage: React.ComponentType;
  export default CheckoutPage;
}
declare module "checkout/OrderSuccessPage" {
  const OrderSuccessPage: React.ComponentType;
  export default OrderSuccessPage;
}
