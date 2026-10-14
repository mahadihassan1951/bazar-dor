"use client";

import React, { useState, useEffect, Suspense } from "react";
import ProductsCard from "@/components/ProductsCard/productsCard";
import baseUrl from "@/services/baseUrl";

export default function CategoryProducts({ params }) {
  // Next.js 15 এ params আনর্যাপ করার জন্য
  const [resolvedParams, setResolvedParams] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default"); // সর্টিং স্টেট

  useEffect(() => {
    params.then((p) => {
      setResolvedParams(p);
      fetch(`${baseUrl}/products?category=${p.categorySlug}`)
        .then((res) => res.json())
        .then((data) => setCategoryProducts(data))
        .catch((err) => console.error("Fetch error:", err));
    });
  }, [params]);

  // দাম অনুযায়ী সর্ট করার লজিক
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.today - b.today; // কম থেকে বেশি দাম
    } else if (sortOrder === "high-to-low") {
      return b.today - a.today; // বেশি থেকে কম দাম
    }
    return 0; // ডিফল্ট
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* ১. প্রথম অংশ: ক্যাটাগরি টাইটেল ও সাবটাইটেল কার্ড */}
        <div className="bg-default-50  rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-background rounded-xl  shadow-xs text-2xl">
              {categoryProducts[0]?.categoryIcon || "🍚"}
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                {categoryProducts[0]?.categoryNameBn || "ক্যাটাগরি"}
              </h1>
              <p className="text-sm text-default-500 mt-0.5">
                {categoryProducts?.length ?? 0}টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        {/* ২. দ্বিতীয় অংশ: সার্চ ও সর্ট বার কার্ড */}
        <div className="bg-default-50 border border-divider rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          {/* সার্চ ইনপুট */}
          <span></span>

          {/* ডানপাশের সাজান ড্রপডাউন */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <span className="text-sm text-default-600 font-medium">সাজান</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 rounded-xl border border-divider bg-background text-sm outline-none cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-to-high">কম দাম</option>
              <option value="high-to-low">বেশি দাম</option>
            </select>
          </div>
        </div>
      </div>

      {/* প্রোডাক্ট কার্ড গ্রিড */}

      <h2 className="text-xl font-bold">
        মোট {sortedProducts?.length || 0}টি পণ্য দেখানো হচ্ছে
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {sortedProducts?.map((product) => (
          <Suspense key={product?.id} fallback={<div>Loading...</div>}>
            <ProductsCard product={product} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
