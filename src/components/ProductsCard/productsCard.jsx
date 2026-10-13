import Link from "next/link";
import React from "react";

export default function ProductCard({ product }) {
  const { nameBn, unit, today, change, icon } = product || {};

  // API-এর change অবজেক্ট থেকে দিক (dir) এবং শতকরা হার (pct) বের করা
  const dir = change?.dir || "flat"; // up, down, flat
  const pct = change?.pct ?? 0;

  // ডিরেকশন অনুযায়ী কালার, আইকন ও সিম্বল নির্ধারণ
  let badgeColor = "bg-default-100 text-default-600";
  let symbol = "—";

  if (dir === "up") {
    badgeColor = "bg-danger-50 text-danger";
    symbol = "▲";
  } else if (dir === "down") {
    badgeColor = "bg-success-50 text-success";
    symbol = "▼";
  }

  return (
    <Link href={`/product/${product?.id}`} >
      <div className="bg-default-50 border border-divider rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
        {/* ওপরের অংশ: আইকন, নাম ও একক */}
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 flex items-center justify-center bg-background rounded-xl border border-divider shadow-xs text-2xl flex-shrink-0">
            {icon || "🍚"}
          </div>
          <div>
            <h3 className="font-bold text-base text-default-900 leading-snug">
              {nameBn }
            </h3>
            <p className="text-xs text-default-400 mt-0.5">
              {unit === "kg" ? "প্রতি কেজি" : unit || "প্রতি কেজি"}
            </p>
          </div>
        </div>

        {/* নিচের অংশ: আজকের দাম এবং পরিবর্তনের শতকরা হার */}
        <div className="flex items-end justify-between mt-6 ">
          <div>
            <span className="text-xs text-default-500 block mb-0.5">
              আজকের দাম
            </span>
            <span className="text-xl font-extrabold text-default-900">
              {today || "১৪৮"}{" "}
              <span className="text-sm font-semibold">টাকা</span>
            </span>
          </div>

          {/* পরিবর্তনের শতকরা হার ব্যাজ */}
          <div
            className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${badgeColor}`}
          >
            <span>{symbol}</span>
            <span>{pct}%</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
