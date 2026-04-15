const CATEGORIES = [
  { name: "All", slug: "" },
  { name: "Beauty", slug: "beauty" },
  { name: "Fragrances", slug: "fragrances" },
  { name: "Furniture", slug: "furniture" },
  { name: "Groceries", slug: "groceries" },
  { name: "Home Decoration", slug: "home-decoration" },
  { name: "Kitchen Accessories", slug: "kitchen-accessories" },
  { name: "Laptops", slug: "laptops" },
  { name: "Smartphones", slug: "smartphones" },
  { name: "Sports Accessories", slug: "sports-accessories" },
  { name: "Vehicle", slug: "vehicle" },
];

export const Nav = ({
  category,
  setCategory,
  setSearch,
  setSkip,
}: {
  category: string;
  setCategory: (slug: string) => void;
  setSearch: (value: string) => void;
  setSkip: (value: number) => void;
}) => {
  return (
    <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6">
        <ul className="flex gap-1 overflow-x-auto py-3 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <button
                onClick={() => {
                  setCategory(cat.slug);
                  setSearch("");
                  setSkip(0);
                }}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  category === cat.slug
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
