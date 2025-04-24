import { Code, Github, Heart, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-auto pt-10 pb-6 relative">
      {/* Top border line */}
      <div className="absolute inset-x-0 top-0 h-px bg-zinc-800/50" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start gap-2 mb-4 md:mb-0">
            <div className="flex items-center gap-2 text-gray-300">
              <Code className="size-4 text-white" />
              <span className="font-medium text-sm text-gray-300">
                Elif - Code Beyond Limits!
              </span>
            </div>
            <p className="text-gray-500 text-xs text-center md:text-left">
              © {currentYear} Elif. All rights reserved.
            </p>
          </div>
          
          {/* Links */}
          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
            <div className="flex items-center gap-6">
              <Link href="/editor" className="text-gray-400 text-sm hover:text-white transition-colors">
                Editor
              </Link>
              <Link href="/snippets" className="text-gray-400 text-sm hover:text-white transition-colors">
                Snippets
              </Link>
            </div>
            
            {/* Social links */}
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a 
                href="https://github.com/adityasharmawork" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                aria-label="GitHub"
              >
                <Github className="size-4" />
              </a>
              <a 
                href="https://x.com/AdityaSharma056" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="size-4" />
              </a>
              <a 
                href="https://www.linkedin.com/in/adityasharma123/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-4" />
              </a>
              {/* <div className="flex items-center gap-1 text-gray-500 text-xs">
                <span>Made with</span>
                <Heart className="size-3 text-gray-300" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;