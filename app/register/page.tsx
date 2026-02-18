"use client";

import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      const token = res.data.token;

      localStorage.setItem("token", token);
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);

      router.push("/snippets");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.msg ||
          err.response?.data?.message ||
          "Registration failed",
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout
      title="Create an account"
      description="Enter your information to create an account"
    >
      {error && (
        <p className="mb-4 rounded bg-red-100 p-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <form
        onSubmit={
          handleSubmit as unknown as React.FormEventHandler<HTMLFormElement>
        }
        className="space-y-4"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="name@example.com"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded border px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="cursor-pointer font-medium text-black hover:underline"
        >
          Login
        </Link>
      </p>
    </AuthLayout>
  );
}
