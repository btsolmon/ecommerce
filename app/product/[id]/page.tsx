"use client";

import { Product } from "@/app/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Footer } from "@/app/components/footer";
import { Header2 } from "@/app/components/header2";
import { ProductInfo } from "@/app/components/product-info";
import { ProductGallery } from "@/app/components/product-gallery";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageIndex, setImageIndex] = useState("");

  useEffect(() => {
    let responseStatus = 200;
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        responseStatus = res.status;
        return res.json();
      })
      .then((data) => {
        if (responseStatus === 200) {
          setProduct(data);
          setImageIndex(data.images[0]);
        } else {
          setError(data.message);
        }
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="p-20 text-center dark:text-white">Ачаалж байна...</div>
    );
  if (error) return <>{error}</>;
  if (!product) return null;

  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);
  const handleClick = (img) => {
    setImageIndex(img);
  };
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Header2 />
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
              <img
                src={imageIndex}
                alt={product.title}
                className="h-96 w-full object-cover"
              />
            </div>
            <ProductGallery
              product={product}
              imageIndex={imageIndex}
              handleClick={handleClick}
            />
          </div>
          <ProductInfo product={product} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
