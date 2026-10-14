
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
  const data = await res.json();
  return data;
};

export default async function Home() {
  const products = await getProducts();
  const downProducts = products
    .filter((p) => p.today < p.yesterday)
    .slice(0, 6);

  const upProducts = products
    .filter((p) => p.today > p.yesterday)
    .slice(0, 6);

  return (
    <div>
      <div className="container mx-auto space-y-2 px-3 py-1 sm:px-4">
        <Hero />

        <div className="px-2 py-3 sm:px-4 sm:py-4">
          <p className="text-xl font-bold sm:text-2xl">
            আজ দাম কমেছে
          </p>

          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3">
            <Suspense fallback={<span className="loading loading-dots loading-xl"></span>}>
                {downProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            </Suspense>
          </div>
        </div>

        <div className="px-2 py-3 sm:px-4 sm:py-4">
          <p className="text-xl font-bold sm:text-2xl">
            আজ দাম বেড়েছে
          </p>

          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-3">
            {upProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="px-2 py-3 sm:px-4 sm:py-4">
          <div>
            <AllProducts products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}

