"use client";
import React, { useEffect, useState } from "react";
import baseUrl from "@/services/baseUrl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch(`${baseUrl}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="w-full py-2 sm:py-3 md:py-4 sticky top-16 z-40  ">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 md:px-6 lg:px-4">
        <ul className="flex flex-row  justify-start md:justify-start gap-2 sm:gap-3 overflow-x-auto md:flex-wrap md:overflow-x-visible pb-2 md:pb-0 scrollbar-hide">
          {categories?.map((cat) => {
            const categoryPath = `/category/${cat?.slug}`;
            const isActive = pathname === categoryPath;

            return (
              <li key={cat?.id || cat?._id} className="shrink-0 list-none">
                <Link
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-4 lg:px-5 py-2 sm:py-2.5 rounded-full  transition-all text-center shadow-sm ${
                    isActive
                      ? "bg-emerald-600 text-white border-emerald-600 font-semibold"
                      : " bg-background hover:bg-default-100 text-default-800"
                  }`}
                  href={categoryPath}
                >
                  <span className="text-xs sm:text-sm">{cat?.icon}</span>
                  <span className="text-xs sm:text-sm whitespace-nowrap">
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
