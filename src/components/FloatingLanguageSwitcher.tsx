"use client";

import { useState, useEffect } from "react";
// If you got the official hooks working, use this:
// import { useLocale, setLocale } from "@lingo.dev/compiler/react";

// IF you are using the manual fix from earlier, keep using this logic:
export function FloatingLanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocaleState] = useState("en");

  // --- Logic from previous manual fix (or replace with useLocale hook) ---
  useEffect(() => {
    const match = document.cookie.match(new RegExp("(^| )locale=([^;]+)"));
    if (match) setLocaleState(match[2]);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;
    setLocaleState(newLocale);
    window.location.reload(); 
  };
  // -----------------------------------------------------------------------

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "es", label: "Español", flag: "🇪🇸" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "ja", label: "日本語", flag: "🇯🇵" },
    { code: "pt", label: "Português", flag: "🇧🇷" },
    { code: "hi", label: "हिंदी", flag: "🇮🇳" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 font-sans">
      {/* The Popup Menu (Only visible when open) */}
      {isOpen && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-xl p-1 mb-2 min-w-[140px] animate-in slide-in-from-bottom-2 fade-in duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                handleLocaleChange(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors
                ${locale === lang.code 
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"}
              `}
            >
              <span className="text-lg leading-none">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* The Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95
          ${isOpen 
            ? "bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white" 
            : "bg-blue-600 text-white hover:bg-blue-700"}
        `}
        aria-label="Change Language"
      >
        {isOpen ? (
          // Close Icon (X)
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        ) : (
          // Globe Icon
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
        )}
      </button>
    </div>
  );
}