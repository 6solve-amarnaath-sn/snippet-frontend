"use client";

import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Create Snippet</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full border p-2"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-2"
        />
        <textarea
          name="code"
          placeholder="Code"
          rows={10}
          onChange={handleChange}
          className="w-full border p-2 font-mono"
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          onChange={handleChange}
          className="w-full border p-2"
        />

        <select
          name="language"
          value={form.language}
          onChange={handleChange}
          className="w-full border p-2"
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
          className="w-full border p-2"
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
