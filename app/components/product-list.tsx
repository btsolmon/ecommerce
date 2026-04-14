import { Product } from "../types";
import { ProductCard } from "./product-card";

export const ProductList = ({
  products,
  loading,
  error,
  total,
}: {
  products: Product[];
  loading: boolean;
  error: string;
  total: number;
}) => {
  if (loading) {
    return <div className="py-20 text-center text-zinc-500">Loading...</div>;
  }
  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }
  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-zinc-500">Product not found</div>
    );
  }
  return (
    <>
      <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
        {total} items found
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};
