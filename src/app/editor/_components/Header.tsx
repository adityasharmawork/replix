// import { currentUser } from "@clerk/nextjs/server";
// import { ConvexHttpClient } from "convex/browser";
// import { api } from "../../../../convex/_generated/api";
// import { SignOutButton, SignUpButton } from "@clerk/nextjs";
// import { Link } from "lucide-react";

// const Header = async () => {
//     const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
//     const user = await currentUser();

//     const convexUser = await convex.query(api.users.getUser, {
//         userId: user?.id || "",
//     });


//   return (
//     <div className="relative z-10">

//         <div className="flex items-center lg:justify-between justify-center bg-[#0a0a0f]/80 backdrop-blur-xl p-6 mb-4 rounded-lg">
//             <div className="hidden lg:flex items-center gap-8">
//                 <Link href="/" className="flex items-center gap-3 group relative">
//                     <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/2 to-purple-500/2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"/>
//                 </Link>
//             </div>
//         </div>

//     </div>
//   );
// }

// export default Header







"use client";
// import { currentUser } from "@clerk/nextjs/server";
// import { ConvexHttpClient } from "convex/browser";
// import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Calendar, Code, Container, Menu, X } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import ThemeSelector from "./ThemeSelector";
// import LanguageSelector from "./LanguageSelector";
import LanguageSelector from "./LanguageSelector";
import RunButton from "./RunButton";
import HeaderProfileBtn from "./HeaderProfileBtn";
import { RefObject, useState } from "react";

function Header({ stdinRef }: { stdinRef: RefObject<HTMLTextAreaElement> }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative z-30 p-2">
      <div className="flex items-center justify-between glassmorphism-dark p-3 mb-2 rounded-lg">
        {/* Logo section - visible on all screens */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group relative">
            {/* Logo hover effect */}
            <div className="absolute -inset-2 rounded-lg opacity-0 
              group-hover:opacity-100 group-hover:animate-pulse-slow transition-all duration-500 
              bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-xl" />
            {/* Logo container */}
            <div className="relative p-2 rounded-xl bg-gradient-to-br from-dark-100 to-dark-300 
              ring-1 ring-gray-700/30 shadow-lg group-hover:shadow-glow transition-all duration-300">
              <Code className="w-5 h-5 text-primary-400 transform -rotate-6 group-hover:rotate-0 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="block text-lg font-semibold bg-gradient-to-r 
                from-primary-400 via-blue-300 to-secondary-400 text-transparent bg-clip-text bg-size-200 
                group-hover:animate-gradient-x">
                Replix
              </span>
              <span className="hidden xs:block text-xs text-primary-400/60 font-medium">
                Code Beyond Limits!
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <ThemeSelector />
            <LanguageSelector />
          </div>

          <SignedIn>
            <RunButton stdinRef={stdinRef} />
          </SignedIn>

          <div className="pl-2 border-l border-gray-800/50">
            <HeaderProfileBtn />
          </div>

          {/* Navigation links */}
          <nav className="hidden lg:flex items-center ml-2">
            <Link
              href="/events"
              className="relative group flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-200 
                hover:text-white transition-all duration-300 overflow-hidden"
            >
              {/* Background and border effects */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary-600/10 rounded-lg transition-opacity duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-lg blur-md transition-opacity duration-300" />
              <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left h-[1px] bottom-0 bg-gradient-to-r from-primary-400 to-secondary-400 transition-transform duration-300" />
              
              <Calendar className="w-4 h-4 relative z-10 group-hover:text-primary-400 transition-colors duration-300" />
              <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors duration-300">
                Events
              </span>
            </Link>
            <Link
              href="/snippets"
              className="relative group flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-200 
                hover:text-white transition-all duration-300 overflow-hidden"
            >
              {/* Background and border effects */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-primary-600/10 rounded-lg transition-opacity duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-lg blur-md transition-opacity duration-300" />
              <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left h-[1px] bottom-0 bg-gradient-to-r from-primary-400 to-secondary-400 transition-transform duration-300" />
              
              <Container className="w-4 h-4 relative z-10 group-hover:text-primary-400 transition-colors duration-300" />
              <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors duration-300">
                Community
              </span>
            </Link>
          </nav>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <SignedIn>
            <RunButton stdinRef={stdinRef} />
          </SignedIn>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 bg-dark-100/80 rounded-lg text-gray-300"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20 pt-20 p-4 bg-dark-400/95 backdrop-blur-sm">
          <div className="glassmorphism-dark rounded-xl p-4 flex flex-col gap-4 max-w-sm mx-auto">
            <div className="flex justify-between items-center border-b border-gray-800/30 pb-3">
              <h3 className="text-lg font-medium text-white">Menu</h3>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-3 py-2">
              <ThemeSelector fullWidth />
              <LanguageSelector fullWidth />
            </div>
            
            <Link
              href="/snippets"
              className="relative flex items-center gap-2 p-3 rounded-lg text-gray-200 
                bg-dark-300/80 hover:bg-primary-600/10 border border-gray-800/30 hover:border-primary-500/30"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Container className="w-5 h-5 text-primary-400" />
              <span className="text-sm font-medium">Community</span>
            </Link>
            
            <div className="pt-2 border-t border-gray-800/30">
              <HeaderProfileBtn mobile />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Header;