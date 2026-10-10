import React from "react";

export default function ProductCard({ product }) {
  // প্রপস থেকে ডেটা ডিস্ট্রাকচার করে নেওয়া
  const { name, unit, price, change, icon } = product || {};

  // দাম বাড়লে বা কমলে তার কালার এবং আইকন নির্ধারণ করার লজিক
  const isIncrease = change && change.startsWith("+");
  const badgeColor = isIncrease 
    ? "bg-danger-50 text-danger" 
    : "bg-success-50 text-success";

  return (
    <div className="bg-default-50 border border-divider rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
      
      {/* ওপরের অংশ: আইকন, নাম ও একক */}
      <div className="flex items-center gap-3.5 w-[200px]">
        <div className="w-12 h-12 flex items-center justify-center bg-background rounded-xl border border-divider shadow-xs text-2xl flex-shrink-0">
          {icon || "🍚"}
        </div>
        <div>
          <h3 className="font-bold text-base text-default-900 leading-snug">
            {name || "স্বর্ণাছাি চাল"}
          </h3>
          <p className="text-xs text-default-400 mt-0.5">
            {unit || "প্রতি কেজি"}
          </p>
        </div>
      </div>

      {/* নিচের অংশ: আজকের দাম এবং পরিবর্তনের শতকরা হার */}
      <div className="flex items-end justify-between mt-6 pt-3 ">
        <div>
          <span className="text-xs text-default-500 block mb-0.5">আজকের দাম</span>
          <span className="text-xl font-extrabold text-default-900">
            {price || "১৪৮"} <span className="text-sm font-semibold">টাকা</span>
          </span>
        </div>

        {/* পরিবর্তনের শতকরা হার ব্যাজ */}
        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${badgeColor}`}>
          <span>{isIncrease ? "▲" : "▼"}</span>
          <span>{change || "২.৬%"}</span>
        </div>
      </div>

    </div>
  );
}