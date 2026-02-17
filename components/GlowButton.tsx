// components/GlowButton.tsx
export default function GlowButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="
      group relative h-[50px] w-[220px] rounded-[10px] border-none bg-[#111] text-white outline-none cursor-pointer z-0
      
      /* The Rainbow Glow (::before) */
      before:content-[''] before:absolute before:-top-[2px] before:-left-[2px] before:-z-[1]
      before:h-[calc(100%+4px)] before:w-[calc(100%+4px)]
      before:bg-[linear-gradient(45deg,#ff0000,#ff7300,#fffb00,#48ff00,#00ffd5,#002bff,#7a00ff,#ff00c8,#ff0000)]
      before:bg-[length:400%] before:blur-[5px] before:rounded-[10px]
      before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out
      before:animate-glowing
      hover:before:opacity-100
      
      /* The Black Button Face (::after) */
      after:content-[''] after:absolute after:inset-0 after:-z-[1]
      after:bg-[#111] after:rounded-[10px]
      
      /* Active State: Text turns black, background disappears */
      active:text-black active:after:bg-transparent
    ">
      {children}
    </button>
  );
}