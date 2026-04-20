import React from "react";

// 1. Жижиг карт компонент (Нэг ширхэг сэтгэгдэл)
function ReviewCard({ review }: { review: any }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {review.reviewerName}
        </span>
        <div className="flex text-amber-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`h-3 w-3 ${star <= review.rating ? "fill-current" : "text-zinc-200 dark:text-zinc-700"}`}
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
  );
}

// 2. Жагсаалт компонент (Map ашигласан хэсэг)
export function ReviewList({ reviews }: { reviews: any[] }) {
  // Хэрэв сэтгэгдэл байхгүй бол юу ч харуулахгүй
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        Сэтгэгдлүүд ({reviews.length})
      </h3>
      <div className="mt-4 space-y-4">
        {reviews.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
    </div>
  );
}
