"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
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
  const router = useRouter();
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
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    try {
      const { error } = await signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");

      setTimeout(() => {
        router.replace("/sign-in");
        router.refresh();
      }, 800);
    } catch (error) {
      toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      sessionStorage.setItem(
        "auth-toast-message",
        "Google দিয়ে সাইন ইন সফল হয়েছে!",
      );
      sessionStorage.setItem("auth-toast-type", "success");

      const { error } = await signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        sessionStorage.removeItem("auth-toast-message");
        sessionStorage.removeItem("auth-toast-type");

        toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি");
      }
    } catch (error) {
      sessionStorage.removeItem("auth-toast-message");
      sessionStorage.removeItem("auth-toast-type");

      toast.error(
        error instanceof Error
          ? error.message
          : "Google দিয়ে সাইন ইন করা যায়নি",
      );
    }
  };

  const handleGithubSignIn = async () => {
    try {
      sessionStorage.setItem(
        "auth-toast-message",
        "GitHub দিয়ে সাইন ইন সফল হয়েছে!",
      );
      sessionStorage.setItem("auth-toast-type", "success");

      const { error } = await signIn.social({
        provider: "github",
        callbackURL: "/",
      });

      if (error) {
        sessionStorage.removeItem("auth-toast-message");
        sessionStorage.removeItem("auth-toast-type");

        toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি");
      }
    } catch (error) {
      sessionStorage.removeItem("auth-toast-message");
      sessionStorage.removeItem("auth-toast-type");

      toast.error(
        error instanceof Error
          ? error.message
          : "GitHub দিয়ে সাইন ইন করা যায়নি",
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F0F5EF] px-3 py-6 sm:px-5 sm:py-8">
      <div className="w-full max-w-[450px]">
        {/* Heading */}
        <div className="mb-5 gap-3 text-center">
          <h1 className="text-2xl font-bold text-[#17251B]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-3 text-[16px] leading-5 text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        {/* Sign up Card */}
        <Form
          onSubmit={onSubmit}
          className="w-full rounded-xl border border-[#E1E9E0] bg-[#FAFCFA] p-3 sm:p-5 md:p-6"
        >
          <Fieldset className="w-full">
            <FieldGroup className="gap-3">
              {/* Name */}
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
                <Label className="mb-1 block text-base font-medium text-[#26352A] sm:text-lg">
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
                autoComplete="off"
                className="w-full"
              >
                <Label className="mb-1 block text-base font-medium text-[#26352A] sm:text-lg">
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
                autoComplete="off"
                minLength={8}
                className="w-full"
              >
                <Label className="mb-1 block text-base font-medium text-[#26352A] sm:text-lg">
                  পাসওয়ার্ড
                </Label>
                <Input placeholder="পাসওয়ার্ড লিখুন" className="text-sm" />
                <FieldError />
              </TextField>

              {/* Password Confirmation */}
              <TextField
                name="passwordConfirmation"
                type="password"
                isRequired
                autoComplete="off"
                minLength={8}
                className="w-full"
              >
                <Label className="mb-1 block text-base font-medium text-[#26352A] sm:text-lg">
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
            <span className="shrink-0 text-[11px] text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-[#DFE5DE]" />
          </div>

          {/* Social Sign In */}
          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <Button
              type="button"
              variant="tertiary"
              className="w-full min-w-0 text-sm"
              onPress={handleGoogleSignIn}
            >
              <Icon icon="devicon:google" />
              Google দিয়ে সাইন ইন
            </Button>

            <Button
              type="button"
              variant="tertiary"
              className="w-full min-w-0 text-sm"
              onPress={handleGithubSignIn}
            >
              <Icon icon="mdi:github" />
              GitHub দিয়ে সাইন ইন
            </Button>
          </div>

          {/* Sign In Link */}
          <p className="mt-4 w-full text-center text-[11px] text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-emerald-600 hover:text-emerald-700"
            >
              সাইন ইন করুন
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

export default SignUp;
