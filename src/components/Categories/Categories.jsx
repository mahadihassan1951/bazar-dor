"use client";
import React, { useEffect, useState } from "react";
import baseUrl from "@/services/baseUrl";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ১. usePathname ইমপোর্ট করা হলো

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const pathname = usePathname(); // ২. বর্তমান URL ট্র্যাক করার জন্য

  useEffect(() => {
    fetch(`${baseUrl}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="w-full py-4 sticky top-17 z-40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex flex-row items-center justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories?.map((cat) => {
            const categoryPath = `/category/${cat?.slug}`;
            // ৩. বর্তমান পেজের পাথ এবং ক্যাটাগরির পাথ এক কি না তা চেক করা হচ্ছে
            const isActive = pathname === categoryPath;

            return (
              <li key={cat?.id || cat?._id} className="flex-shrink-0 list-none">
                <Link
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all text-center shadow-sm ${
                    isActive
                      ? "bg-emerald-600 text-white border-emerald-600 font-semibold" // হাইলাইট স্টাইল (Active State)
                      : "border-divider bg-background hover:bg-default-100 text-default-800" // সাধারণ স্টাইল
                  }`}
                  href={categoryPath}
                >
                  <span className="text-sm">{cat?.icon}</span>
                  <span className="text-sm whitespace-nowrap">
                    {cat?.nameBn}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
