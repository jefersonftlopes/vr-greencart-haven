import { http, HttpResponse } from "msw";

const PRODUCTS = [
  {
    id: 1,
    title: "Cabbage",
    description: "Fresh cabbage",
    category: "vegetables",
    price: 1.5,
    discountPercentage: 5,
    rating: 4.5,
    stock: 100,
    thumbnail: "https://example.com/cabbage.png",
    images: [],
    weight: 1,
  },
  {
    id: 2,
    title: "Apple",
    description: "Sweet apple",
    category: "fruits",
    price: 2.99,
    discountPercentage: 0,
    rating: 4.7,
    stock: 50,
    thumbnail: "https://example.com/apple.png",
    images: [],
    weight: 1,
  },
  {
    id: 3,
    title: "Orange Juice",
    description: "Fresh juice",
    category: "groceries",
    price: 5.5,
    discountPercentage: 10,
    rating: 4.3,
    stock: 30,
    thumbnail: "https://example.com/oj.png",
    images: [],
    weight: 1,
  },
];

const CATEGORIES_FULL = [
  { slug: "vegetables", name: "Vegetables", url: "/products/category/vegetables" },
  { slug: "fruits", name: "Fruits", url: "/products/category/fruits" },
];

/**
 * MSW handlers reutilizáveis para todos os testes.
 * Cobrem todas as rotas DummyJSON usadas pelo app.
 */
export const handlers = [
  http.get("https://dummyjson.com/products", ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit") ?? 30);
    const skip = Number(url.searchParams.get("skip") ?? 0);
    return HttpResponse.json({
      products: PRODUCTS.slice(skip, skip + limit),
      total: PRODUCTS.length,
      skip,
      limit,
    });
  }),

  http.get("https://dummyjson.com/products/category-list", () =>
    HttpResponse.json(CATEGORIES_FULL.map((c) => c.slug)),
  ),

  http.get("https://dummyjson.com/products/categories", () =>
    HttpResponse.json(CATEGORIES_FULL),
  ),

  http.get("https://dummyjson.com/products/category/:slug", ({ params }) => {
    const products = PRODUCTS.filter((p) => p.category === params.slug);
    return HttpResponse.json({
      products,
      total: products.length,
      skip: 0,
      limit: products.length,
    });
  }),

  http.get("https://dummyjson.com/products/search", ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q")?.toLowerCase() ?? "";
    const products = PRODUCTS.filter((p) => p.title.toLowerCase().includes(q));
    return HttpResponse.json({
      products,
      total: products.length,
      skip: 0,
      limit: products.length,
    });
  }),

  http.get("https://dummyjson.com/products/:id", ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === Number(params.id));
    if (!product) return HttpResponse.json({ message: "not found" }, { status: 404 });
    return HttpResponse.json(product);
  }),

  http.post("https://dummyjson.com/carts/add", async ({ request }) => {
    const body = (await request.json()) as {
      userId: number;
      products: Array<{ id: number; quantity: number }>;
    };
    const productsDetailed = body.products.map((p) => {
      const found = PRODUCTS.find((x) => x.id === p.id)!;
      return {
        id: p.id,
        title: found.title,
        price: found.price,
        quantity: p.quantity,
        thumbnail: found.thumbnail,
        total: found.price * p.quantity,
        discountPercentage: found.discountPercentage,
        discountedPrice: found.price * p.quantity * (1 - found.discountPercentage / 100),
      };
    });
    const total = productsDetailed.reduce((s, p) => s + p.total, 0);
    return HttpResponse.json({
      id: 42,
      userId: body.userId,
      products: productsDetailed,
      total,
      discountedTotal: total,
      totalProducts: productsDetailed.length,
      totalQuantities: productsDetailed.reduce((s, p) => s + p.quantity, 0),
    });
  }),
];
