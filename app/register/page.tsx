"use client";

import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, SubmitEvent, useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, AlertCircle, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useAuth();

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
      localStorage.setItem("token", token);
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser(payload);
      router.push("/snippets");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.msg || err.response?.data?.message || "Registration failed");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      
      
      <div className="hidden lg:flex lg:w-[40%] bg-gradient-to-br from-slate-900 via-indigo-950 to-indigo-900 p-12 flex-col justify-between relative overflow-hidden">
        
       
        {/* <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full -mr-48 -mt-48 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full -ml-48 -mb-48 blur-[120px]" /> */}
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-mono font-bold shadow-lg shadow-indigo-500/20">
              {">_"}
            </div>
            <span className="text-xl font-bold text-white tracking-tight">SourceStash</span>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold text-white leading-tight">
              Level up your <br /> 
              <span className="text-indigo-400">coding workflow.</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-sm leading-relaxed">
              Join thousands of developers storing and sharing their best work in one secure place.
            </p>
          </div>
        </div>

        <div className="relative z-10 space-y-5">
          {[
            "Instant Syntax Highlighting",
            "Smart Tagging System",
            "Cloud Sync Everywhere"
          ].map((text) => (
            <div key={text} className="flex items-center gap-3 text-slate-200">
              <CheckCircle2 className="w-5 h-5 text-indigo-400" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 md:p-16 bg-slate-50/50">
        <div className="w-full max-w-[420px]">
        
          <div className="lg:hidden flex items-center gap-2 mb-8">
             <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-mono font-bold">
              {">_"}
            </div>
            <span className="text-lg font-bold text-slate-900">SourceStash</span>
          </div>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Free Forever
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
            <p className="text-slate-500 mt-2">Get started with your developer stash today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5 group">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-indigo-600 transition-colors">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm transition-all focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-1.5 group">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-indigo-600 transition-colors">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm transition-all focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-1.5 group">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-indigo-600 transition-colors">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm transition-all focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none text-slate-900"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm animate-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="font-semibold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Create My Stash</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-500 text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors underline underline-offset-4 decoration-indigo-200 hover:decoration-indigo-500">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}