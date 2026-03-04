"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyButton from "./CopyButton";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { Edit3, User, Code2, Trash2 } from "lucide-react";

interface User {
  id: number;
  name: string;
}

export interface Snippet {
  id: number;
  title: string;
  description: string;
  code: string;
  visibility: "public" | "private";
  language: string;
  createdAt: string;
  moderatorHidden:boolean;
  author: User;
}

export default function SnippetCard({
  snippet,
  isOwner = false,
}: {
  snippet: Snippet;
  isOwner?: boolean;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this snippet?")) return;
    try {
      
      await api.delete(`/snippet/${snippet.id}`);
      toast.success("Snippet deleted!");
      router.refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="rounded-xl bg-white p-5 md:p-6">
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <div className="flex items-start justify-between">
            <Link href={`/snippets/${snippet.id}`} className="group">
              <h2 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                {snippet.title}
              </h2>
            </Link>
            <span className="inline-flex items-center rounded-md border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              {snippet.language}
            </span>
          </div>
          <p className="line-clamp-2 text-sm text-gray-600">
            {snippet.description}
          </p>
        </div>

        <div className="flex items-center justify-between border-y border-gray-50 py-2">
          <div className="flex items-center gap-2 text-gray-500">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
              <User size={14} />
            </div>
            <span className="text-xs font-medium">
              {snippet.author?.name || "Anonymous"}
            </span>
          </div>
          <CopyButton code={snippet.code} />
        </div>

        <div className="group/code relative overflow-hidden rounded-lg text-sm">
          <div className="absolute top-3 right-3 opacity-0 transition-opacity group-hover/code:opacity-100">
            <Code2 size={16} className="text-gray-400" />
          </div>
          <SyntaxHighlighter
            language={snippet.language.toLowerCase()}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1.25rem",
              borderRadius: "0.5rem",
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </div>

        {isOwner && (
          <div className="flex items-center gap-4 pt-2">
            <Link
              href={`/snippets/${snippet.id}/edit`}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 transition hover:text-blue-700"
            >
              <Edit3 size={16} /> Edit
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center gap-1.5 text-sm font-medium text-red-600 transition hover:text-red-700"
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
