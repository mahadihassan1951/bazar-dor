"use client";
import React, { useEffect, useState } from "react";
import baseUrl from "@/services/baseUrl";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div className="w-full py-4 sticky top-17 z-40 ">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex flex-row items-center justify-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories?.map((cat) => (
            <li key={cat?.id} className="flex-shrink-0 list-none">
              <Link
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-divider bg-background hover:bg-default-100 transition-all text-center shadow-sm"
                href={`/category/${cat?.slug}`}
              >
                <span className="text-sm">{cat?.icon}</span>
                <span className=" text-sm whitespace-nowrap">
                  {cat?.nameBn}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
