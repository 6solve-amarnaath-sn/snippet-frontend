"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("./login");
    }
  }, [user, router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow-md">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-1 text-gray-600">
              Role:{" "}
              <span className="font-semibold capitalize">{user.role}</span>
            </p>
          </div>

          <button
            className="rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            className="rounded-lg bg-blue-50 p-6 transition hover:bg-blue-100"
            href="/snippets"
          >
            <h2 className="text-xl font-semibold">View Snippets</h2>
            <p className="mt-2 text-sm text-gray-600">
              Browse and search public snippets.
            </p>
          </Link>

          <Link
            className="rounded-lg bg-green-50 p-6 transition hover:bg-gray-100"
            href="/snippets/create"
          >
            <h2 className="text-xl font-semibold">Create Snippet</h2>
            <p className="mt-2 text-sm text-gray-600">
              Add a new code snippet.
            </p>
          </Link>

          {(user.role === "moderator" || user.role === "admin") && (
            <Link
              className="rounded-lg bg-yellow-50 p-6 transition hover:bg-yellow-100"
              href="/moderator"
            >
              <h2 className="text-xl font-semibold">Moderator Panel</h2>
              <p className="mt-2 text-sm text-gray-600">
                Manage public snippets.
              </p>
            </Link>
          )}

          {user.role === "admin" && (
            <Link
              className="rounded-lg bg-purple-50 p-6 transition hover:bg-purple-100"
              href="/admin"
            >
              <h2 className="text-xl font-semibold">Admin Panel</h2>
              <p className="mt-2 text-sm text-gray-600">
                Manage users and roles.
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
