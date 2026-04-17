"use client";

import { Product } from "@/app/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Footer } from "@/app/components/footer";
import { Header2 } from "@/app/components/header2";

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
      {/* Header */}
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

            {/* Thumbnail Gallery */}
            {/* TODO 11: product.images массивыг map-аар гүйлгэх */}
            <div className="mt-4 grid grid-cols-4 gap-3">
              {product.images.map((image: string) => (
                <button
                  key={image}
                  className="overflow-hidden rounded-xl border border-zinc-300 hover:border-2 border-transparent transition-all duration-200 hover:border-zinc-900 dark:border-zinc-700 dark:hover:border-zinc-100"
                  onClick={() => handleClick(image)}
                >
                  <img
                    src={image}
                    alt="Thumbnail 1"
                    className="h-20 w-full object-cover transition-opacity hover:opacity-40"
                  />
                </button>
              ))}
            </div>
          </div>
          {/* Product Info Section */}
          <div>
            <span className="inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              {product.category}
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {product.title}
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {product.brand}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.round(product.rating || 0)
                        ? "text-amber-400"
                        : "text-zinc-200 dark:text-zinc-700"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {product.rating}
              </span>
            </div>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold">${discountedPrice}</span>
              <span className="text-lg text-zinc-400 line-through">
                ${product.price}
              </span>
              <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-sm font-medium text-red-600 dark:bg-red-900/30">
                -{product.discountPercentage}%
              </span>
            </div>
            <p className="mt-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
              {product.description}
            </p>
            <div className="mt-8 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Дэлгэрэнгүй мэдээлэл
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Брэнд
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {product.brand}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Категори
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {product.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Үлдэгдэл
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {product.availabilityStatus}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Хүргэлт
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {product.shippingInformation}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Баталгаа
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {product.warrantyInformation}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Буцаалт
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {product.returnPolicy}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  product.stock > 50
                    ? "bg-emerald-500"
                    : product.stock > 10
                      ? "bg-amber-500"
                      : "bg-red-500"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  product.stock > 50
                    ? "text-emerald-600"
                    : product.stock > 10
                      ? "text-amber-600"
                      : "text-red-600"
                }`}
              >
                {product.stock > 50
                  ? `Хангалттай үлдэгдэл - ${product.stock} ширхэг`
                  : product.stock > 10
                    ? `Цөөхөн үлдсэн - ${product.stock} ширхэг`
                    : `Бага үлдэгдэл — зөвхөн ${product.stock} ширхэг`}
              </span>
            </div>

            {/* Reviews Section */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Сэтгэгдлүүд
              </h3>
              <div className="mt-4 space-y-4">
                {product.reviews?.map((review, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {review.reviewerName}
                      </span>
                      <div className="flex text-amber-400">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg
                            key={s}
                            className={`h-3 w-3 ${s <= review.rating ? "fill-current" : "text-zinc-200"}`}
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// БОНУС TODO 16: Компонент болгон задлах
//   - app/components/ProductImageGallery.tsx
//   - app/components/ProductInfo.tsx
//   - app/components/ReviewCard.tsx
//   - app/components/StockBadge.tsx
