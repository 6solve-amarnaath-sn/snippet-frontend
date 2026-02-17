"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
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
      console.log(new Date(res.data.createdAt));
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
        <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!snippet) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => router.back()}
          className="group mb-6 flex items-center gap-2 text-gray-500 transition-colors hover:text-blue-600"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          <span className="text-sm font-medium">Back to Snippets</span>
        </button>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold tracking-wider text-blue-700 uppercase dark:bg-blue-900/30 dark:text-blue-300">
                  {snippet.language}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={12} />
                  {snippet.createdAt}
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl dark:text-white">
                {snippet.title}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                {snippet.description}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2 md:pt-0">
              <CopyButton code={snippet.code} />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-6 dark:border-gray-700">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-sm">
                <User size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-500">
                  Author
                </p>
                <p className="text-sm font-bold">
                  {snippet.author?.name || "Anonymous"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-lg dark:border-gray-700">
          <div className="flex items-center justify-between border-b border-gray-800 bg-[#1e1e1e] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-4 flex items-center gap-1.5 font-mono text-xs text-gray-400">
                <Code2 size={14} />
                {snippet.language.toLowerCase()}
              </span>
            </div>
          </div>

          <div className="text-sm md:text-base">
            <SyntaxHighlighter
              language={snippet.language.toLowerCase()}
              style={oneDark}
              showLineNumbers={true}
              lineNumberStyle={{
                minWidth: "3em",
                paddingRight: "1em",
                color: "#4b5563",
              }}
              customStyle={{
                margin: 0,
                padding: "1.5rem",
                fontSize: "0.95rem",
                lineHeight: "1.6",
                background: "#1e1e1e",
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
