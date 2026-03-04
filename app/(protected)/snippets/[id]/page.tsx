"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import { User, ArrowLeft, Calendar, Code2 } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import { Snippet } from "@/components/SnippetCard";

export default function SnippetDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSnippet = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/snippet/${id}`);
      const formattedSnippet = {
        ...res.data,
        createdAt: new Date(res.data.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setSnippet(formattedSnippet);
    } catch {
      toast.error("Snippet not found");
      router.push("/snippets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippet();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!snippet) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => router.back()}
          className="group mb-8 flex items-center gap-2 text-slate-500 transition-colors hover:text-indigo-600 rounded-lg px-3 py-2 hover:bg-white/50"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span className="text-sm font-medium">Back to Snippets</span>
        </button>

        <div className="mb-8 rounded-2xl border border-indigo-100 bg-white/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 shadow-xl shadow-indigo-100/20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 text-xs font-bold tracking-wide text-indigo-700 uppercase">
                  {snippet.language}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <Calendar size={14} />
                  {snippet.createdAt}
                </span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl md:text-5xl">
                {snippet.title}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-slate-600">
                {snippet.description}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2 md:pt-0">
              <CopyButton code={snippet.code} />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-200">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Author
                </p>
                <p className="text-base font-bold text-slate-900">
                  {snippet.author?.name || "Anonymous"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 shadow-2xl shadow-indigo-100/50 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>
              <span className="ml-2 flex items-center gap-2 font-mono text-xs font-medium text-slate-500">
                <Code2 size={14} className="text-indigo-400" />
                {snippet.language.toLowerCase()}
              </span>
            </div>
          </div>

          <div className="text-xs sm:text-sm md:text-base bg-white overflow-x-auto">
            <SyntaxHighlighter
              language={snippet.language.toLowerCase()}
              style={oneLight}
              showLineNumbers={true}
              lineNumberStyle={{
                minWidth: "3em",
                paddingRight: "1em",
                color: "#cbd5e1",
                textAlign: "right",
              }}
              customStyle={{
                margin: 0,
                padding: "1rem",
                fontSize: "0.8rem",
                lineHeight: "1.6",
                background: "transparent",
              }}
            >
              {snippet.code}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
