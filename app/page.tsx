"use client";

import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Lock, Globe, Search, Zap, Code2, LogIn } from 'lucide-react';
import CopyButton from '@/components/CopyButton';


export default function HomePage() {
  const demoCode = `function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}`;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">


      <header className="relative max-w-6xl mx-auto pt-32 pb-24 px-6 overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-200/20 blur-[100px] rounded-full -z-10" />

        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 text-indigo-700 text-sm font-medium shadow-sm mb-6 hover:shadow-md transition-shadow cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
            </span>
            Open for public contributions
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight text-slate-900 drop-shadow-sm">
            Source<span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">Stash</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Don&apos;t let your best logic get lost in old git commits.
            Store, sync, and share your most useful code snippets in a <span className="text-slate-900 font-semibold decoration-indigo-300 decoration-2 underline-offset-4">personal cloud vault.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-8">

            <Link
              href="/snippets"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              Explore Public Snippets <Globe size={20} className="group-hover:rotate-12 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-2xl font-bold transition-all border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Login <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </header>


      <section className="max-w-5xl mx-auto px-6 mb-32">
        <div className="relative group perspective-1000">

          <div className="absolute -inset-1 bg-linear-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

          <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 ring-1 ring-slate-900/5 rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.01]">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50/80 border-b border-slate-100">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="text-xs font-mono text-slate-400 font-medium">utils/debounce.js</div>
              <CopyButton code={demoCode} />
            </div>
            <div className="p-6 text-sm sm:text-base overflow-x-auto bg-white/50">
              <SyntaxHighlighter
                language="javascript"
                style={oneLight}
                customStyle={{ background: 'transparent', padding: '0', margin: 0 }}
                showLineNumbers={true}
                lineNumberStyle={{ color: '#cbd5e1', minWidth: '2em', paddingRight: '1em', textAlign: 'right' }}
              >
                {demoCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 cursor-default">
            <div className="w-14 h-14 bg-indigo-50 group-hover:bg-indigo-600 transition-colors border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:text-white mb-6">
              <Lock size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-700 transition-colors">Private Stashing</h3>
            <p className="text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">Keep proprietary snippets private. Access your personal library from any device instantly, secured with modern encryption.</p>
          </div>

          <div className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-300 cursor-default">
            <div className="w-14 h-14 bg-purple-50 group-hover:bg-purple-600 transition-colors border border-purple-100 rounded-2xl flex items-center justify-center text-purple-600 group-hover:text-white mb-6">
              <Search size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-purple-700 transition-colors">Smart Search</h3>
            <p className="text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">Categorize with tags and search by language, title, or content. Never lose a helper function again with our fuzzy search.</p>
          </div>

          <div className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 cursor-default">
            <div className="w-14 h-14 bg-emerald-50 group-hover:bg-emerald-600 transition-colors border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:text-white mb-6">
              <Zap size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">Lightning Fast</h3>
            <p className="text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">Optimized for speed. No bloat. Just code, copy, and get back to your IDE. Built for performance first.</p>
          </div>
        </div>
      </section>


      <footer className="border-t border-indigo-100 py-16 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-linear-to-br from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <Code2 size={24} className="text-white" />
            </div>
            <span className="font-extrabold text-slate-900 text-lg tracking-tight">SourceStash</span>
          </div>
          <div className="text-slate-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} SourceStash. Built for developers.
          </div>
          <div className="flex gap-8 text-sm font-semibold">
            <Link href="/snippets" className="text-slate-600 hover:text-indigo-600 transition-colors">Public Library</Link>
            <Link href="/snippets/my" className="text-slate-600 hover:text-indigo-600 transition-colors">My Stash</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}