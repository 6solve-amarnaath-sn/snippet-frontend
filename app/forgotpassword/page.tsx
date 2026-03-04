"use client";

import api from "@/lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";
import { AxiosError } from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/auth/forgotpassword", { email });
      toast.success(response.data.message || "Reset link sent!");
      setEmail("");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(
          err.response?.data?.msg ||
            err.response?.data?.message ||
            "Something went wrong"
        );
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      description="Enter your email and we'll send you a reset link."
    >
      <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="email"
            className="block mb-1.5 text-xs font-semibold text-gray-700 tracking-wide"
          >
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-xl border border-gray-300/70 bg-white/60 backdrop-blur-md px-3.5 py-2.5 text-sm text-indigo-950 outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-60"
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className={`w-full rounded-xl py-2.5 text-sm font-semibold text-white transition tracking-wide
            ${
              isLoading
                ? "bg-indigo-500/50 cursor-not-allowed"
                : "bg-linear-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/40 hover:opacity-95"
            }`}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm font-semibold text-gray-500 hover:underline"
        >
          ← Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
}
