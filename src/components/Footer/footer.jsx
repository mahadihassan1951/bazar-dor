import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F5F6F6] py-6 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm text-default-500">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4">
        {/* বাম পাশের টেক্সট */}
        <p className="text-center sm:text-left">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* ডান পাশের ডিসক্লেইমার টেক্সট */}
        <p className="text-center sm:text-right text-default-400">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
