"use client";

import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ id: payload.id, name: payload.name, role: payload.role });
      router.push("/snippets");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.msg || err.response?.data?.message || "Invalid credentials");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      description="Enter your credentials to access your snippets."
    >
      <form onSubmit={handleLogin} className="space-y-5">
        

        <div className="group">
          <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 group-focus-within:text-indigo-600 transition-colors">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-900"
            />
          </div>
        </div>


        <div className="group">
          <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 group-focus-within:text-indigo-600 transition-colors">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="password"
              required
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none transition-all focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 text-slate-900"
            />
          </div>
     
          <div className="flex justify-end mt-2 px-1">
            <Link 
              href="/forgotpassword" 
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors underline-offset-4 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

       
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm py-3 px-4 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

       
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-[1px] transition-all active:scale-[0.98] shadow-lg shadow-indigo-200 disabled:opacity-70 disabled:pointer-events-none"
        >
          <div className="relative flex items-center justify-center gap-2 bg-indigo-600 px-8 py-3.5 rounded-[15px] group-hover:bg-transparent transition-all">
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-white" />
            ) : (
              <>
                <span className="text-sm font-bold text-white">Sign In</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </div>
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <p className="text-center text-sm text-slate-500">
          New here?{" "}
          <Link 
            href="/register" 
            className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}