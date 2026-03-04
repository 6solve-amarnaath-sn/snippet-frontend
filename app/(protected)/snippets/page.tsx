"use client";

import api from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { ghcolors } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Search,
  Code2,
  User as UserIcon,
  ChevronLeft,
  ChevronRight,
  Terminal,
} from "lucide-react";

interface User {
  id: number;
  name: string;
}
interface Snippet {
  id: number;
  title: string;
  description: string;
  code: string;
  language: string;
  tags: string;
  author: User;
}

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchSnippets = async () => {
    setLoading(true);
    try {
      if(search){
        setPage(1);
      }
      const res = await api.get(
        `/snippet?search=${search}&page=${page}&limit=6`,
      );
      setSnippets(res.data.snippets);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch snippets", error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchSnippets();
    setTimeout(()=>{
      window.scrollTo({ top: 0, behavior: "smooth" });
    },50);
    
  }, [page]);

  return (
    <div className="min-h-screen bg-[#fcfcfc] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-2">
            <div className="mb-2 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-wider text-blue-600 uppercase">
              Community Library
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-gray-900">
              Public <span className="text-blue-600">Snippets</span>
            </h1>
            <p className="max-w-md text-lg text-gray-500">
              The ultimate collection of reusable code for modern developers.
            </p>
          </div>

          <div className="group relative w-full md:w-96">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
            </div>
            <input
              className="block w-full rounded-2xl border border-gray-200 bg-white py-3.5 pr-24 pl-10 text-gray-900 shadow-sm transition-all outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              type="text"
              placeholder="Search by title or language..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && fetchSnippets()}
            />
            <button
              onClick={fetchSnippets}
              disabled={loading}
              className="absolute top-2 right-2 bottom-2 rounded-xl bg-gray-900 px-4 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-95 disabled:opacity-50"
            >
              {loading ? "..." : "Search"}
            </button>
          </div>
        </header>

        {loading && page === 1 && snippets.length === 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-80 animate-pulse rounded-3xl bg-gray-100"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {snippets.map((snippet) => (
              <div
                key={snippet.id}
                className="group flex flex-col rounded-3xl border border-gray-100 bg-white p-2 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="flex grow flex-col rounded-[1.6rem] border border-transparent bg-gray-50/80 p-6 transition-colors group-hover:border-gray-100">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-xl bg-white p-2 shadow-sm">
                      <Code2 size={18} className="text-blue-500" />
                    </div>
                    <span className="rounded-md border border-gray-100 bg-white px-2 py-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                      {snippet.language}
                    </span>
                  </div>

                  <Link href={`/snippets/${snippet.id}`}>
                    <h2 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                      {snippet.title}
                    </h2>
                  </Link>

                  <p className="mb-6 line-clamp-2 text-sm text-gray-500">
                    {snippet.description}
                  </p>

                  <div className="pointer-events-none relative mt-auto h-24 overflow-hidden select-none">
                    <SyntaxHighlighter
                      language={snippet.language.toLowerCase()}
                      style={ghcolors}
                      customStyle={{
                        margin: 0,
                        padding: 0,
                        background: "transparent",
                        fontSize: "11px",
                        lineHeight: "1.6",
                        overflow: "hidden",
                      }}
                    >
                      {snippet.code}
                    </SyntaxHighlighter>

                    <div className="absolute inset-0 bg-linear-to-t from-gray-50/80 via-transparent to-transparent" />
                  </div>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                      <UserIcon size={12} className="text-blue-600" />
                    </div>
                    <span className="text-[11px] font-bold tracking-tight text-gray-500 uppercase">
                      {snippet.author?.name || "Anonymous"}
                    </span>
                  </div>
                  <Link
                    href={`/snippets/${snippet.id}`}
                    className="flex h-8 w-8 transform items-center justify-center rounded-full bg-gray-900 text-white transition-all group-hover:-rotate-45 hover:bg-blue-600"
                  >
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && snippets.length === 0 && (
          <div className="rounded-[3rem] border border-gray-100 bg-white py-24 text-center">
            <Terminal className="mx-auto mb-4 h-12 w-12 text-gray-200" />
            <h3 className="text-xl font-bold text-gray-900">
              No snippets found
            </h3>
            <p className="mt-2 text-gray-500">
              Try a different search or browse all.
            </p>
          </div>
        )}

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
              {page} <span className="mx-1 text-gray-300">/</span> {totalPages}
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
    </div>
  );
}
