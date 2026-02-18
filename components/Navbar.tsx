"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Hide Navbar on protected routes where Sidebar is used
  if (
    ["/snippets", "/admin", "/moderator"].some((path) =>
      pathname?.startsWith(path),
    )
  ) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-indigo-100 bg-white/80 text-slate-700 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 transition hover:opacity-80"
            >
              <div className="rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 p-1.5 shadow-sm">
                <Terminal size={18} className="text-white" />
              </div>
              <span>
                Source
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Stash
                </span>
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {user ? (
                <>
                  <Link
                    href="/snippets/my"
                    className="font-medium text-slate-600 transition-colors duration-200 hover:text-indigo-600"
                  >
                    My Snippets
                  </Link>
                  <Link
                    href="/snippets/create"
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
                  >
                    Create Snippet
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="font-medium text-slate-600 transition-colors duration-200 hover:text-indigo-600"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-100 bg-white shadow-lg md:hidden">
          <div className="space-y-2 px-4 pt-3 pb-4">
            {user ? (
              <>
                <Link
                  href="/snippets/my"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                >
                  My Snippets
                </Link>
                <Link
                  href="/snippets/create"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
                >
                  Create Snippet
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-slate-600 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
