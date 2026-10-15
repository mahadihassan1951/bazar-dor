"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ToastHandler() {
  const { data: session, isPending } = authClient.useSession();
  const toastShown = useRef(false);

  useEffect(() => {
    if (isPending || !session?.user || toastShown.current) return;

    const message = sessionStorage.getItem("auth-toast-message");
    const type = sessionStorage.getItem("auth-toast-type");

    if (!message) return;

    sessionStorage.removeItem("auth-toast-message");
    sessionStorage.removeItem("auth-toast-type");

    toastShown.current = true;

    const timer = setTimeout(() => {
      if (type === "error") {
        toast.error(message);
      } else {
        toast.success(message);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [session, isPending]);

  return null;
}
