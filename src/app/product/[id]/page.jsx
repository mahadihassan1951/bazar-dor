import React, { Suspense } from "react";
import baseUrl from "@/services/baseUrl";
import Link from "next/link";

// ১. নির্দিষ্ট প্রোডাক্টের ডেটা ফেচ করার ফাংশন
async function getProductDetails(id) {
  try {
    const res = await fetch(`${baseUrl}/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// ২. মূল ডিটেইলস কন্টেন্ট কম্পোনেন্ট
async function ProductDetailsContent({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const product = await getProductDetails(id);

  if (!product) {
    return (
      <div className="text-center py-20 text-default-500">
        প্রোডাক্টটি পাওয়া যায়নি!
      </div>
    );
  }

  // API ডেটা থেকে প্রয়োজনীয় ফিল্ডগুলো ডিস্ট্রাকচার করে নেওয়া
  const {
    nameBn,
    categoryNameBn,
    unit,
    today,
    yesterday,
    change,
    icon,
    markets,
  } = product;

  // দাম পরিবর্তনের লজিক
  const dir = change?.dir || "flat";
  const pct = change?.pct ?? 0;
  const isIncrease = dir === "up";
  const isDecrease = dir === "down";

  let badgeColor = "bg-default-100 text-default-600";
  let symbol = "—";
  if (isIncrease) {
    badgeColor = "bg-danger-50 text-danger";
    symbol = "▲";
  } else if (isDecrease) {
    badgeColor = "bg-success-50 text-success";
    symbol = "▼";
  }

  // বাজারগুলোর সর্বনিম্ন ও সর্বোচ্চ দাম থেকে সার্বিক সর্বনিম্ন এবং সর্বোচ্চ দাম বের করা
  const allMins = markets?.map((m) => m.min) || [0];
  const allMaxs = markets?.map((m) => m.max) || [0];
  const overallMin = Math.min(...allMins);
  const overallMax = Math.max(...allMaxs);

  // গড় দামের হিসাব (সর্বনিম্ন ও সর্বোচ্চের গড়)
  const overallAvg = Math.round((overallMin + overallMax) / 2);

  // দামের পার্থক্য (গতকালের তুলনায়)
  const priceDiff = today - yesterday;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* ব্রেডক্রাম্ব */}
      <div className="flex items-center gap-2 text-sm text-default-500">
        <Link href="/" className="hover:underline">
          হোম
        </Link>
        <span>›</span>
        <span>{categoryNameBn || "ক্যাটাগরি"}</span>
        <span>›</span>
        <span className="text-default-800 font-medium">{nameBn}</span>
      </div>

      {/* হিরো সেকশন */}
      <div className="bg-default-50 border border-divider rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-background rounded-2xl border border-divider shadow-xs text-3xl sm:text-4xl flex-shrink-0">
            {icon || "🍚"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-default-900 tracking-tight">
              {nameBn}
            </h1>
            <p className="text-sm text-default-500 mt-1">
              প্রতি {unit === "kg" ? "কেজি" : unit} • {categoryNameBn}
            </p>
            <p className="text-xs text-default-400 mt-1">
              গতকালকের তুলনায় আজ দাম{" "}
              {priceDiff === "0" || priceDiff === 0
                ? "পরিবর্তন হয়নি"
                : priceDiff > 0
                  ? `${priceDiff} টাকা বেড়েছে`
                  : `${Math.abs(priceDiff)} টাকা কমেছে`}
            </p>
          </div>
        </div>

        {/* আজকের দাম ও ব্যাজ কার্ড (ডানপাশ) */}
        <div className="bg-background border border-divider rounded-2xl p-4 sm:px-6 sm:py-4 flex flex-col items-end justify-center shadow-xs w-full md:w-auto">
          <span className="text-xs text-default-500 mb-1">আজকের দাম</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-default-900">
              {today}
            </span>
            <span className="text-sm font-semibold text-default-600">
              টাকা / {unit}
            </span>
          </div>
          <div
            className={`mt-2 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${badgeColor}`}
          >
            <span>{symbol}</span>
            <span>{pct}%</span>
          </div>
        </div>
      </div>

      {/* বাজারভিত্তিক আজকের দাম টেবিল */}

      <div className="bg-default-50 border border-divider rounded-3xl p-6 shadow-xs space-y-4">
        {/* দামের সারসংক্ষেপ (Summary Cards) */}
        <h2 className="text-lg font-bold text-default-900">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* সর্বনিম্ন দর */}
          <div className="bg-default-50 border border-divider rounded-2xl p-5 shadow-xs space-y-1">
            <p className="text-xs text-default-500">সর্বনিম্ন দর</p>
            <div className="flex items-baseline gap-1.5">
              <h3 className="text-2xl font-bold text-success">
                {overallMin} টাকা
              </h3>
            </div>
            <p className="text-xs text-default-400">
              বাজারে সর্বনিম্ন বাজার দর
            </p>
          </div>

          {/* সর্বাধিক দর */}
          <div className="bg-default-50 border border-divider rounded-2xl p-5 shadow-xs space-y-1">
            <p className="text-xs text-default-500">সর্বাধিক দর</p>
            <div className="flex items-baseline gap-1.5">
              <h3 className="text-2xl font-bold text-danger">
                {overallMax} টাকা
              </h3>
            </div>
            <p className="text-xs text-default-400">বাজারে সর্বোচ্চ বাজার দর</p>
          </div>

          {/* গড় দর */}

          <div className="bg-default-50 border border-divider rounded-2xl p-5 shadow-xs space-y-1">
            <p className="text-xs text-default-500">গড় দর</p>
            <div className="flex items-baseline gap-1.5">
              <h3 className="text-2xl font-bold text-default-900">
                {overallAvg} টাকা
              </h3>
            </div>
            <p className="text-xs text-default-400">
              প্রতি {unit === "kg" ? "কেজি" : unit}-এর হিসাব
            </p>
          </div>
        </div>
        <h2 className="text-lg font-bold text-default-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-divider text-xs text-default-500">
                <th className="py-3 px-4 font-medium">বাজার</th>
                <th className="py-3 px-4 font-medium">বিভাগ</th>
                <th className="py-3 px-4 font-medium">সর্বনিম্ন</th>
                <th className="py-3 px-4 font-medium">সর্বাধিক</th>
                <th className="py-3 px-4 font-medium text-right">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider/50 text-sm">
              {markets?.map((m, index) => {
                const marketAvg = ((m.min + m.max) / 2).toFixed(2);
                return (
                  <tr
                    key={index}
                    className="hover:bg-background/60 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-medium text-default-900">
                      {m.market}
                    </td>
                    <td className="py-3.5 px-4 text-default-500">
                      {m.division}
                    </td>
                    <td className="py-3.5 px-4 text-default-800">
                      {m.min} টাকা
                    </td>
                    <td className="py-3.5 px-4 text-default-800">
                      {m.max} টাকা
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-default-900">
                      {marketAvg} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ৩. মেইন পেজ কম্পোনেন্ট (Next.js Suspense সহ)
export default function ProductDetailsPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20">প্রোডাক্ট ডিটেইলস লোড হচ্ছে...</div>
      }
    >
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}
