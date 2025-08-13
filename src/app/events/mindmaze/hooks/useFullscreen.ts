// "use client";

// import { useCallback, useEffect, useRef } from 'react';

// export function useFullscreen() {
//   // A ref to attach to the element you want to make fullscreen
//   const elementRef = useRef<HTMLDivElement>(null);

//   const enterFullscreen = useCallback(() => {
//     const el = elementRef.current;
//     if (el) {
//       // Check if fullscreen is supported and not already active
//       if (el.requestFullscreen && !document.fullscreenElement) {
//         el.requestFullscreen().catch(err => {
//           console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
//         });
//       }
//     }
//   }, []);

//   const exitFullscreen = useCallback(() => {
//     // Check if the document is currently in fullscreen mode
//     if (document.exitFullscreen && document.fullscreenElement) {
//       document.exitFullscreen();
//     }
//   }, []);
  
//   // This useEffect handles cleanup. If the component unmounts while in
//   // fullscreen, it will automatically exit fullscreen.
//   useEffect(() => {
//     return () => {
//       exitFullscreen();
//     };
//   }, [exitFullscreen]);

//   return { elementRef, enterFullscreen, exitFullscreen };
// }











"use client";

import { useCallback, useEffect, useRef, useState } from 'react';

export function useFullscreen() {
  const elementRef = useRef<HTMLDivElement>(null);
  
  // ✅ ADDED: State to track if fullscreen is active
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = useCallback(() => {
    const el = elementRef.current;
    if (el && el.requestFullscreen) {
      el.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
    }
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen && document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, []);

  // ✅ ADDED: Effect to listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      // document.fullscreenElement is non-null when in fullscreen
      setIsFullscreen(!!document.fullscreenElement);
    };

    // Add event listener
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Cleanup: remove event listener when component unmounts
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      exitFullscreen(); // Ensure we exit fullscreen on unmount
    };
  }, [exitFullscreen]);

  // ✅ UPDATED: Return the state and the ref
  return { elementRef, enterFullscreen, isFullscreen };
}