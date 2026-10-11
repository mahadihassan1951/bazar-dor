"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function hero() {
  const [bengaliDate, setBengaliDate] = useState("");

  useEffect(() => {
    try {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      // Real-time current date (bn-BD format)
      const formattedDate = new Intl.DateTimeFormat("bn-BD", options).format(
        new Date(),
      );
      setBengaliDate(formattedDate);
    } catch (error) {
      console.error("Date formatting error:", error);
    }
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-default-50 border border-divider rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xs">
        {/* Bam pasher text ebong button section */}
        <div className="flex flex-col items-start space-y-4 max-w-xl">
          {/* Real-time date badge */}
          <div
            className="px-3 py-1 rounded-full bg-success-50 text-success text-xs font-medium"
            suppressHydrationWarning
          >
            {bengaliDate || "লোড হচ্ছে..."}
          </div>

          {/* Mukhya title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold text-default-900 tracking-tight leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Biboroni text */}
          <p className="text-sm sm:text-base text-default-500 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* 'Sob ponno dekhun' button */}
          <div className="pt-2">
            <Link href="/products" className="no-underline">
              <Button
                color="success"
                size="md"
                className="font-semibold text-white shadow-sm"
              >
                সব পণ্য দেখুন
              </Button>
            </Link>
          </div>
        </div>

        {/* Dan pasher hero chobi section */}
        <div className="flex-shrink-0 relative w-full lg:w-[420px] h-[240px] sm:h-[280px] flex items-center justify-center">
          <Image
            src="/bazar-hero.png"
            alt="Bazar Hero"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
