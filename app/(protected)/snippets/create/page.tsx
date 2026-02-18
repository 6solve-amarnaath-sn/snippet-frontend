"use client";

import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreateSnippet() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    code: "",
    language: "javascript",
    visibility: "public",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const LANGUAGES = [
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "Python", value: "python" },
    { label: "Rust", value: "rust" },
    { label: "Go", value: "go" },
  ];
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/snippet", form);

      router.push("/snippets/my");
    } catch {
      console.log("Failed to create snippet");
      toast.error("Failed to create snippet")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 border shadow-lg border-gray-200 rounded-lg">
      <h1 className="mb-6 text-2xl sm:text-3xl font-bold">Create Snippet</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full border p-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow "
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow "
        />
        <textarea
          name="code"
          placeholder="Code"
          rows={10}
          onChange={handleChange}
          className="w-full border p-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow font-mono"
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          onChange={handleChange}
          className="w-full border p-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow "
        />

        <select
          name="language"
          value={form.language}
          onChange={handleChange}
          className="w-full border p-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow "
        >
          <option value="">Select a language</option>
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        <select
          name="visibility"
          onChange={handleChange}
          className="w-full border p-2 pr-10 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow "
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>

        <button
          disabled={loading}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
