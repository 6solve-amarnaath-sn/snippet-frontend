"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Terminal } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="border-b border-slate-800 bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="shrink-0">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight transition hover:text-indigo-400"
            ><Terminal size={24} className="text-white inline" />
              Source<span className="text-indigo-500">Stash</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="rounded-md px-3 py-2 text-sm font-medium transition hover:bg-slate-800"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/snippets/create"
                    className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium transition hover:bg-indigo-700"
                  >
                    Create Snippet
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-md px-3 py-2 text-sm font-medium transition hover:text-indigo-400"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-md border border-indigo-500 px-4 py-2 text-sm font-medium transition hover:bg-indigo-500"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-slate-800 hover:text-white focus:outline-none"
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
        <div className="border-t border-slate-800 bg-slate-900 md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block rounded-md px-3 py-2 text-base font-medium hover:bg-slate-800"
                >
                  Dashboard
                </Link>
                <Link
                  href="/snippets/create"
                  className="block rounded-md px-3 py-2 text-base font-medium text-indigo-400"
                >
                  Create Snippet
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium hover:bg-slate-800"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block rounded-md px-3 py-2 text-base font-medium hover:bg-slate-800"
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
