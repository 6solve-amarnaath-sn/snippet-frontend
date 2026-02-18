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

  const handleResetPassword = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      console.log(token);
      const response = await api.post(`/auth/resetpassword/${token}`, {
        password,
      });
      toast.success(response.data.message || "Password reset successful!");
      router.push("/login");
    } catch (err: unknown) {
      let message;
      if (err instanceof AxiosError) {
        message =
          err.response?.data?.msg ||
          err.response?.data?.message ||
          "Invalid email or password"
          ;
      } else if (err instanceof Error) {
        message = err.message;
      } else {
        message = "Invalid email or password";
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
      <form onSubmit={handleResetPassword} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="password">
            New Password
          </label>
          <input
            required
            className="w-full rounded border border-gray-200 bg-white/50 px-3 py-2 text-sm backdrop-blur-sm focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
            type="password"
            id="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            required
            className="w-full rounded border border-gray-200 bg-white/50 px-3 py-2 text-sm backdrop-blur-sm focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
            type="password"
            id="confirmPassword"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          disabled={isLoading}
          className="w-full rounded bg-gradient-to-r from-indigo-600 to-purple-600 py-2 text-sm font-medium text-white shadow-lg transition-all hover:opacity-90 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <Link href="/login" className="text-sm font-medium text-gray-600 hover:underline hover:text-black">Back to Login</Link>
      </div>
    </AuthLayout>
  );
}
