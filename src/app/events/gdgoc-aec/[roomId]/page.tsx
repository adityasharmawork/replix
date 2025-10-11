// "use client";

// import { useRef } from "react";
// import EditorPanel from "@/app/editor/_components/EditorPanel";
// import Header from "@/app/editor/_components/Header";
// import OutputPanel from "@/app/editor/_components/OutputPanel";
// import InputPanel from "@/app/editor/_components/InputPanel";
// import PerformancePanel from "@/app/editor/_components/PerformancePanel";
// import QuestionPanel from "@/app/editor/_components/QuestionPanel";

// export default function Home() {
//   const stdinRef = useRef<HTMLTextAreaElement>(null);
//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="w-full mx-auto px-2 py-2 flex-1 flex flex-col">
//         <Header stdinRef={stdinRef}/>
          
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
//           {/* <div className="flex flex-col md:max-h-[calc(100vh-200px)] xl:min-w-[64vw] md:h-full "> */}
//           <div className="flex flex-col md:max-h-[calc(100vh-110px)] xl:min-w-[64vw] ">
//             <QuestionPanel />
//             <EditorPanel />
//             {/* <div className="grid grid-cols-1 gap-1">
//               <PerformancePanel />
//             </div> */}
//           </div>
//           <div className="flex flex-col md:max-h-[calc(100vh-100px)] md:h-full min-h-[50vh]">
//             <OutputPanel />
//             <InputPanel stdinRef={stdinRef} />
//             <div className="max-h-6 pl-36 ml-36 p-1 mb-7">
//               <PerformancePanel />
//             </div>
//             {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xl:pl-72">
//               <PerformancePanel />
//               <AIAssistantPanel />
//             </div> */}
//             {/* <textarea id="stdin" className="text-white h-[60vh] bg-slate-800" ref={stdinRef} placeholder="Enter input here" /> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }














































"use client";

import { useParams } from 'next/navigation';
// import { useRef } from "react";
import EditorPanel from "@/app/editor/_components/EditorPanel";
import Header from "@/app/editor/_components/Header";
import OutputPanel from "@/app/editor/_components/OutputPanel";
import InputPanel from "@/app/editor/_components/InputPanel";
import PerformancePanel from "@/app/editor/_components/PerformancePanel";
import QuestionPanel from "@/app/events/mindmaze/_components/QuestionPanel";
import { useRoom } from '../hooks/useRoom';
import { Loader2, MonitorPlay } from 'lucide-react';
import EventHeader from '../_components/EventHeader';
import ExpectedOutputPanel from '../_components/ExpectedOutput';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import EventOutputPanel from '../_components/EventOutputPanel';

import { useEffect } from 'react'; 
import { useFullscreen } from '../hooks/useFullscreen'; 
import { Toaster } from 'react-hot-toast';
import Watermark from '../_components/Watermark';
import LoginButton from '@/components/LoginButton';
import NewEventOutputPanel from '../_components/NewEventOutputPanel';
import NewExpectedOutputPanel from '../_components/NewExpectedOutputPanel';

