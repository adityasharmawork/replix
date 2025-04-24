import { Zap } from "lucide-react";
import Link from "next/link";

export default function HomepageButton({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/editor"
      className={`inline-flex items-center justify-center gap-2 px-8 py-4
        bg-white text-black hover:bg-gray-200
        rounded-md shadow-sm transition-all duration-300 ${className}`}
    >
      <Zap className="w-5 h-5" />
      <span className="font-medium">Try it now</span>
    </Link>
  );
}