"use client";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-12 bg-[#F8FAFC]">
      
      <div className="relative w-full max-w-[440px]">

        <div className="relative bg-white/80 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_20px_50px_rgba(79,70,229,0.05)] px-8 py-10 md:px-10">
          
       
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[4px] rounded-b-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-sm shadow-indigo-200" />

      
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-200 text-white text-sm font-bold font-mono">
              {">_"}
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              SourceStash
            </span>
          </div>


          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
              {title}
            </h1>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              {description}
            </p>
          </div>

        
          <div className="relative z-10">
            {children}
          </div>
        </div>
        
      
        <div className="mt-8 text-center">
           <p className="text-xs text-slate-400 font-medium tracking-wide">
             &copy; {new Date().getFullYear()} SourceStash Inc.
           </p>
        </div>
      </div>
    </div>
  );
}