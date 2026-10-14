
import baseUrl from "@/services/baseUrl";
import Hero from "@/components/Hero/hero";
import ProductCard from "@/components/ProductsCard/productsCard";
import AllProducts from "@/components/AllProducts/allProducts";
import { Suspense } from "react";

const getProducts = async () => {
  const res = await fetch(`${baseUrl}/products`);

  if (!res.ok) {
    throw new Error("Products fetch করা যায়নি");
  }

  return res.json();
};

// Products fetch এবং display
async function ProductSections() {
  const products = await getProducts();

  const downProducts = products
    .filter((p) => p.today < p.yesterday)
    .slice(0, 6);

  const upProducts = products
    .filter((p) => p.today > p.yesterday)
    .slice(0, 6);

  return (
    <>
      {/* আজ দাম বেড়েছে */}
      <section className="px-2 py-3 sm:px-4 sm:py-4">
        <p className="flex gap-3 text-xl font-bold sm:text-2xl">
          <span className="text-red-500">▲</span>
          <span>আজ দাম বেড়েছে</span>
        </p>

        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {upProducts.length > 0 ? (
            upProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="py-4 text-gray-500">
              আজ দাম বেড়েছে এমন কোনো পণ্য নেই।
            </p>
          )}
        </div>
      </section>

      {/* আজ দাম কমেছে */}
      <section className="px-2 py-3 sm:px-4 sm:py-4">
        <p className="flex gap-3 text-xl font-bold sm:text-2xl">
          <span className="text-emerald-500">▼</span>
          <span>আজ দাম কমেছে</span>
        </p>

        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {downProducts.length > 0 ? (
            downProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="py-4 text-gray-500">
              আজ দাম কমেছে এমন কোনো পণ্য নেই।
            </p>
          )}
        </div>
      </section>

      {/* সব পণ্য */}
      <section className="px-2 py-3 sm:px-4 sm:py-4">
        <AllProducts products={products} />
      </section>
    </>
  );
}

// Home page
export default function Home() {
  return (
    <main className="container mx-auto space-y-2 px-3 py-1 sm:px-4">
      <Hero />

      <Suspense
        fallback={
          <div className="flex justify-center py-10">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        }
      >
        <ProductSections />
      </Suspense>
    </main>
  );
}