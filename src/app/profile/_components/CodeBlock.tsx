"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock = ({ code, language }: CodeBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const lines = code.split("\n");
  const displayCode = isExpanded ? code : lines.slice(0, 6).join("\n");

  return (
    <div className="relative rounded-lg overflow-hidden group">
      {/* Header bar for language */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-dark-400/90 backdrop-blur-sm z-10 flex items-center px-3">
        <span className="text-xs font-mono text-gray-400 tracking-wide uppercase">
          {language.toLowerCase()}
        </span>
      </div>
      
      {/* Code display */}
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={atomOneDark}
        customStyle={{
          padding: "2rem 1rem 1rem",
          borderRadius: "0.5rem",
          background: "rgba(10, 10, 15, 0.6)",
          margin: 0,
          border: "1px solid rgba(75, 85, 99, 0.1)",
        }}
        wrapLines={true}
        showLineNumbers={true}
      >
        {displayCode}
      </SyntaxHighlighter>

      {/* Show more/less button */}
      {lines.length > 6 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute bottom-2 right-2 px-3 py-1.5 bg-primary-500/10 text-primary-400 rounded text-xs flex items-center 
          gap-1.5 hover:bg-primary-500/20 transition-all duration-300 border border-primary-500/20 group-hover:border-primary-500/40"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              Show More <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default CodeBlock;