"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import SnippetsPageSkeleton from "./_components/SnippetsPageSkeleton";
import NavigationHeader from "@/components/NavigationHeader";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Code, Grid, Layers, Search, Tag, X } from "lucide-react";
import SnippetCard from "./_components/SnippetCard";

function SnippetsPage() {
    const snippets = useQuery(api.snippets.getSnippets);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [view, setView] = useState<"grid" | "list">("grid");

    // Loading state
    if(snippets === undefined) {
        return (
            <div className="min-h-screen">
                <NavigationHeader />
                <SnippetsPageSkeleton />
            </div>
        )
    }

    const languages = [...new Set(snippets.map(snippet => snippet.language))];
    const popularLanguages = languages.slice(0, 5);

    const filteredSnippets = snippets.filter(snippet => {
        const matchesSearch = snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            snippet.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
            snippet.userName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLanguage = !selectedLanguage || snippet.language === selectedLanguage;
        
        return matchesSearch && matchesLanguage;
    });

    return (
        <div className="min-h-screen bg-[#0a0a0f]">
            {/* Ambient background gradients */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[5%] -left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[5%] -right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-600/5 rounded-full blur-[100px]" />
            </div>

            <NavigationHeader />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 backdrop-blur-sm
                        text-sm text-indigo-300 border border-indigo-500/20 mb-6"
                    >
                        <BookOpen className="w-4 h-4" />
                        Community Codebase
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 text-transparent bg-clip-text mb-6"
                    >
                        Discover & Share Code Snippets
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto"
                    >
                        Explore a curated collection of code snippets from developers around the world. Learn, fork, and contribute to the community.
                    </motion.p>
                </div>

                {/* Filters Section */}
                <div className="relative max-w-5xl mx-auto mb-12 space-y-6">
                    {/* Search */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 w-5 h-5 text-indigo-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search snippets by title, language, or author..."
                                className="w-full pl-12 pr-4 py-4 bg-zinc-900/80 backdrop-blur-sm text-white
                                rounded-xl border border-zinc-800/80 hover:border-indigo-500/30 focus:border-indigo-500/50 transition-all duration-200
                                placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>
                    </div>

                    {/* Filters Bar */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/80 backdrop-blur-sm rounded-lg border border-zinc-800/50">
                            <Tag className="w-4 h-4 text-indigo-400" />
                            <span className="text-sm text-gray-300">Languages:</span>
                        </div>

                        {popularLanguages.map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setSelectedLanguage(lang === selectedLanguage ? null : lang)}
                                className={`
                                group relative px-3 py-1.5 rounded-lg transition-all duration-200 overflow-hidden
                                ${
                                selectedLanguage === lang
                                    ? "text-white border border-indigo-500/50 bg-indigo-500/10"
                                    : "text-gray-300 hover:text-white bg-zinc-900/80 backdrop-blur-sm hover:bg-zinc-800/80 border border-zinc-800/50 hover:border-indigo-500/30"
                                }
                            `}
                            >
                                {selectedLanguage === lang && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 animate-pulse" />
                                )}
                                <div className="relative flex items-center gap-2 z-10">
                                    <img src={`/${lang}.png`} alt={lang} className="w-4 h-4 object-contain" />
                                    <span className="text-sm">{lang}</span>
                                </div>
                            </button>
                        ))}

                        {selectedLanguage && (
                            <button
                                onClick={() => setSelectedLanguage(null)}
                                className="flex items-center gap-1 px-2 py-1.5 text-xs text-indigo-300 hover:text-indigo-200 transition-colors"
                            >
                                <X className="w-3 h-3" />
                                Clear
                            </button>
                        )}

                        <div className="ml-auto flex items-center gap-3 mt-3 sm:mt-0">
                            <span className="text-sm text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20">
                                {filteredSnippets.length} snippets found
                            </span>

                            {/* View Toggle */}
                            <div className="flex items-center gap-1 p-1 bg-zinc-900/80 backdrop-blur-sm rounded-lg border border-zinc-800/50">
                                <button
                                    onClick={() => setView("grid")}
                                    className={`p-2 rounded-md transition-all ${
                                        view === "grid"
                                            ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/20"
                                            : "text-gray-400 hover:text-gray-200 hover:bg-zinc-800/80"
                                    }`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setView("list")}
                                    className={`p-2 rounded-md transition-all ${
                                        view === "list"
                                            ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/20"
                                            : "text-gray-400 hover:text-gray-200 hover:bg-zinc-800/80"
                                    }`}
                                >
                                    <Layers className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Snippets Grid */}
                <motion.div
                    className={`grid gap-6 ${
                        view === "grid"
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                            : "grid-cols-1 max-w-3xl mx-auto"
                    }`}
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredSnippets.map((snippet) => (
                            <SnippetCard key={snippet._id} snippet={snippet} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty state */}
                {filteredSnippets.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative max-w-md mx-auto mt-20 p-8 rounded-2xl overflow-hidden bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-2xl" />
                        <div className="relative z-10 text-center">
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl 
                                bg-indigo-500/10 border border-indigo-500/20 mb-6"
                            >
                                <Code className="w-8 h-8 text-indigo-400" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-3">No snippets found</h3>
                            <p className="text-gray-400 mb-6">
                                {searchQuery || selectedLanguage
                                    ? "Try adjusting your search query or filters"
                                    : "Be the first to share a code snippet with the community"}
                            </p>

                            {(searchQuery || selectedLanguage) && (
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedLanguage(null);
                                    }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-300 hover:text-white rounded-lg 
                                        transition-colors border border-indigo-500/20 hover:border-indigo-500/40"
                                >
                                    <X className="w-4 h-4" />
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default SnippetsPage;
