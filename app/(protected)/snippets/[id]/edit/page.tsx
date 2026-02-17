"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import {
  ChevronLeft,
  Code2,
  Save,
  Globe,
  Lock,
  Tag,
  Loader2,
  Brackets,
} from "lucide-react";

interface Snippet {
  id: number;
  title: string;
  description: string;
  code: string;
  language: string;
  visibility: "public" | "private";
  tags: string;
  userId: number;
}

export default function EditSnippetPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();

  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    code: "",
    language: "",
    visibility: "public",
    tags: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const LANGUAGES = [
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "Python", value: "python" },
    { label: "Rust", value: "rust" },
    { label: "Go", value: "go" },
  ];

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!id || !user) return;

    const fetchSnippet = async () => {
      try {
        const res = await api.get(`/snippet/${id}`);
        const data: Snippet = res.data;

        if (data.userId !== user?.id) {
          toast.error("Unauthorized access");
          router.back();
          return;
        }

        setSnippet(data);
        setForm({
          title: data.title,
          description: data.description,
          code: data.code,
          language: data.language,
          visibility: data.visibility,
          tags: data.tags,
        });
      } catch {
        toast.error("Failed to load snippet");
        router.push("/snippets/my");
      }
    };

    fetchSnippet();
  }, [id, user, router]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.code || !form.language) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await api.put(`/snippet/${id}`, form);
      toast.success("Changes saved!");
      router.push("/snippets/my");
    } catch {
      toast.error("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !snippet) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 text-black sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => router.back()}
          className="group mb-6 flex items-center text-sm font-medium text-gray-500 transition hover:text-gray-800"
        >
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6 sm:p-8">
            <div className="mb-2 flex items-center gap-3">
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <Code2 size={24} />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Edit Snippet
              </h1>
            </div>
            <p className="text-sm text-gray-500">
              Update your code and settings.
            </p>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="mb-2 block text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g., Responsive Navbar Hook"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 transition outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={2}
                  placeholder="What does this code do?"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 transition outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold tracking-widest text-gray-400 uppercase">
                Code Snippet *
              </label>
              <div className="group relative overflow-hidden rounded-xl ring-1 ring-gray-200">
                <textarea
                  name="code"
                  value={form.code}
                  onChange={handleChange}
                  rows={14}
                  className="w-full resize-none bg-[#1e1e1e] p-4 font-mono text-sm text-gray-100 transition outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute top-3 right-3 rounded bg-white/10 px-2 py-1 text-[10px] font-bold text-gray-400 uppercase ring-1 ring-white/20 backdrop-blur-sm">
                  {form.language || "text"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
                  <Brackets size={14} /> Language *
                </label>
                <select
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 transition outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select language...</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang.value} value={lang.value}>
                      {lang.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
                  <Tag size={14} /> Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="react, tailwind..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 transition outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-6 sm:flex-row">
              <div className="flex w-full items-center gap-4 sm:w-auto">
                <div className="relative w-full sm:w-40">
                  <select
                    name="visibility"
                    value={form.visibility}
                    onChange={handleChange}
                    className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm font-semibold transition outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                  <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
                    {form.visibility === "public" ? (
                      <Globe size={18} />
                    ) : (
                      <Lock size={18} />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex w-full gap-3 sm:w-auto">
                <button
                  type="button"
                  onClick={() => router.push("/snippets/my")}
                  className="flex-1 px-6 py-2.5 text-sm font-bold text-gray-500 transition hover:text-gray-800 sm:flex-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-10 py-2.5 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 sm:flex-none"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {submitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
