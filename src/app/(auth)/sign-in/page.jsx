"use client";

import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import {
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { signIn } from "@/lib/auth-client";

const SignIn = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    const { data: signInData, error } = await signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      console.error("Sign in error:", error);
      alert(error.message || "সাইন ইন করা যায়নি");
      return;
    }

    console.log("Sign in success:", signInData);
  };

  // Google Sign In হ্যান্ডলার
  const handleGoogleSignIn = async () => {
    const { error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      console.error("Google sign in error:", error);
      alert(error.message || "Google দিয়ে সাইন ইন করা যায়নি");
    }
  };

  // GitHub Sign In হ্যান্ডলার
  const handleGithubSignIn = async () => {
    const { error } = await signIn.social({
      provider: "github",
      callbackURL: "/",
    });

    if (error) {
      console.error("GitHub sign in error:", error);
      alert(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F0F5EF] px-5 py-8">
      <div className="w-full max-w-[450px]">
        {/* Heading */}
        <div className="mb-5 text-center">
          <h1 className="text-2xl font-bold text-[#17251B]">সাইন ইন করুন</h1>
          <p className="mt-3 text-[16px] leading-5 text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        {/* Sign In Card */}
        <Form
          onSubmit={onSubmit}
          className="w-full rounded-xl border border-[#E1E9E0] bg-[#FAFCFA] p-4 sm:p-5"
        >
          <Fieldset className="w-full">
            <FieldGroup className="gap-3">
              {/* Email */}
              <TextField
                isRequired
                name="email"
                type="email"
                className="w-full"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "সঠিক ইমেইল ঠিকানা লিখুন";
                  }
                  return null;
                }}
              >
                <Label className="mb-1 block text-lg font-medium text-[#26352A]">
                  ইমেইল
                </Label>
                <Input className="text-sm" placeholder="আপনার ইমেইল লিখুন" />
                <FieldError />
              </TextField>

              {/* Password */}
              <TextField
                isRequired
                name="password"
                type="password"
                minLength={8}
                className="w-full"
              >
                <Label className="mb-1 block text-lg font-medium text-[#26352A]">
                  পাসওয়ার্ড
                </Label>
                <Input
                  className="text-sm"
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                />
                <FieldError />
              </TextField>

              {/* Submit */}
              <Button
                type="submit"
                className="mt-1 w-full rounded-md border border-[#16A34A] bg-[#16A34A] py-2 text-sm font-semibold text-white transition hover:bg-[#15803D]"
              >
                সাইন ইন
              </Button>
            </FieldGroup>
          </Fieldset>

          {/* Divider */}
          <div className="my-4 flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-[#DFE5DE]" />
            <span className="text-[11px] text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-[#DFE5DE]" />
          </div>

          {/* Social Sign In */}
          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="tertiary"
              className="w-full"
              onPress={handleGoogleSignIn}
            >
              <Icon icon="devicon:google" />
              Google দিয়ে সাইন ইন
            </Button>

            <Button
              type="button"
              variant="tertiary"
              className="w-full"
              onPress={handleGithubSignIn}
            >
              <Icon icon="mdi:github" />
              GitHub দিয়ে সাইন ইন
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-4 w-full text-center text-[13px] text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </Form>

        {/* Back Link */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-[11px] text-gray-500 transition hover:text-emerald-600"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
