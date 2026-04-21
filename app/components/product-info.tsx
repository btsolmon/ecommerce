import { Product } from "@/app/types";
import { ReviewList } from "./review-section";

type ProductInfoProps = {
  product: Product;
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-zinc-400 dark:text-zinc-500">{label}</p>
    <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
      {value}
    </p>
  </div>
);

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  return (
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

      {/* Rating Section */}
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

      {/* Price Section */}
      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          ${discountedPrice}
        </span>
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

      {/* Technical Details Grid */}
      <div className="mt-8 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Дэлгэрэнгүй мэдээлэл
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <DetailItem label="Брэнд" value={product.brand} />
          <DetailItem label="Категори" value={product.category} />
          <DetailItem label="Үлдэгдэл" value={product.availabilityStatus} />
          <DetailItem label="Хүргэлт" value={product.shippingInformation} />
          <DetailItem label="Баталгаа" value={product.warrantyInformation} />
          <DetailItem label="Буцаалт" value={product.returnPolicy} />
        </div>
      </div>

      {/* Stock Status */}
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

      <ReviewList reviews={product.reviews} />
    </div>
  );
};
