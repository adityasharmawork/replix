"use client";

import { useEffect, useState, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

const TypewriterText = ({ 
  text, 
  speed = 50, 
  delay = 0,
  className = "" 
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const textRef = useRef(text);

  // Update the ref when the text prop changes
  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    // Reset the component state
    setDisplayText('');
    setIsTyping(false);
    
    // Clear any existing interval
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    const timeoutId = setTimeout(() => {
      // Set typing state to true
      setIsTyping(true);
      let index = 0;
      
      // Create a new interval for typing
      intervalIdRef.current = setInterval(() => {
        if (index < textRef.current.length) {
          setDisplayText(prev => prev + textRef.current.charAt(index));
          index++;
        } else {
          // Typing complete, clean up
          setIsTyping(false);
          if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
          }
        }
      }, speed);
    }, delay);

    // Clean up on unmount or when dependencies change
    return () => {
      clearTimeout(timeoutId);
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, [delay, speed, text]); // Include text in dependencies to reset on text change

  return (
    <span className={className}>
      {displayText}
      {isTyping && <span className="inline-block w-[0.5em] h-[1.2em] bg-white/70 ml-0.5 animate-pulse" aria-hidden="true" />}
    </span>
  );
};

export default TypewriterText; 