"use client";

import React, { useState } from "react";
import ProductCard from "../ProductsCard/productsCard";

export default function AllProducts({ products }) {
  const [sortOrder, setSortOrder] = useState("default");

  // দাম অনুযায়ী সর্ট করার লজিক
  const sortedProducts = [...(products || [])].sort((a, b) => {
    if (sortOrder === "low-to-high") {
      return a.today - b.today; // কম দাম থেকে বেশি দাম
    } else if (sortOrder === "high-to-low") {
      return b.today - a.today; // বেশি দাম থেকে কম দাম
    }
    return 0; // ডিফল্ট
  });

  return (
    <div className="space-y-4">
      {/* একি div এর মধ্যে বাম পাশে টাইটেল এবং ডানপাশে সাজান ড্রপডাউন */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4  p-4 ">
        <p className="text-xl font-bold">সকল পণ্য </p>

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
      <p>মোট {sortedProducts.length} টি পণ্য দেখানো হচ্ছে</p>

      {/* প্রোডাক্ট গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
