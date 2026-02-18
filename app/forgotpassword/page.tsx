"use client";

import api from '@/lib/axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import AuthLayout from "@/components/auth/AuthLayout";
import Link from 'next/link';
import { AxiosError } from 'axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
          "Invalid email or password",
        );
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Invalid email or password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      description="Enter your email address and we'll send you a link to reset your password."
    >
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            required
            className="w-full rounded border border-gray-200 bg-white/50 px-3 py-2 text-sm backdrop-blur-sm focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
            type="email"
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button
          disabled={isLoading}
          className="w-full rounded bg-gradient-to-r from-indigo-600 to-purple-600 py-2 text-sm font-medium text-white shadow-lg transition-all hover:opacity-90 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link href="/login" className="text-sm font-medium text-gray-600 hover:underline hover:text-black">
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
}
