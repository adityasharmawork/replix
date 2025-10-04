"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, Fragment } from "react";
import { ArrowLeft, Star, CheckCircle, Sparkles } from "lucide-react";

// Define the types for our review options
const feelings = [
  { label: "Mind-Bending", icon: "🤯" },
  { label: "Challenging", icon: "🤔" },
  { label: "Insightful", icon: "💡" },
  { label: "Smooth", icon: "😊" },
];

interface StardustReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  // We can add a function to handle the submission of the review later
  // onReviewSubmit: (review: any) => void;
}

export function StardustReviewModal({ isOpen, onClose }: StardustReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [step, setStep] = useState<'review' | 'submitted'>('review');

  const handleClose = () => {
    // Reset state when closing, so it's fresh next time
    setTimeout(() => {
      setRating(0);
      setHoverRating(0);
      setSelectedFeeling(null);
      setComment("");
      setStep('review');
    }, 300); // Delay to allow exit animation
    onClose();
  };
  
  const handleSubmit = () => {
    console.log({ rating, feeling: selectedFeeling, comment });
    // Here you would typically call a mutation to save the feedback
    // onReviewSubmit({ rating, feeling: selectedFeeling, comment });
    setStep('submitted');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm mt-64"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl bg-[#1e1e2e] p-6 text-center shadow-2xl ring-1 ring-gray-700/50"
          >
            {step === 'review' ? (
              <>
                <div className="flex flex-col items-center">
                    <Sparkles className="w-8 h-8 text-yellow-300 mb-2"/>
                    <h2 className="text-2xl font-bold text-gray-100">How was the journey?</h2>
                    <p className="text-gray-400 text-sm mt-1">Your feedback helps shape the cosmos.</p>
                </div>
                
                {/* 1. Feeling selection */}
                <div className="my-6">
                    <p className="text-sm font-medium text-gray-300 mb-3">This problem felt...</p>
                    <div className="flex justify-center gap-3">
                        {feelings.map(({ label, icon }) => (
                            <button key={label} onClick={() => setSelectedFeeling(label)}
                                className={`flex flex-col items-center gap-2 p-3 rounded-lg w-20 transition-all duration-200
                                ${selectedFeeling === label ? 'bg-indigo-600 ring-2 ring-indigo-400' : 'bg-gray-700/50 hover:bg-gray-700'}`}>
                                <span className="text-2xl">{icon}</span>
                                <span className="text-xs text-gray-300">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Star rating */}
                <div className="mb-6">
                    <p className="text-sm font-medium text-gray-300 mb-3">Rate this problem</p>
                    <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <Star key={index}
                                className={`w-8 h-8 cursor-pointer transition-all duration-150
                                ${ (hoverRating || rating) >= index ? "text-yellow-400" : "text-gray-600 hover:text-yellow-400/50" }`}
                                onMouseEnter={() => setHoverRating(index)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(index)}
                            />
                        ))}
                    </div>
                </div>
                
                {/* 3. Buttons */}
                <div className="flex flex-col gap-3">
                     <button onClick={handleSubmit} disabled={!rating && !selectedFeeling}
                        className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors
                        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-600 disabled:cursor-not-allowed">
                        Submit Feedback
                    </button>
                     <button onClick={handleClose}
                        className="w-full rounded-lg bg-transparent px-5 py-2 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-700/50">
                        Back to Code
                    </button>
                </div>
              </>
            ) : (
                // Thank you state
                <div className="flex flex-col items-center gap-4 py-8">
                    <CheckCircle className="w-16 h-16 text-green-400"/>
                    <h2 className="text-2xl font-bold text-gray-100">Feedback Received!</h2>
                    <p className="text-gray-400">Thank you for helping us improve.</p>
                    <button onClick={handleClose}
                        className="mt-4 inline-flex items-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white 
                        transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                         Close
                    </button>
                </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}