"use client";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import React from "react";
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
import { signUp, signIn } from "@/lib/auth-client";

const SignUp = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const passwordConfirmation = String(
      formData.get("passwordConfirmation") ?? "",
    );

    if (password !== passwordConfirmation) {
      alert("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    const { data: signUpData, error } = await signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });

    if (error) {
      console.error("Sign up error:", error);
      alert(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }

    console.log("Sign up successful:", signUpData);
  };

  // গুগল সাইন ইন হ্যান্ডেল করার ফাংশন
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
        <div className="mb-5 text-center gap-3">
          <h1 className="text-2xl font-bold text-[#17251B] ">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-3 text-[16px] leading-5 text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Sign up Card */}
        <Form
          onSubmit={onSubmit}
          className="w-full rounded-xl border border-[#E1E9E0] bg-[#FAFCFA] p-4 sm:p-5"
        >
          <Fieldset className="w-full">
            <FieldGroup className="gap-3">
              <TextField
                isRequired
                name="name"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Name must be at least 3 characters";
                  }
                  return null;
                }}
              >
                <Label className="mb-1 block text-lg font-medium text-[#26352A]">
                  নাম
                </Label>
                <Input className="text-sm" placeholder="নাম লিখুন" />
                <FieldError />
              </TextField>

              {/* Email */}
              <TextField
                name="email"
                type="email"
                isRequired
                className="w-full"
              >
                <Label className="mb-1 block text-lg font-medium text-[#26352A]">
                  ইমেইল
                </Label>
                <Input placeholder="আপনার ইমেইল লিখুন" className="text-sm" />
                <FieldError />
              </TextField>

              {/* Password */}
              <TextField
                name="password"
                type="password"
                isRequired
                minLength={8}
                className="w-full"
              >
                <Label className="mb-1 block text-lg font-medium text-[#26352A]">
                  পাসওয়ার্ড
                </Label>
                <Input placeholder="পাসওয়ার্ড লিখুন" className="text-sm" />
                <FieldError />
              </TextField>

              <TextField
                name="passwordConfirmation"
                type="password"
                isRequired
                minLength={8}
                className="w-full"
              >
                <Label className="mb-1 block text-lg font-medium text-[#26352A]">
                  পাসওয়ার্ড নিশ্চিত করুন
                </Label>
                <Input
                  placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                  className="text-sm"
                />
                <FieldError />
              </TextField>

              {/* Submit */}
              <Button
                type="submit"
                className="mt-1 w-full rounded-md border border-[#16A34A] bg-[#16A34A] py-2 text-sm font-semibold text-white transition hover:bg-[#15803D]"
              >
                সাইন আপ
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
          <div className="flex w-full gap-2">
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

          {/* Sign In Link */}
          <p className="mt-4 w-full text-center text-[11px] text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <a
              href="/sign-in"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              সাইন ইন করুন
            </a>
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

export default SignUp;
