export interface ProductReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
  weight?: number;
  reviews?: ProductReview[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

export interface DummyCartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface DummyCartResponse {
  id: number;
  products: DummyCartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantities: number;
}
