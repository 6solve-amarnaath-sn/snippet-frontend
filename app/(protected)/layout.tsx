"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Terminal } from "lucide-react";

import Sidebar from "@/components/Sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) return null;

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 py-3 md:hidden">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-1.5 rounded-lg shadow-sm">
            <Terminal size={16} className="text-white" />
          </div>
          <span className="font-bold text-slate-900 text-sm">
            Source<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Stash</span>
          </span>
        </div>
        <div className="w-10" />
      </div>

      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      <main className="flex-1 ml-0 md:ml-20 pt-16 md:pt-0 p-4 md:p-8 transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
}
