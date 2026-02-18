"use client";

import { Copy } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  code: string;
}

export default function CopyButton({ code }: Props) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    toast.success("Code copied!");
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:text-indigo-600 transition-all active:scale-95"
    >
      <Copy size={12} />
      <span>Copy</span>
    </button>
  );
}
