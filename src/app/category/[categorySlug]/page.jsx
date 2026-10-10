import CategoryHeaderSection from "@/components/CategoryHeaderSection/categoryHeaderSection";
import ProductsCard from "@/components/ProductsCard/productsCard";
import baseUrl from "@/services/baseUrl";
import React, { Suspense } from "react";

async function getCategoryProducts(categorySlug) {
  try {
    const res = await fetch(`${baseUrl}/products?category=${categorySlug}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

async function CategoryContent({ params }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.categorySlug;

  const products = await getCategoryProducts(categorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <CategoryHeaderSection key={products?.id} products={products} />

      <ProductsCard key={products?.id} products={products} />
    </div>
  );
}

// মেইন পেজ কম্পোনেন্ট
export default function CategoryProductPage({ params }) {
  return (
    <Suspense
      fallback={<div className="text-center py-10">প্রোডাক্ট লোড হচ্ছে...</div>}
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
