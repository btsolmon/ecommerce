interface ProductGalleryProps {
  product: any;
  imageIndex: string;
  handleClick: (img: string) => void;
}

export const ProductGallery = ({
  product,
  handleClick,
}: ProductGalleryProps) => {
  return (
    <div>
      {/* Thumbnail Gallery */}
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
  );
};
