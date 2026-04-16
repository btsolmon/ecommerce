/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState } from "react";
import { useEffect } from "react";
import { ProductApiResponse } from "./types";
import { ProductCard } from "./components/product-card";
import { Pagination } from "./components/pagination";
import { ProductList } from "./components/product-list";
import { SearchBar } from "./components/search-bar";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Nav } from "./components/nav";

const PRODUCTS_PER_PAGE = 10;

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
      <Header />
      <Nav
        category={category}
        setCategory={setCategory}
        setSearch={setSearch}
        setSkip={setSkip}
      />
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
      <Footer />
    </div>
  );
}
