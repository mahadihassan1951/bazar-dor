"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p>প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-5">
        <h1 className="text-2xl font-bold">লগইন করা হয়নি</h1>

        <Link
          href="/sign-in"
          className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white"
        >
          সাইন ইন করুন
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-default-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm font-semibold text-emerald-600">
          ← হোম পেজে ফিরে যান
        </Link>

        <section className="mt-6 rounded-3xl  bg-background p-6 shadow-sm sm:p-10">
          <h1 className="text-2xl font-extrabold sm:text-3xl">আমার প্রোফাইল</h1>

          <p className="mt-2 text-sm text-default-500">
            আপনার অ্যাকাউন্টের তথ্য
          </p>

          <div className="mt-8 flex flex-col items-center  pb-8">
            {user.image ? (
              <img
                src={user.image}
                alt="Profile picture"
                className="h-28 w-28 rounded-full  object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-600 text-4xl font-bold text-white">
                {(user.name || user.email || "U").charAt(0).toUpperCase()}
              </div>
            )}

            <h2 className="mt-4 text-xl font-bold">
              {user.name || "ব্যবহারকারী"}
            </h2>

            <p className="mt-1 break-all text-sm text-default-500">
              {user.email}
            </p>

            {user.emailVerified && (
              <span className="mt-3 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                ইমেইল ভেরিফাই করা হয়েছে
              </span>
            )}
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-default-100 p-4">
              <p className="text-xs text-default-500">ইউজারের নাম</p>
              <p className="mt-1 break-words font-semibold">
                {user.name || "নাম দেওয়া নেই"}
              </p>
            </div>

            <div className="rounded-xl bg-default-100 p-4">
              <p className="text-xs text-default-500">ইমেইল ঠিকানা</p>
              <p className="mt-1 break-all font-semibold">{user.email}</p>
            </div>

            <div className="rounded-xl bg-default-100 p-4">
              <p className="text-xs text-default-500">অ্যাকাউন্ট আইডি</p>
              <p className="mt-1 break-all font-mono text-sm">{user.id}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
