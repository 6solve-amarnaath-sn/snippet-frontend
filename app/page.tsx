"use client";

import React from 'react';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Lock, Globe, Search, Zap, Code2, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100">
      
    
      <header className="relative max-w-6xl mx-auto pt-24 pb-20 px-6 overflow-hidden">
       
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-indigo-200/30 blur-[120px] rounded-full -z-10" />
        
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-indigo-600 text-xs font-semibold shadow-sm mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Open for public contributions
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900">
            
            Source<span className="text-indigo-600">Stash</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Don&apos;t let your best logic get lost in old git commits. 
            Store, sync, and share your most useful code snippets in a <span className="text-slate-900 font-medium">personal cloud vault.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            
            <Link 
              href="/snippets" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200"
            >
              Explore Public Snippets <Globe size={18} />
            </Link>
            <Link 
              href="/snippets/my" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-xl font-bold transition-all border border-slate-200 shadow-sm"
            >
              My Dashboard <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </header>

      
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="relative group">
      
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-5 py-3 bg-slate-50/50 border-b border-slate-100">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
              </div>
              <div className="text-xs font-mono text-slate-400 italic">utils/debounce.js</div>
              <CopyButton code={demoCode} />
            </div>
            <div className="p-4 text-sm sm:text-base overflow-x-auto">
              <SyntaxHighlighter 
                language="javascript" 
                style={oneLight} 
                customStyle={{ background: 'transparent', padding: '0' }}
              >
                {demoCode}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </section>

  
      <section className="max-w-6xl mx-auto px-6 py-20 bg-white rounded-3xl border border-slate-100 shadow-sm mb-20">
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="mx-auto md:mx-0 w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
              <Lock size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Private Stashing</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Keep proprietary snippets private. Access your personal library from any device instantly.</p>
          </div>
          
          <div className="space-y-4">
            <div className="mx-auto md:mx-0 w-12 h-12 bg-purple-50 border border-purple-100 rounded-xl flex items-center justify-center text-purple-600">
              <Search size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Smart Search</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Categorize with tags and search by language, title, or content. Never lose a helper function again.</p>
          </div>

          <div className="space-y-4">
            <div className="mx-auto md:mx-0 w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Lightning Fast</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Optimized for speed. No bloat. Just code, copy, and get back to your IDE.</p>
          </div>
        </div>
      </section>


      <footer className="border-t border-slate-200 py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-md shadow-indigo-100">
                <Code2 size={18} className="text-white" />
            </div>
            <span className="font-bold text-slate-900 uppercase tracking-wider text-sm">SourceStash</span>
          </div>
          <div className="text-slate-400 text-sm">
            Built for the modern developer workflow.
          </div>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/snippets" className="text-slate-600 hover:text-indigo-600 transition-colors">Public Library</Link>
            <Link href="/snippets/my" className="text-slate-600 hover:text-indigo-600 transition-colors">My Stash</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}