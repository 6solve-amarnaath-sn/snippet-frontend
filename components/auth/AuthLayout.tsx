"use client";

import img from "@/public/img.jpg";

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
}

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-6 md:py-12">


            <div className="relative flex w-full max-w-[1000px] overflow-hidden rounded-2xl bg-white/10 shadow-2xl ring-1 ring-white/20 backdrop-blur-xl">


                <div className="flex w-full flex-col justify-center bg-white px-6 py-8 backdrop-blur-sm sm:px-8 sm:py-12 lg:w-1/2 lg:px-12">
                    <div className="mx-auto w-full max-w-sm">
                        <div className="mb-6 sm:mb-8 text-center lg:text-left">
                            <h1 className="mb-2 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
                            <p className="text-gray-600 font-medium">{description}</p>
                        </div>
                        {children}
                    </div>
                </div>


                <div
                    className="hidden w-1/2 relative lg:flex flex-col items-center justify-center p-12 text-center text-white backdrop-blur-md"
                    style={{
                        backgroundImage: `url(${img.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                >

                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-black/50 to-purple-900/50 opacity-80 z-0"></div>
                    <div className="absolute inset-0 bg-white opacity-20 mix-blend-overlay pointer-events-none z-0"></div>


                    <div className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-purple-500/30 blur-2xl animate-pulse z-0"></div>
                    <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-indigo-500/30 blur-2xl animate-pulse delay-1000 z-0"></div>

                    <div className="relative z-10 max-w-md">
                        <h2 className="mb-4 text-4xl font-bold tracking-wide drop-shadow-lg">SourceStash</h2>
                        <p className="text-lg text-gray-200 drop-shadow-md">
                            Manage your code snippets efficiently. <br /> Secure, fast, and always accessible.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
