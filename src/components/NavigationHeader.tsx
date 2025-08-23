"use client";

import HeaderProfileBtn from "@/app/editor/_components/HeaderProfileBtn";
import { SignedOut } from "@clerk/nextjs";
import { Calendar, Code, Container, LucideChartColumnIncreasing, LucideIcon, Menu, Star, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const GITHUB_REPO = "https://github.com/adityasharmawork/replix";

// Navigation links data
const navLinks = [
  { href: "/editor", label: "Code", icon: Code },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/learning", label: "Learning", icon: LucideChartColumnIncreasing },
  { href: "/snippets", label: "Community", icon: Container },
];

// NavLink component for consistent styling
function NavLink({ 
  href, 
  label, 
  icon: Icon,
  onClick
}: { 
  href: string; 
  label: string; 
  icon: LucideIcon;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative group flex items-center gap-2 px-4 py-2 rounded-lg text-gray-300 
        hover:text-white transition-all duration-300 overflow-hidden"
    >
      {/* Background and border effects */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/5 rounded-lg transition-opacity duration-300" />
      <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left h-[1px] bottom-0 bg-white/20 transition-transform duration-300" />
      
      {/* Icon and text */}
      <Icon className="w-4 h-4 relative z-10 group-hover:text-white transition-colors duration-300" />
      <span className="text-sm font-medium relative z-10 group-hover:text-white transition-colors duration-300">
        {label}
      </span>
    </Link>
  );
}

function NavigationHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Outer glassmorphism container */}
      <div className="glassmorphism-dark border-b border-zinc-800/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative h-16 flex items-center justify-between">
            {/* Left Section: Logo + Links */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group relative">
                {/* Logo container with minimal design */}
                <div className="relative p-2.5 rounded-xl bg-zinc-900
                  ring-1 ring-white/10 shadow-lg transition-all duration-300">
                  <Code className="w-5 h-5 text-white transform transition-transform duration-500" />
                </div>
                {/* Text */}
                <div className="relative">
                  <span className="block text-lg font-semibold text-white">
                    Replix
                  </span>
                  <span className="block text-xs text-gray-400 font-medium">
                    Code Beyond Limits!
                  </span>
                </div>
              </Link>

              {/* Navigation Links - Desktop */}
              <nav className="hidden md:flex items-center gap-1">
                {navLinks.map(link => (
                  <NavLink 
                    key={link.href}
                    href={link.href} 
                    label={link.label} 
                    icon={link.icon}
                  />
                ))}
              </nav>
            </div>

            {/* Right Section: Profile and Auth */}
            <div className="flex items-center gap-4">
              <SignedOut>
                {/* You can optionally show a SignIn button or message here */}
              </SignedOut>

              {/* GitHub Star Button - Desktop */}
              <a
                href={GITHUB_REPO}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Star Replix on GitHub"
                className="hidden md:inline-flex items-center gap-3 px-4 py-2 rounded-md bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/30 transition-all duration-300 transform  group"
                >
                <Star className="w-5 h-5 text-white group-hover:animate-pulse" />
                <div className="text-left">
                <div className="text-sm font-medium">Star on GitHub</div>
                <div className="text-[11px] text-gray-400 -mt-0.5">If Replix helped you, give us a ⭐</div>
                </div>
              </a>


              <HeaderProfileBtn />

              {/* Mobile menu button */}
              <button 
                onClick={toggleMobileMenu} 
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glassmorphism-dark border-b border-zinc-800/30">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <NavLink 
                key={link.href}
                href={link.href} 
                label={link.label} 
                icon={link.icon}
                onClick={closeMobileMenu}
              />
            ))}

            {/* Mobile GitHub Star link */}
            <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star Replix on GitHub"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-all duration-300"
            onClick={closeMobileMenu}
            >
            <Star className="w-4 h-4" />
            <div className="text-sm font-medium">Star Replix on GitHub</div>
            </a>


          </div>
        </div>
      )}
    </div>
  );
}

export default NavigationHeader;
