"use client";

import { useEffect, useState, useCallback } from 'react';
import TypewriterText from './TypewriterText';

interface CodeShowcaseProps {
  language?: string;
  theme?: 'dark' | 'light';
  className?: string;
}

const CodeShowcase = ({ 
  language = 'javascript', 
  theme = 'dark',
  className = '' 
}: CodeShowcaseProps) => {
  // Sample code snippets by language
  const codeSnippets: Record<string, string> = {
    javascript: 
`
console.log("Welcome to Replix - Code in any language, anytime!");

// Example
const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map(n => n * n);
console.log('Original numbers:', numbers);
console.log('Squared numbers:', squares);
`,

    python:
`
print("Welcome to Replix - Code in Python, or any language you love!")

# Example
numbers = [1, 2, 3, 4, 5]
squares = [n**2 for n in numbers]
print("Original numbers:", numbers)
print("Squared numbers:", squares)

`,

    rust:
`
fn main() {
    println!("Welcome to Replix - Fuel your code with Rust and more!");

    let numbers = [1, 2, 3, 4, 5];
    let squares: Vec<i32> = numbers.iter().map(|&n| n * n).collect();

    println!("Original numbers: {:?}", numbers);
    println!("Squared numbers: {:?}", squares);
}

`
  };

  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [codeToShow, setCodeToShow] = useState(codeSnippets[language] || codeSnippets.javascript);
  // Using a key to force re-render of TypewriterText when language changes
  const [key, setKey] = useState(0);

  const handleLanguageChange = useCallback((lang: string) => {
    if (lang !== selectedLanguage) {
      setSelectedLanguage(lang);
      setKey(prevKey => prevKey + 1); // Increment key to force re-render
    }
  }, [selectedLanguage]);

  // Update code when language changes
  useEffect(() => {
    setCodeToShow(codeSnippets[selectedLanguage] || codeSnippets.javascript);
  }, [selectedLanguage]);

  return (
    <div className={`frost-panel overflow-hidden ${className}`}>
      {/* Header with language tabs */}
      <div className="flex items-center border-b border-white/10 bg-white/5">
        {Object.keys(codeSnippets).map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`px-4 py-2 text-xs font-medium capitalize transition-colors ${
              selectedLanguage === lang
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {lang}
          </button>
        ))}
        
        <div className="ml-auto flex items-center px-3 gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-600"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-600"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-600"></div>
        </div>
      </div>
      
      {/* Code block */}
      <div className="p-4 overflow-auto min-h-[300px] max-h-[400px]">
        <pre className="text-sm font-mono leading-relaxed">
          {/* Using key prop to force complete re-rendering when language changes */}
          <TypewriterText 
            key={key}
            text={codeToShow} 
            speed={15} 
            delay={300}
            className="text-white" 
          />
        </pre>
      </div>
      
      {/* Footer with line numbers and stats */}
      <div className="border-t border-white/10 px-4 py-2 text-xs text-gray-500 flex justify-between">
        <span>lines: {codeToShow.split('\n').length}</span>
        <span className="animate-pulse">quantum processing...</span>
      </div>
    </div>
  );
};

export default CodeShowcase; 