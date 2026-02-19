"use client";

import api from "@/lib/axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthLayout from "@/components/auth/AuthLayout";
import { AxiosError } from "axios";

export default function ResetPassword() {
  const params = useParams();
  const router = useRouter();
  const token = params.token as string;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post(`/auth/resetpassword/${token}`, {
        password,
      });
      toast.success(response.data.message || "Password reset successful!");
      router.push("/login");
    } catch (err: unknown) {
      let message: string;
      if (err instanceof AxiosError) {
        message =
          err.response?.data?.msg ||
          err.response?.data?.message ||
          "Reset failed";
      } else if (err instanceof Error) {
        message = err.message;
      } else {
        message = "Reset failed";
      }
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      description="Enter your new password below."
    >
      <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
        <div>
          <label className="block mb-1.5 text-xs font-semibold text-gray-700 tracking-wide">
            New Password
          </label>
          <input
            required
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-xl border border-gray-300/70 bg-white/60 backdrop-blur-md px-3.5 py-2.5 text-sm text-indigo-950 outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-60"
          />
        </div>

        <div>
          <label className="block mb-1.5 text-xs font-semibold text-gray-700 tracking-wide">
            Confirm Password
          </label>
          <input
            required
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-xl border border-gray-300/70 bg-white/60 backdrop-blur-md px-3.5 py-2.5 text-sm text-indigo-950 outline-none transition focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-60"
          />
        </div>

        {error && (
          <div className="px-3.5 py-2.5 rounded-lg bg-red-100/70 border border-red-300/50 backdrop-blur-md text-sm text-red-600">
            {error}
          </div>
        )}

        <button
          disabled={isLoading}
          type="submit"
          className={`w-full rounded-xl py-2.5 text-sm font-semibold text-white transition tracking-wide
            ${
              isLoading
                ? "bg-indigo-500/50 cursor-not-allowed"
                : "bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/40 hover:opacity-95"
            }`}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
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
