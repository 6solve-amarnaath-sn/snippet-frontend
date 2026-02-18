"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import SnippetCard from "@/components/SnippetCard";
import { ShieldCheck, EyeOff, Trash2, Loader2, Edit3 } from "lucide-react";
import { Snippet } from "@/components/SnippetCard";
import Link from "next/link";

export default function ModeratorPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!loading && user?.role !== "moderator" && user?.role !== "admin") {
      router.push("/snippets");
    }
  }, [user, loading, router]);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      setIsFetching(true);
      const res = await api.get("/moderator/snippets");
      setSnippets(res.data);
    } catch {
      toast.error("Failed to load snippets");
    } finally {
      setIsFetching(false);
    }
  };

  const deleteSnippet = async (id: number) => {
    if (!confirm("Permanently delete this snippet?")) return;
    try {
      await api.delete(`/moderator/snippets/${id}`);
      toast.success("Snippet deleted");
      setSnippets(snippets.filter((s) => s.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  const hideSnippet = async (id: number) => {
    try {
      await api.put(`/moderator/snippets/${id}/hide`);
      toast.success("Snippet hidden from public");
      fetchSnippets();
    } catch {
      toast.error("Hide failed");
    }
  };

  if (loading || (user?.role !== "moderator" && user?.role !== "admin")) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <ShieldCheck className="text-blue-600" size={24} />
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Moderation Queue
              </h1>
            </div>
            <p className="text-gray-500">
              Review and manage community-submitted code snippets.
            </p>
          </div>
        </header>

        {isFetching ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-48 animate-pulse rounded-xl bg-gray-200"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {snippets.map((snippet) => (
              <div
                key={snippet.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="p-1">
                  <SnippetCard snippet={snippet}  />
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50 p-4">
                  {snippet.visibility === "private" ? (
                    <p className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100">
                      Hidden
                    </p>
                  ) : (
                    <button
                      onClick={() => hideSnippet(snippet.id)}
                      className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
                    >
                      <EyeOff size={16} /> Hide
                    </button>
                  )}
                  {user.role==="admin" && (
                    <Link
              href={`/snippets/${snippet.id}/edit`}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              <Edit3 size={16} /> Edit
            </Link>
                  )}
                  <button
                    onClick={() => deleteSnippet(snippet.id)}
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
