"use client";

import { useAuth} from "@/context/AuthContext";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, SubmitEvent, useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  AlertCircle,
  Loader2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { loginWithToken } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      const token = res.data.token;
      loginWithToken(token);
      router.push("/snippets");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(
          err.response?.data?.msg ||
            err.response?.data?.message ||
            "Registration failed",
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-linear-to-br from-slate-900 via-indigo-950 to-indigo-900 p-12 lg:flex lg:w-[40%]">
        <div className="relative z-10">
          <div className="mb-16 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 font-mono font-bold text-white shadow-lg shadow-indigo-500/20">
              {">_"}
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              SourceStash
            </span>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl leading-tight font-extrabold text-white">
              Level up your <br />
              <span className="text-indigo-400">coding workflow.</span>
            </h2>
            <p className="max-w-sm text-lg leading-relaxed text-slate-300">
              Join thousands of developers storing and sharing their best work
              in one secure place.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-5">
          {[
            "Instant Syntax Highlighting",
            "Smart Tagging System",
            "Cloud Sync Everywhere",
          ].map((text) => (
            <div key={text} className="flex items-center gap-3 text-slate-200">
              <CheckCircle2 className="h-5 w-5 text-indigo-400" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-slate-50/50 p-8 md:p-16">
        <div className="w-full max-w-[420px]">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-mono text-xs font-bold text-white">
              {">_"}
            </div>
            <span className="text-lg font-bold text-slate-900">
              SourceStash
            </span>
          </div>

          <div className="mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-bold tracking-wider text-indigo-600 uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Free Forever
            </div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">
              Create Account
            </h1>
            <p className="mt-2 text-slate-500">
              Get started with your developer stash today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group space-y-1.5">
              <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pr-4 pl-12 text-sm text-slate-900 transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5"
                />
              </div>
            </div>

            <div className="group space-y-1.5">
              <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pr-4 pl-12 text-sm text-slate-900 transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5"
                />
              </div>
            </div>

            <div className="group space-y-1.5">
              <label className="ml-1 text-xs font-bold tracking-widest text-slate-400 uppercase transition-colors group-focus-within:text-indigo-600">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-4 h-4.5 w-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-indigo-500" />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pr-4 pl-12 text-sm text-slate-900 transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5"
                />
              </div>
            </div>

            {error && (
              <div className="animate-in slide-in-from-top-2 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p className="font-semibold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 active:scale-[0.99] disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span>Create My Stash</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-indigo-600 underline decoration-indigo-200 underline-offset-4 transition-colors hover:text-indigo-700 hover:decoration-indigo-500"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
