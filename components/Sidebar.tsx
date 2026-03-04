"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    Globe,
    Archive,
    Plus,
    Shield,
    Settings,
    LogOut,
    User,
    Terminal,
    X,
} from "lucide-react";

interface SidebarProps {
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
    const { user, setUser } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isHovered, setIsHovered] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/login");
    };

    if (!user) return null;

    const links = [
        { name: "Explore", href: "/snippets", icon: Globe },
        { name: "My Stash", href: "/snippets/my", icon: Archive },
        { name: "Create Snippet", href: "/snippets/create", icon: Plus },
    ];

    if (user.role === "moderator" || user.role === "admin") {
        links.push({ name: "Moderator", href: "/moderator", icon: Shield });
    }

    if (user.role === "admin") {
        links.push({ name: "Admin", href: "/admin", icon: Settings });
    }

    const sidebarContent = (isMobile: boolean) => (
        <>
            
            <div className="flex h-20 items-center justify-between border-b border-slate-100 px-4">
                <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                    <div className="shrink-0 bg-linear-to-br from-indigo-600 to-purple-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
                        <Terminal size={24} className="text-white" />
                    </div>
                    <span
                        className={`font-extrabold text-xl tracking-tight transition-opacity duration-300 ${isMobile || isHovered ? "opacity-100" : "opacity-0 w-0"
                            }`}
                    >
                        Source<span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">Stash</span>
                    </span>
                </div>
                {isMobile && (
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>

          
            <nav className="flex-1 space-y-2 p-4 overflow-y-auto overflow-x-hidden">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => isMobile && setMobileOpen(false)}
                            className={`group flex items-center gap-4 rounded-xl px-3.5 py-3 transition-all duration-200 whitespace-nowrap relative ${isActive
                                ? "bg-indigo-50 text-indigo-700 font-bold shadow-sm"
                                : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600 font-medium"
                                }`}
                        >
                            <Icon
                                size={22}
                                className={`shrink-0 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"
                                    }`}
                            />
                            <span
                                className={`transition-all duration-300 origin-left ${isMobile || isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 w-0 overflow-hidden"
                                    }`}
                            >
                                {link.name}
                            </span>

                            {!isMobile && !isHovered && isActive && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-l-full" />
                            )}
                        </Link>
                    );
                })}
            </nav>

     
            <div className="border-t border-slate-100 p-4 bg-slate-50/50">
                <div className={`flex items-center gap-3 whitespace-nowrap overflow-hidden transition-all duration-300 ${isMobile || isHovered ? "justify-start" : "justify-center"}`}>
                    <div className="shrink-0 h-10 w-10 bg-linear-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
                        {user.name ? user.name.charAt(0).toUpperCase() : <User size={18} />}
                    </div>
                    <div
                        className={`flex flex-col transition-all duration-300 ${isMobile || isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
                            }`}
                    >
                        <span className="text-sm font-bold text-slate-800 truncate max-w-30">
                            {user.name || "User"}
                        </span>
                        <span className="text-xs text-slate-500 capitalize">{user.role}</span>
                    </div>

                    <button
                        onClick={handleLogout}
                        className={`ml-auto p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors ${!isMobile && !isHovered && "hidden"}`}
                        title="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </>
    );

    return (
        <>
         
            <aside
                className={`hidden md:flex fixed left-0 top-0 z-40 h-screen bg-white transition-all duration-300 ease-in-out border-r border-slate-200 shadow-xl shadow-indigo-100/50 flex-col ${isHovered ? "w-64" : "w-20"
                    }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {sidebarContent(false)}
            </aside>

           
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

          
            <aside
                className={`fixed left-0 top-0 z-50 h-screen w-72 bg-white border-r border-slate-200 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {sidebarContent(true)}
            </aside>
        </>
    );
}
