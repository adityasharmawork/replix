"use client";

import { LANGUAGE_CONFIG } from "@/app/editor/_constants";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ArrowRightIcon, CodeIcon, CheckIcon } from "lucide-react";
import { useCodeEditorStore } from "@/store/useCodeEditorStore";

const LanguagesShowcase = () => {
  const router = useRouter();
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  const setLanguage = useCodeEditorStore((state) => state.setLanguage);
  
  // Convert language config object to array for easier mapping
  const languages = Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => ({
    key,
    ...lang
  }));
  
  const handleLanguageSelect = (languageId: string) => {
    // Set the language in localStorage
    localStorage.setItem("editor-language", languageId);
    
    // Update the language in the Zustand store directly
    setLanguage(languageId);
    
    // Navigate to the editor page
    router.push("/editor");
  };
  
  return (
    <section className="w-full py-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Section header */}
      <div className="text-center mb-12 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-3 text-white"
        >
          Support for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">All Major Languages</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg"
        >
          Choose your preferred language and start coding instantly in our feature-rich environment
        </motion.p>
      </div>
      
      {/* Languages grid */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {languages.map((language, index) => (
            <motion.div
              key={language.key}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                type: "spring",
                stiffness: 150
              }}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setHoveredLanguage(language.key)}
              onMouseLeave={() => setHoveredLanguage(null)}
              onClick={() => handleLanguageSelect(language.key)}
              className="flex flex-col items-center justify-center p-6 rounded-xl backdrop-blur-sm
                border border-zinc-800/50 bg-zinc-900/30 hover:bg-indigo-950/20 hover:border-indigo-500/30
                transition-all duration-300 cursor-pointer relative overflow-hidden group"
            >
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Language logo */}
              <div className="relative mb-4 transition-transform duration-300 group-hover:scale-110">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full 
                  blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                <Image
                  src={language.logoPath}
                  alt={`${language.label} logo`}
                  width={56}
                  height={56}
                  className="relative z-10"
                />
              </div>
              
              {/* Language name */}
              <h3 className="text-lg font-medium text-gray-200 group-hover:text-white mb-1 transition-colors">
                {language.label}
              </h3>
              
              {/* Try now button - appears on hover */}
              <div 
                className={`flex items-center justify-center w-full mt-2 transition-all duration-300
                  ${hoveredLanguage === language.key ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              >
                <span className="text-xs font-medium text-indigo-300 flex items-center gap-1">
                  Code Now <ArrowRightIcon className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Call to action banner */}
      <div className="max-w-5xl mx-auto mt-16 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 p-4 md:p-8 
            rounded-xl bg-indigo-900/10 border border-indigo-500/20 backdrop-blur-sm"
        >
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-white mb-2">Ready to write some code?</h4>
            <p className="text-gray-300">No setup, no waiting - just pick your language and start building.</p>
          </div>
          <button
            onClick={() => router.push("/editor")}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 
              text-white font-medium hover:from-indigo-500 hover:to-blue-500 
              transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30"
          >
            Start Coding
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LanguagesShowcase; 