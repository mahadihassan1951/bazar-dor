"use client";
import React, { useState, useEffect } from "react";
import { Link, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import logoImg from "../../../public/logo-icon.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bengaliDate, setBengaliDate] = useState("");
  const router = useRouter();

  const { data: session } = authClient.useSession();

  // ব্রাউজারে পেজ লোড হওয়ার পর ডেট জেনারেট হবে, ফলে সার্ভার প্রি-রেন্ডার এরর আসবে না
  useEffect(() => {
    try {
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat("bn-BD", options).format(
        new Date(),
      );
      setBengaliDate(formattedDate);
    } catch (error) {
      console.error("Date formatting error:", error);
    }
  }, []);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-divider bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side: Logo & Date */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded-lg text-default-600 hover:bg-default-100 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="flex items-center justify-center p-1 bg-green-500 border rounded-xl overflow-hidden">
              <NextImage
                src={logoImg}
                alt="Logo"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-extrabold text-accent leading-tight">
                বাজার দর
              </span>
              <span
                className="text-[10px] text-default-400 leading-none mt-0.5"
                suppressHydrationWarning
              >
                {bengaliDate || "লোড হচ্ছে..."}
              </span>
            </div>
          </Link>
        </div>

        {/* Right Side: Desktop Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          {session?.user ? (
            <Button
              onClick={handleLogout}
              color="danger"
              variant="flat"
              size="sm"
            >
              লগ আউট
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/sign-in"
                className="text-sm font-medium no-underline"
              >
                সাইন ইন
              </Link>
              <Link href="/sign-up" className="no-underline">
                <Button color="success" size="sm">
                  সাইন আপ
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-divider bg-background px-4 pt-4 pb-6 shadow-xl transition-all"></div>
      )}
    </nav>
  );
}
