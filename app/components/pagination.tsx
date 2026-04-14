export const Pagination = ({
  currentPage,
  totalPages,
  handlePrev,
  handleNext,
}: {
  currentPage: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        disabled={currentPage === 1}
        onClick={handlePrev}
        className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        &larr; Previous
      </button>
      <span className="text-sm text-zinc-500 dark:text-zinc-400">
        Page {currentPage} / {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={handleNext}
        className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        Next &rarr;
      </button>
    </div>
  );
};
