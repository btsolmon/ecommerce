# Бүтээгдэхүүний дэлгүүр - Дасгалын даалгаврууд

API: https://dummyjson.com/products

---

## TODO 1: React hook-уудыг импортлох

- `useState` болон `useEffect` hook-уудыг `react`-аас импортлох

## TODO 2: Product төрөл зарлах

- API-н хариуг шалгаад `Product` төрөл үүсгэх
- Шаардлагатай талбарууд: `id`, `title`, `description`, `price`, `thumbnail`, `category`, `rating`
- Талбар бүрийн төрлийг зөв тодорхойлох (number, string г.м)

## TODO 3: API хариуны төрөл зарлах

- `ProductResponse` төрөл үүсгэх
- API `{ products, total, skip, limit }` гэсэн бүтэцтэй өгөгдөл буцаадаг

## TODO 4: Үндсэн state хувьсагчдыг зарлах

- `products` — бүтээгдэхүүний массив, эхлэх утга: `[]`
- `loading` — boolean, эхлэх утга: `true`
- `error` — string эсвэл null, эхлэх утга: `null`
- `useState`-д generic төрөл ашиглах (`useState<Product[]>` г.м)

## TODO 5: Хайлтын state зарлах

- `search` — хайлтын текст, эхлэх утга: `""`

## TODO 6: Pagination state зарлах

- `total` — нийт бүтээгдэхүүний тоо, эхлэх утга: `0`
- `skip` — алгассан тоо, эхлэх утга: `0`

## TODO 7: useEffect-ээр өгөгдөл татах

- `useEffect` дотор async функц бичих
- `search` утгатай бол энэ URL ашиглах:
  - `https://dummyjson.com/products/search?q=${search}&limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
- `search` хоосон бол:
  - `https://dummyjson.com/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
- Хариуг JSON руу хөрвүүлэх
- `setProducts`-ээр бүтээгдэхүүнүүдийг хадгалах
- `setTotal`-оор нийт тоог хадгалах
- Алдаа гарвал `setError`-ээр алдааны мэдээг хадгалах
- Эцэст нь `setLoading(false)` дуудах
- dependency array: `[search, skip]`

## TODO 8: Хайлт хийх handler бичих

- `handleSearch` функц үүсгэх
- Input-н утгыг `setSearch`-ээр хадгалах
- Хайлт өөрчлөгдөх бүрт `setSkip(0)` дуудаж эхний хуудас руу буцах

## TODO 9: Pagination handler-ууд бичих

- `handlePrev` — `skip`-г `PRODUCTS_PER_PAGE`-ээр хасах (0-с доош бууж болохгүй)
- `handleNext` — `skip`-г `PRODUCTS_PER_PAGE`-ээр нэмэх

## TODO 10: Ачааллын төлөв харуулах

- `loading` үнэн бол spinner харуулах
- Эрт буцах (early return) ашиглах

## TODO 11: Алдааны төлөв харуулах

- `error` утгатай бол алдааны мэдээ харуулах
- Эрт буцах (early return) ашиглах

## TODO 12: Бүтээгдэхүүний тоо харуулах

- `products.length` ашиглан тоог харуулах

## TODO 13: Бүтээгдэхүүнүүдийг map-лах

- `products.map()` ашиглан карт бүрийг зурах
- `product`-аас талбаруудыг задлах (destructure)
- `key` prop-д `id` ашиглах

## TODO 14: Хуудасны дугаар харуулах

- `skip`, `total`, `PRODUCTS_PER_PAGE` ашиглан одоогийн хуудас / нийт хуудсыг тооцоолох

## TODO 15: Категори шүүлтүүр ажиллуулах

- `category` state нэмэх (эхлэх утга: `""`)
- Категори товч дарахад `setCategory` дуудах, `setSkip(0)` дуудах
- Идэвхтэй категорийг тодруулах (одоо "All" үргэлж тод харагдаж байна)
- `category` утгатай бол fetch URL-г өөрчлөх:
  - `https://dummyjson.com/products/category/${category}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
- dependency array-д `category` нэмэх: `[search, skip, category]`

---

## БОНУС TODO 16: Компонент болгон задлах

- `app/types/product.ts` — төрлүүдийг тусад нь гаргах
- `app/components/ProductCard.tsx` — нэг бүтээгдэхүүний карт
- `app/components/SearchBar.tsx` — хайлтын оролт
- `app/components/CategoryNav.tsx` — категори навигаци
- `app/components/Pagination.tsx` — хуудаслалтын товчнууд
- `app/components/ProductList.tsx` — fetch логик + map
- `app/page.tsx` — зөвхөн импорт хийж render хийх
- Аль компонентод `"use client"` хэрэгтэйг бодох
- Props-н төрлүүдийг зөв тодорхойлох
