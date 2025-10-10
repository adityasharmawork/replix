"use client";

import { useParams } from 'next/navigation';
import EditorPanel from "@/app/editor/_components/EditorPanel";
import Header from "@/app/editor/_components/Header";
import PerformancePanel from "@/app/editor/_components/PerformancePanel";
import QuestionPanel from "../../_components/QuestionPanel";
import { Loader2, MonitorPlay } from 'lucide-react'; // Make sure Loader2 is imported
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { useState, useRef } from 'react'; 
import { useFullscreen } from '../../../events/gdgoc-aec/hooks/useFullscreen'; 
import { Toaster } from 'react-hot-toast';
import Watermark from '../../../events/gdgoc-aec/_components/Watermark';
import LoginButton from '@/components/LoginButton';
import PracticeOutputPanel from '../../_components/PracticeOutputPanel';
import PracticeInputPanel from '../../_components/PracticeInputPanel';

export default function RoomPage() {
  const stdinRef = useRef<HTMLTextAreaElement>(null);
  
  const params = useParams();
  // Ensure slug is treated as a string or undefined, preventing an object type
  const slug = typeof params?.slug === 'string' ? params.slug : undefined;

  const [isQuestionCollapsed, setIsQuestionCollapsed] = useState(false);

  const { elementRef, enterFullscreen, isFullscreen } = useFullscreen();
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || 'anonymous';

  // FIX: If the slug is not available yet, show a loading state.
  // This prevents the rest of the component from rendering with invalid props.
  if (!slug) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f23]">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <>
      <SignedIn>
        <div ref={elementRef} className="min-h-screen flex flex-col bg-[#0f0f23]">
          <Toaster position="top-center" /* ... */ />

          {isFullscreen ? (
            <>
              <Watermark text={`${userEmail} - ${new Date().toLocaleString()}`} />
              <div className="w-full mx-auto px-2 py-2 flex-1 flex flex-col">
                <Header stdinRef={stdinRef} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 min-h-0">
                  
                  <div className={`
                    grid gap-3 md:max-h-[calc(100vh-110px)] min-h-0
                    ${isQuestionCollapsed ? 'grid-rows-[auto_1fr]' : 'grid-rows-[3fr_2fr]'}
                  `}>
                    
                    <div className="min-h-0">
                      <QuestionPanel
                        slug={slug}
                        isCollapsed={isQuestionCollapsed}
                        onToggleCollapse={() => setIsQuestionCollapsed(prev => !prev)}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-h-0">
                      <PracticeOutputPanel />
                      <PracticeInputPanel stdinRef={stdinRef} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:max-h-[calc(100vh-100px)] min-h-[50vh]">
                    <EditorPanel />
                    <div className="p-1">
                      <PerformancePanel />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-screen flex flex-col items-center justify-center text-center p-4">
              <MonitorPlay className="w-16 h-16 text-yellow-400 mb-4" />
              <h1 className="text-3xl font-bold mb-2">Please Enter Fullscreen Mode</h1>
              <p className="text-gray-400 max-w-lg mb-6">
                Our platform ensures participants solve the question in full screen mode to get the best results of your efforts!
              </p>
              <div className="bg-red-900/50 border border-red-700 text-red-300 rounded-md p-3 mb-6 text-sm">
                <strong>Warning:</strong> We highly encourage participants to attend and solve the question in full screen mode only.
              </div>
              <button
                onClick={enterFullscreen}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Re-enter Fullscreen
              </button>
            </div>
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f23]">
          <div className="text-center p-8 bg-[#181825] rounded-xl ring-1 ring-gray-800/50">
            <h1 className="text-2xl font-bold text-white mb-4">Please Sign In</h1>
            <p className="text-gray-400 mb-6">You need to be logged in to access this event.</p>
            <div className='ml-32 mt-8'>
              <LoginButton />
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}