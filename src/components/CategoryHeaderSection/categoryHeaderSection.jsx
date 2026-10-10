import React from "react";

export default function CategoryHeaderSection({ products }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
      {/* ১. প্রথম অংশ: ক্যাটাগরি টাইটেল ও সাবটাইটেল কার্ড */}
      <div className="bg-default-50 border border-divider rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-background rounded-xl border border-divider shadow-xs text-2xl">
            {products[0]?.icon || "🍚"}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {products[0]?.nameBn || "ক্যাটাগরি"}
            </h1>
            <p className="text-sm text-default-500 mt-0.5">
              {products.length ?? 0}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      {/* ২. দ্বিতীয় অংশ: সার্চ ও সর্ট বার কার্ড */}
      <div className="bg-default-50 border border-divider rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        {/* সার্চ ইনপুট */}
        <input
          type="text"
          placeholder=""
          className=""
        />

        {/* ডানপাশের সাজান ড্রপডাউন */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <span className="text-sm text-default-600 font-medium">সাজান</span>
          <select className="px-4 py-2 rounded-xl border border-divider bg-background text-sm outline-none cursor-pointer">
            <option>ডিফল্ট</option>
            <option>কম দাম</option>
            <option>বেশি দাম</option>
          </select>
        </div>
      </div>
    </div>
  );
}
