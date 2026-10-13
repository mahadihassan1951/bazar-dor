"use client";

import React, { useState, useEffect } from "react";
import { Link, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import NextImage from "next/image";
import logoImg from "../../../public/logo-icon.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [bengaliDate, setBengaliDate] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const { data: session, isPending } = authClient.useSession();

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
          setIsMenuOpen(false);
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-divider bg-background/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-3 sm:px-5 md:px-6 lg:px-8">
        {/* Logo and Date */}
        <Link
          href="/"
          onPress={closeMenu}
          className="flex min-w-0 items-center gap-2 no-underline sm:gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-green-600 bg-green-500 p-1 sm:h-11 sm:w-11">
            <NextImage
              src={logoImg}
              alt="বাজার দর লোগো"
              width={36}
              height={36}
              priority
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex min-w-0 flex-col items-start">
            <span className="text-base font-extrabold leading-tight text-accent sm:text-lg md:text-xl">
              বাজার দর
            </span>

            <span
              className="mt-1 max-w-[190px] truncate text-[9px] leading-tight text-default-500 sm:max-w-none sm:text-[11px] md:text-xs"
              suppressHydrationWarning
            >
              {bengaliDate || "লোড হচ্ছে..."}
            </span>
          </div>
        </Link>

        {/* Desktop and Tablet Auth Actions */}
        <div className="hidden items-center gap-2 sm:gap-3 md:flex">
          {!isPending && session?.user ? (
            <Link href="/">
              <Button
                onPress={handleLogout}
                className="rounded-xl bg-[#0485F7] px-4 font-semibold text-white transition-colors hover:bg-[#0369C9] md:px-5"
                size="md"
              >
                লগ আউট
              </Button>
            </Link>
          ) : !isPending ? (
            <>
              <Link href="/sign-in">
                <Button
                  className={`rounded-xl px-4 font-semibold transition-colors lg:px-5 ${
                    pathname === "/sign-in"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-transparent text-foreground hover:bg-default-100"
                  }`}
                >
                  সাইন ইন
                </Button>
              </Link>

              <Link href="/sign-up">
                <Button
                  color={pathname === "/sign-up" ? "success" : "default"}
                  variant={pathname === "/sign-up" ? "solid" : "light"}
                  size="md"
                  className={`rounded-xl px-4 font-semibold lg:px-5 ${
                    pathname === "/sign-up"
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-transparent text-foreground hover:bg-default-100"
                  }`}
                >
                  সাইন আপ
                </Button>
              </Link>
            </>
          ) : (
            <span className="text-xs text-default-400">লোড হচ্ছে...</span>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-default-700 transition-colors hover:bg-default-100 focus:outline-none focus:ring-2 focus:ring-green-500 md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navbar-menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
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
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div
          id="mobile-navbar-menu"
          className="border-t border-divider bg-background px-4 py-4 shadow-lg md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col justify-end gap-3">
            {!isPending && session?.user ? (
              <>
                <div className="rounded-xl bg-default-100 px-4 py-3">
                  <p className="text-xs text-default-500">
                    লগ ইন করা অ্যাকাউন্ট
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-foreground">
                    {session.user.email}
                  </p>
                </div>

                <Button
                  onPress={handleLogout}
                  className="w-full rounded-xl bg-[#0485F7] font-semibold text-white"
                  size="md"
                >
                  লগ আউট
                </Button>
              </>
            ) : !isPending ? (
              <>
                <Link href="/sign-in">
                  <Button
                    as={Link}
                    href="/sign-in"
                    onPress={closeMenu}
                    variant="bordered"
                    className="w-full rounded-xl font-semibold"
                    size="md"
                  >
                    সাইন ইন
                  </Button>
                </Link>

                <Link href="/sign-up">
                  <Button
                    as={Link}
                    href="/sign-up"
                    onPress={closeMenu}
                    color="success"
                    className="w-full rounded-xl font-semibold "
                    size="md"
                  >
                    সাইন আপ
                  </Button>
                </Link>
              </>
            ) : (
              <p className="py-2 text-center text-sm text-default-400">
                অ্যাকাউন্ট লোড হচ্ছে...
              </p>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
