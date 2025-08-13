"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TerminalSquare } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import LoginButton from "@/components/LoginButton";

// A Set is used for efficient, case-insensitive lookups.
const VALID_ROOMS = new Set([
  '100a', '200b', '300c', '400d', '500e', 
  '600f', '700g', '800h', '900i', '1000j'
]);

export default function MindMazeLandingPage() {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedCode = roomCode.trim().toLowerCase();

    if (VALID_ROOMS.has(formattedCode)) {
      setError('');
      router.push(`/events/mindmaze/${formattedCode}`);
    } else {
      setError('Invalid room code. Please check the code and try again.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center overflow-hidden bg-background p-4 bg-grid-pattern">
      {/* The main panel uses your custom 'frost-panel' utility class and animations */}
      <div className="w-full max-w-lg animate-fade-in rounded-2xl p-8 frost-panel">
        <div className="text-center">
          {/* Using your custom fonts and text-glow utility for the heading */}
          <h1 className="text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-primary-50 to-primary-400 text-glow">
            MindMaze
          </h1>
          <p className="mt-2 text-lg leading-8 text-primary-300">
            The CP Arena
          </p>
        </div>

        <SignedIn>
            <form 
          onSubmit={handleJoinRoom} 
          className="mt-10 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div>
            <label htmlFor="room-code" className="block text-sm font-medium leading-6 text-primary-200">
              Enter Room Code
            </label>
            <div className="mt-2">
              {/* The input uses your 'terminal-text' and 'glassmorphism-dark' classes */}
              <input
                id="room-code"
                name="room-code"
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="e.g., 200B"
                required
                className="block w-full rounded-lg border-0 p-3.5 terminal-text glassmorphism-dark focus:ring-2 focus:ring-inset focus:ring-white/50"
              />
            </div>
          </div>
          
          {error && (
            <p className="mt-4 text-center text-sm font-medium text-red-400">
              {error}
            </p>
          )}

          <div className="mt-8">
            {/* The button uses your custom palette and 'hover-glow' utility */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary-700 bg-primary-900 px-3.5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-800 hover-glow"
            >
              Join Arena
              <TerminalSquare className="h-4 w-4" />
            </button>
          </div>
        </form>
        </SignedIn>
        
        <SignedOut>
          <div className="ml-44 mt-8">
            <LoginButton />
          </div>
        </SignedOut>

      </div>
    </main>
  );
}