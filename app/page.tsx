/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState } from "react";
import { useEffect } from "react";
import { ProductApiResponse } from "./types";
import { ProductCard } from "./components/product-card";
import { Pagination } from "./components/pagination";
import { ProductList } from "./components/product-list";
import { SearchBar } from "./components/search-bar";

const PRODUCTS_PER_PAGE = 10;

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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [category, setCategory] = useState("");

  const totalPages = Math.ceil(total / PRODUCTS_PER_PAGE);
  const currentPage = skip / PRODUCTS_PER_PAGE + 1;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
    if (search) {
      url = `https://dummyjson.com/products/search?q=${search}&limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
    } else if (category) {
      url = `https://dummyjson.com/products/category/${category}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
    }
    setLoading(true);
    setError("");

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: ProductApiResponse) => {
        setProducts(data.products);
        setTotal(data.total);
        setSkip(data.skip);
        setLoading(false);
      })
      .catch(() => {
        setError("Error");
        setLoading(false);
      });
  }, [search, skip, category]);
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setCategory("");
    setSkip(0);
  }
  function handlePrev() {
    setSkip((s) => Math.max(0, s - PRODUCTS_PER_PAGE));
  }
  function handleNext() {
    if (currentPage < totalPages) {
      setSkip((s) => s + PRODUCTS_PER_PAGE);
    }
  }
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Product Store
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Browse our collection of products
          </p>
        </div>
      </header>
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
      <main className="mx-auto max-w-7xl px-6 py-10">
        <SearchBar value={search} onChange={handleSearch} />
        <ProductList
          products={products}
          loading={loading}
          error={error}
          total={total}
        />
        {!loading && !error && products.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        )}
      </main>
      <footer className="mt-auto border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-4 text-center text-xs text-zinc-400">
          Exercise App &middot; Data from dummyjson.com
        </div>
      </footer>
    </div>
  );
}
