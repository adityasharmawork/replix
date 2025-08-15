// import { Eye } from "lucide-react";

// const VisionSection = () => {
//   return (
//     <div className="relative frost-panel p-8 rounded-2xl overflow-hidden hover-glow transition-all duration-300 h-full">
//       <div className="flex flex-col items-center text-center">
//         {/* Icon */}
//         <div className="w-16 h-16 rounded-lg bg-zinc-900 flex items-center justify-center mb-6 ring-1 ring-zinc-800">
//           <Eye className="w-8 h-8 text-white" />
//         </div>
        
//         {/* Content */}
//         <h2 className="text-2xl font-bold text-white mb-4">
//           Our Vision
//         </h2>
//         <p className="text-lg text-gray-300 max-w-md leading-relaxed">
//           "To redefine the development landscape, making it so seamless that the only limit is the developer's imagination."
//         </p>
//       </div>
//     </div>
//   );
// };

// export default VisionSection;






// app/_components/VisionSection.tsx
// import { Eye } from "lucide-react";

// export default function VisionSection() {
//   return (
//     <section className="max-w-5xl mx-auto my-40 px-6 text-center animate-fade-in">
//       <div className="relative">
//         <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-3xl opacity-40 rounded-3xl" />
//         <div className="relative frost-panel p-10 rounded-3xl">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-zinc-900 ring-1 ring-zinc-800 mb-6">
//             <Eye className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
//           <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             "To redefine the development landscape, making it so seamless that the only limit is the developer&apos;s imagination."
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }




import { Eye } from "lucide-react";

export default function VisionSection() {
  return (
    <section className="max-w-5xl mx-auto my-40 px-6 text-center animate-fade-in">
      <div className="relative group transition-all duration-300 hover:scale-101 hover:-translate-y-1">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-3xl opacity-40 rounded-3xl transition-opacity duration-300 group-hover:opacity-60" />
        <div className="relative frost-panel p-10 rounded-3xl shadow-lg transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(147,197,253,0.25)]">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-zinc-900 ring-1 ring-zinc-800 mb-6">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            "To redefine the development landscape, making it so seamless that the only limit is the developer&apos;s imagination."
          </p>
        </div>
      </div>
    </section>
  );
}





// app/_components/VisionSection.tsx
// import { Eye } from "lucide-react";

// export default function VisionSection() {
//   return (
//     <section className="max-w-5xl mx-auto my-40 px-6 text-center animate-fade-in">
//       <div className="relative group">
//         {/* Subtle background lighting */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
//                         w-72 h-72 bg-white/5 rounded-full blur-[100px] opacity-20" />

//         <div className="relative frost-panel p-10 rounded-3xl transition-all duration-300 group-hover:shadow-glow">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl 
//                           bg-zinc-900 ring-1 ring-zinc-800 mb-6">
//             <Eye className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
//           <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             To redefine the development landscape, making it so seamless that the only limit is the developer&apos;s imagination.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }




// app/_components/VisionSection.tsx
// import { Eye } from "lucide-react";

// export default function VisionSection() {
//   return (
//     <section className="max-w-5xl mx-auto my-40 px-6 text-center animate-fade-in">
//       <div className="relative group">
//         {/* Softer gradient background */}
//         <div className="absolute -inset-1 bg-gradient-to-r 
//                         from-blue-400/15 via-purple-400/15 to-pink-400/15 
//                         blur-2xl opacity-20 rounded-3xl" />

//         <div className="relative frost-panel bg-zinc-900/60 p-10 rounded-3xl 
//                         transition-all duration-300 group-hover:shadow-glow">
//           <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl 
//                           bg-zinc-900 ring-1 ring-zinc-800 mb-6">
//             <Eye className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
//           <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             To redefine the development landscape, making it so seamless that the only limit is the developer&apos;s imagination.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
