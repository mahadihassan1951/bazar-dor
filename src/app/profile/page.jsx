"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [name, setName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // ইউজার ডাটা লোড হলে ইনপুট ফিল্ডে বর্তমান নাম সেট হবে
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  // নাম আপডেট করার ফাংশন
  const handleUpdateName = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("দয়া করে একটি নাম লিখুন");
      return;
    }

    setIsUpdating(true);

    const { error } = await authClient.updateUser({
      name: name.trim(),
    });

    setIsUpdating(false);

    if (error) {
      toast.error(error.message || "নাম আপডেট করা যায়নি");
    } else {
      toast.success("নাম সফলভাবে আপডেট করা হয়েছে!");
    }
  };

  // সাইন আউট করার ফাংশন
  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট করা হয়েছে");
    router.push("/sign-in");
  };

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p>
          <span className="loading loading-dots loading-xl"></span>
        </p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-5">
        <h1 className="text-2xl font-bold">লগইন করা হয়নি</h1>
        <Link
          href="/sign-in"
          className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700"
        >
          সাইন ইন করুন
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F0F5EF] px-4 py-10 text-[#17251B]">
      <div className="mx-auto max-w-2xl">
        {/* হেডার */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold sm:text-3xl">আমার প্রোফাইল</h1>
          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* প্রথম কার্ড - প্রোফাইল এবং সাইন আউট */}
        <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#E1E9E0] bg-[#FAFCFA] p-6 shadow-sm sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            {user.image ? (
              <img
                src={user.image}
                alt="Profile picture"
                className="h-16 w-16 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-emerald-600 text-2xl font-bold text-white">
                {(user.name || user.email || "U").charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold text-[#17251B]">
                {user.name || "ব্যবহারকারী"}
              </h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            ← সাইন আউট
          </button>
        </section>

        {/* দ্বিতীয় কার্ড - নাম আপডেট করার ফর্ম */}
        <section className="mt-6 rounded-2xl border border-[#E1E9E0] bg-[#FAFCFA] p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#17251B]">তথ্য</h3>

          <form onSubmit={handleUpdateName} className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-600">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#17251B] outline-none transition focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full rounded-xl bg-[#038543] py-3 text-center text-sm font-semibold text-white transition hover:bg-[#026b36] disabled:opacity-50"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
