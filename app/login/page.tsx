"use client";

import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));
      //console.log(payload);
      setUser({ id: payload.id, name: payload.name, role: payload.role });

      router.push("/snippets");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.msg ||
          err.response?.data?.message ||
          "Invalid email or password",
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Enter your email to sign in to your account"
    >
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded border border-gray-200 bg-white/50 px-3 py-2 text-sm backdrop-blur-sm focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
            type="email"
            id="email"
            required
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label
            className="mb-1 block text-sm font-medium"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full rounded border border-gray-200 bg-white/50 px-3 py-2 text-sm backdrop-blur-sm focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
            type="password"
            required
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-end">
          <Link
            href="/forgotpassword"
            className="text-sm font-medium text-purple-600 hover:text-purple-500 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          className="w-full rounded bg-gradient-to-r from-indigo-600 to-purple-600 py-2 text-sm font-medium text-white shadow-lg transition-all hover:opacity-90 hover:shadow-xl disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="cursor-pointer font-medium text-black hover:underline"
        >
          Register
        </Link>
      </p>
    </AuthLayout>
  );
}
