"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axios";
import SnippetCard from "@/components/SnippetCard";
import {
  Plus,
  FolderCode,
  Loader2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Snippet } from "@/components/SnippetCard";

export default function MySnippets() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMySnippets();
  }, [page]);

  const fetchMySnippets = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/snippet/my?page=${page}`);
      console.log(res.data.snippets);
      setSnippets(res.data.snippets || []);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      console.log("Failed to load your snippets");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600">
                <FolderCode size={24} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                My Snippets
              </h1>
            </div>
            <p className="text-gray-500">
              Manage, edit, and share your personal collection of code.
            </p>
          </div>

          <Link
            href="/snippets/create"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg active:scale-95"
          >
            <Plus size={20} />
            <span>Create New Snippet</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="mb-4 animate-spin text-indigo-600" size={40} />
            <p className="font-medium text-gray-500">
              Fetching your collection...
            </p>
          </div>
        ) : snippets.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {snippets.map((snippet) => (
              <div
                key={snippet.id}
                className="transition-transform duration-200 hover:-translate-y-1"
              >
                <SnippetCard snippet={snippet} isOwner={true} />
              </div>
            ))}

            {snippets.length > 0 && (
              <div className="mt-16 flex items-center justify-center gap-6">
                <button
                  disabled={page === 1 || loading}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-full border border-gray-200 p-3 transition-all hover:bg-white hover:shadow-md disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>

                <span className="text-sm font-bold text-gray-900">
                  {page} <span className="mx-1 text-gray-300">/</span>{" "}
                  {totalPages}
                </span>

                <button
                  disabled={page === totalPages || loading}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-full border border-gray-200 p-3 transition-all hover:bg-white hover:shadow-md disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white py-20 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 text-gray-400">
              <Sparkles size={32} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              No snippets yet
            </h3>
            <p className="mx-auto mb-8 max-w-xs text-gray-500">
              Your personal library is empty. Start by saving your first piece
              of code!
            </p>
            <Link
              href="/snippets/create"
              className="font-semibold text-indigo-600 underline underline-offset-4 hover:text-indigo-700"
            >
              Create your first snippet
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
