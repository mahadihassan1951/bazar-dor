"use client";

import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
import { Link, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import NextImage from "next/image";
import logoImg from "../../../public/logo-icon.png";

// ProfileMenu Navbar-এর বাইরে রাখা হয়েছে
// এতে react-hooks/static-components error হবে না।
function ProfileMenu({
  user,
  isProfileOpen,
  setIsProfileOpen,
  setIsMenuOpen,
  handleLogout,
  router,
}) {
  return (
    <div className="relative">
      {/* Profile Picture Button */}
      <button
        type="button"
        onClick={() => setIsProfileOpen((prev) => !prev)}
        aria-label="প্রোফাইল মেনু খুলুন"
        aria-expanded={isProfileOpen}
        className="flex items-center gap-2 rounded-full bg-background p-1 pr-3 transition-colors hover:bg-default-100"
      >
        {user?.image ? (
          <NextImage
            src={user.image}
            alt="Profile"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
            {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
          </div>
        )}

        <span className="max-w-28 truncate text-sm font-semibold text-foreground">
          {user?.name || "আমার অ্যাকাউন্ট"}
        </span>

        <svg
          className={`h-4 w-4 transition-transform ${
            isProfileOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.09 1.032l-4.25 4.5a.75.75 0 01-1.09 0l-4.25-4.5a.75.75 0 01.02-1.052z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Profile Popup */}
      {isProfileOpen && (
        <div className="absolute right-0 top-full z-[60] mt-3 w-72 overflow-hidden rounded-2xl border border-default-200 bg-background shadow-xl">
          {/* User Information */}
          <div className="border-b border-divider p-4">
            <div className="flex items-center gap-3">
              {user?.image ? (
                <NextImage
                  src={user.image}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white">
                  {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate font-bold text-foreground">
                  {user?.name || "ব্যবহারকারী"}
                </p>
                <p className="truncate text-xs text-default-500">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* My Profile */}
          <div className="p-2">
            <button
              type="button"
              onClick={() => {
                setIsProfileOpen(false);
                setIsMenuOpen(false);
                router.push("/profile");
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-default-100"
            >
              <svg
                className="h-5 w-5 text-emerald-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-2a8 8 0 0116 0v2" />
              </svg>
              আমার প্রোফাইল
            </button>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path d="M10 17l5-5-5-5M15 12H3" />
                <path d="M12 3h6a2 2 0 012 2v14a2 2 0 01-2 2h-6" />
              </svg>
              লগ আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = async () => {
    try {
      // signOut সরাসরি নয়, authClient-এর method ব্যবহার করা হচ্ছে
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "লগআউট করা যায়নি");
        return;
      }

      setIsProfileOpen(false);
      setIsMenuOpen(false);

      toast.success("সফলভাবে লগআউট হয়েছে!");

      setTimeout(() => {
        router.replace("/");
        router.refresh();
      }, 800);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "লগআউট করার সময় সমস্যা হয়েছে",
      );
    }
  };

  const profileMenuProps = {
    user: session?.user,
    isProfileOpen,
    setIsProfileOpen,
    setIsMenuOpen,
    handleLogout,
    router,
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/90 shadow-sm backdrop-blur-md">
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
              {bengaliDate || (
                <span className="loading loading-dots loading-xl" />
              )}
            </span>
          </div>
        </Link>

        {/* Desktop and Tablet Auth Actions */}
        <div className="hidden items-center gap-2 sm:gap-3 md:flex">
          {!isPending && session?.user ? (
            <ProfileMenu {...profileMenuProps} />
          ) : !isPending ? (
            <>
              <Link href="/sign-in">
                <Button
                  className={`rounded-xl px-4 font-semibold transition-colors lg:px-5 no-underline ${
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
                  className={`rounded-xl px-4 font-semibold lg:px-5 no-underline ${
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
            <span className="text-xs text-default-400">
              <span className="loading loading-dots loading-xl" />
            </span>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-default-700 transition-colors hover:bg-default-100 focus:outline-none focus:ring-2 focus:ring-green-500 md:hidden"
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
            setIsProfileOpen(false);
          }}
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
          className="bg-background px-4 py-4 shadow-lg md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col justify-end gap-3">
            {!isPending && session?.user ? (
              <ProfileMenu {...profileMenuProps} />
            ) : !isPending ? (
              <>
                <Link href="/sign-in" onPress={closeMenu}>
                  <Button
                    variant="bordered"
                    className="w-full rounded-xl font-semibold"
                    size="md"
                  >
                    সাইন ইন
                  </Button>
                </Link>

                <Link href="/sign-up" onPress={closeMenu}>
                  <Button
                    color="success"
                    className="w-full rounded-xl font-semibold"
                    size="md"
                  >
                    সাইন আপ
                  </Button>
                </Link>
              </>
            ) : (
              <p className="py-2 text-center text-sm text-default-400">
                <span className="loading loading-dots loading-xl" />
              </p>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
