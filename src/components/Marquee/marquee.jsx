import baseUrl from "@/services/baseUrl";
import React from "react";
import MarqueeText from "react-marquee-text";

const getProducts = async () => {
  const res = await fetch(`${baseUrl}/products`);
  const data = await res.json();
  return data;
};

export default async function Marquee() {
  const products = await getProducts();
  console.log(products);

  return (
    <div className="w-full bg-gray-200  py-1 overflow-hidden">
      <MarqueeText direction="right" duration={15}>
        <div className="flex items-center gap-3 whitespace-nowrap">
          {products?.map((product) => {
            const { id, _id, nameBn, name, today, unit, change, image } =
              product;

            const itemId = id || _id;
            const productName = nameBn || name;

            // দাম পরিবর্তনের লজিক
            const dir = change?.dir || "flat";
            const pct = change?.pct ?? 0;
            const isUp = dir === "up";
            const isDown = dir === "down";

            return (
              <div
                key={itemId}
                className="inline-flex items-center gap-2 px-4   text-sm font-medium text-gray-800"
              >
                {/* প্রোডাক্ট আইকন */}
                <span className="text-base">{image || "🍚"}</span>

                {/* প্রোডাক্টের নাম */}
                <span>{productName}</span>

                {/* দাম ও একক */}
                <span className="text-gray-900 font-semibold">
                  {today} টাকা/{unit === "kg" ? "কেজি" : unit}
                </span>

                {/* শতকরা পরিবর্তন ও অ্যারো চিহ্ন */}
                <span
                  className={`inline-flex items-center gap-0.5 text-xs font-bold ${
                    isUp
                      ? "text-red-500"
                      : isDown
                        ? "text-emerald-500"
                        : "text-gray-500"
                  }`}
                >
                  <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
                  <span>{pct}%</span>
                </span>
              </div>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
}