export default function RoomPage() {
  const params = useParams();
  const roomId = params.roomId as string;

  const status:any = "Upcoming";

//   const stdinRef = useRef<HTMLTextAreaElement>(null);
  
  const { room, loading, error } = useRoom(roomId);

  const { elementRef, enterFullscreen, isFullscreen } = useFullscreen();

    // const { user, isSignedIn } = useUser();
    // const email = user?.primaryEmailAddress?.emailAddress;
    // console.log(email);

    const { user } = useUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || 'anonymous';


  useEffect(() => {
    // This condition ensures fullscreen is entered ONLY when the main UI is ready
    const isReadyForCoding = !loading && !error && room && status === "Active";

    if (isReadyForCoding) {
      // You can call this directly, or prompt the user first.
      // For preventing cheating, calling it directly is what you want.
      enterFullscreen();
    }
  }, [loading, error, room, status, enterFullscreen]);


  if (status == "Upcoming") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f23]">
        <div className="flex items-center gap-3 text-gray-400">
          <span>Event hasn't started yet...!</span>
        </div>
      </div>
    );
  }

  if (status == "Ended") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f23]">
        <div className="flex items-center gap-3 text-gray-400">
          <span>Event has ended...!</span>
        </div>
      </div>
    );
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f23]">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading room {roomId}...</span>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f23]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-2">Room Not Found</h1>
          <p className="text-gray-400">Room {roomId} does not exist or failed to load.</p>
          {error && <p className="text-sm text-gray-500 mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <>
    <SignedIn>

      <div ref={elementRef} className="min-h-screen flex flex-col bg-[#0f0f23]">

        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#333',
              color: '#fff',
              zIndex: 9999, // Ensure it's on top of other content within this container
            },
          }}
        />

        { isFullscreen ? (
        //   <>
        //   <Watermark text={`${userEmail} - ${new Date().toLocaleString()}`} />
        //     <div className="w-full mx-auto px-2 py-2 flex-1 flex flex-col">
        //   {/* <Header stdinRef={stdinRef} /> */}
        //   <EventHeader testInput={room.testInput}/>
            
        //   <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
        //     <div className="flex flex-col md:max-h-[calc(100vh-110px)] xl:min-w-[64vw]">
        //       <QuestionPanel 
        //         roomId={roomId}
        //         question={room.title}
        //         difficulty={room.difficulty}
        //         tags={room.tags}
        //         description={room.description}
        //         inputFormat={room.inputFormat}
        //         outputFormat={room.outputFormat}
        //         examples={room.examples}
        //         timeLimit={room.timeLimit}
        //         memoryLimit={room.memoryLimit}
        //       />
        //       <EditorPanel/>
        //     </div>
        //     <div className="flex flex-col md:max-h-[calc(100vh-100px)] md:h-full min-h-[50vh]">
        //       <EventOutputPanel expectedOutput={room.expectedOutput}/>
        //       <ExpectedOutputPanel expectedOutput={room.expectedOutput}/>
        //       {/* <InputPanel stdinRef={stdinRef} /> */}
        //       <div className="max-h-6 pl-36 ml-36 p-1 mb-7">
        //         <PerformancePanel />
        //       </div>
        //     </div>
        //   </div>
        // </div>
        // </>

        <>
          <Watermark text={`${userEmail} - ${new Date().toLocaleString()}`} />
            <div className="w-full mx-auto px-2 py-2 flex-1 flex flex-col">
          {/* <Header stdinRef={stdinRef} /> */}
          <EventHeader testInput={room.testInput}/>
            
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1">
            <div className="flex flex-col md:max-h-[calc(100vh-110px)] xl:min-w-[32vw]">
              <QuestionPanel 
                roomId={roomId}
                question={room.title}
                difficulty={room.difficulty}
                tags={room.tags}
                description={room.description}
                inputFormat={room.inputFormat}
                outputFormat={room.outputFormat}
                examples={room.examples}
                timeLimit={room.timeLimit}
                memoryLimit={room.memoryLimit}
              />
              {/* <EditorPanel/> */}
              {/* <div className="grid md:grid-cols-2 gap-3 flex-1 w-full xl:min-w-[32vw] min-h-0">
                <NewEventOutputPanel expectedOutput={room.expectedOutput}/>
                <NewExpectedOutputPanel expectedOutput={room.expectedOutput}/>
              </div> */}

              {/* <div className="grid md:grid-cols-2 gap-3 flex-1 w-full xl:min-w-[32vw]">
                <NewEventOutputPanel expectedOutput={room.expectedOutput} />
                <NewExpectedOutputPanel expectedOutput={room.expectedOutput} />
              </div> */}

              {/* <div className="grid md:grid-cols-1 gap-3 flex-1 w-full xl:min-w-[32vw] min-h-0">
                <div className="flex flex-col min-h-0 overflow-y-auto rounded-lg bg-[#181825] p-2">
                  <NewEventOutputPanel expectedOutput={room.expectedOutput} />
                </div> */}
                {/* <div className="flex flex-col min-h-0 overflow-y-auto rounded-lg bg-[#181825] p-2">
                  <NewExpectedOutputPanel expectedOutput={room.expectedOutput} />
                </div> */}
              {/* </div> */}

              <div className="grid md:grid-cols-2 gap-3 flex-1 w-full xl:min-w-[32vw] min-h-0">
                <div className="flex flex-col min-h-0 overflow-y-auto rounded-lg bg-[#181825] p-2">
                  <NewEventOutputPanel expectedOutput={room.expectedOutput} />
                </div>
                <div className="flex flex-col min-h-0 overflow-y-auto rounded-lg bg-[#181825] p-2">
                  <NewExpectedOutputPanel expectedOutput={room.expectedOutput} />
                </div>
              </div>


              {/* <div className="max-h-6 pl-36 ml-36 p-1 mb-7"> */}
                {/* <PerformancePanel /> */}
              {/* </div> */}

            </div>
            <div className="flex flex-col md:max-h-[calc(100vh-100px)] md:h-full min-h-[50vh]">
              <EditorPanel/>
              {/* <EventOutputPanel expectedOutput={room.expectedOutput}/>
              <ExpectedOutputPanel expectedOutput={room.expectedOutput}/> */}
              {/* <InputPanel stdinRef={stdinRef} /> */}
              <div className="max-h-6  p-1 mb-7">
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
              To participate in the event, you must remain in fullscreen mode. This is required to ensure a fair environment for all contestants.
            </p>
            <div className="bg-red-900/50 border border-red-700 text-red-300 rounded-md p-3 mb-6 text-sm">
              <strong>Warning:</strong> Frequently exiting fullscreen may result in disqualification from the event.
            </div>
            <button
              onClick={enterFullscreen}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Re-enter Fullscreen
            </button>
          </div>
        ) }
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
