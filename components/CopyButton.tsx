"use client";

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
      className="rounded bg-gray-800 px-3 py-1 text-sm text-white"
    >
      Copy
    </button>
  );
}
