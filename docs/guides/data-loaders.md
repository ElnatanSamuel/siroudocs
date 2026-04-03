# Data Loaders

Data Loaders let you attach an async fetch function directly to a route definition. The loader runs **before** the route renders, so your component receives data immediately no loading spinner required.

---

## Defining a Loader

```typescript
import { defineRoutes } from "@sirou/core";

const routes = defineRoutes({
  products: {
    path: "/products",
    children: {
      details: {
        path: "/:productId",
        params: { productId: "string" },
        loader: async ({ params }) => {
          const res = await fetch(`/api/products/${params.productId}`);
          if (!res.ok) throw new Error("Product not found");
          return res.json();
        },
      },
    },
  },
});
```

The `loader` receives the same `GuardContext` as a guard:

```typescript
loader: async ({ route, params, meta }) => {
  // route  the matched path string
  // params  extracted route params
  // meta    route metadata
};
```

---

## Accessing Loader Data

Use the `useRouteData` hook:

```tsx
// React
import { useRouteData } from "@sirou/react";

interface Product {
  id: string;
  name: string;
  price: number;
}

function ProductDetails() {
  const product = useRouteData<Product>();

  if (!product) return <p>Loading...</p>;
  return (
    <div>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
    </div>
  );
}
```

Or access it from the router directly:

```typescript
const data = router.getLoaderData("products.details");
```

---

## Loaders and Guards Execution Order

1. **Guards run first.** If a guard blocks navigation, the loader is never called.
2. **Loader runs.** Data is stored in the router's internal loader map.
3. **Route renders.** `useRouteData()` returns the stored data.

---

## Error Handling

If a loader throws, the error is logged to the console and navigation still completes. The route renders with `undefined` loader data.

To handle errors gracefully, catch them inside the loader and return an error state:

```typescript
loader: async ({ params }) => {
  try {
    const res = await fetch(`/api/products/${params.productId}`);
    return res.json();
  } catch (e) {
    return { error: "Failed to load product" };
  }
},
```

---

## Loaders on Initial Load

When `initialize()` is called (automatically by the React/React Native providers), Sirou also runs the loader for the initial route.
