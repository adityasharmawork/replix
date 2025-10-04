"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Star, MessageSquare, CheckCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

// New tags focused on platform experience
const experienceTags = ["Amazing", "Smooth", "Intuitive", "Feature Suggestion", "Report Bug"];

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [step, setStep] = useState<'review' | 'submitted'>('review');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useUser();

  // const email = user?.primaryEmailAddress?.emailAddress;
  // const name = user?.fullName;
  // console.log(email);
  // console.log(name);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleClose = () => {
    // Reset state for next time
    setTimeout(() => {
      setRating(0);
      setHoverRating(0);
      setSelectedTags([]);
      setComment("");
      setStep('review');
      setIsSubmitting(false);
    }, 300);
    onClose();
  };
  
  const handleSubmit = async () => {
    // console.log(email);
    // console.log(name);
    
    setIsSubmitting(true);
    const reviewData = {
        email: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        rating,
        tags: selectedTags,
        comment,
        submittedAt: new Date().toISOString(),
    };

    try {
        const response = await fetch('https://replix-mindmaze-backend.onrender.com/api/reviews/save', {
        // const response = await fetch('http://localhost:8080/api/reviews/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData),
        });

        if (!response.ok) {
            // Handle HTTP errors
            throw new Error(`Server responded with status ${response.status}`);
        }
        
        console.log("Feedback submitted successfully:", await response.json());
        setStep('submitted');

    } catch (error) {
        console.error("Failed to submit feedback:", error);
        toast.error("Could not submit feedback. Please try again later.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          // ✅ The `backdrop-blur-sm` class correctly blurs the background.
          // ✅ REMOVED `mt-64` to ensure the backdrop covers the full screen.
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        // className="fixed inset-0 z-50 flex justify-center overflow-y-auto bg-black/60 pt-20 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            // className="relative w-full max-w-sm rounded-xl bg-[#1c1c1c] p-6 text-center shadow-lg border border-gray-700/50"
            className="relative mb-auto w-full max-w-sm rounded-xl bg-[#1c1c1c] p-6 text-center shadow-lg border border-gray-700/50"
          >
            {step === 'review' ? (
              <>
                <div className="flex flex-col items-center mb-5">
                    <MessageSquare className="w-7 h-7 text-gray-400 mb-2"/>
                    <h2 className="text-xl font-semibold text-gray-100">How was your Experience?</h2>
                </div>
                
                {/* Star rating */}
                <div className="mb-6">
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <Star key={index}
                                className={`w-9 h-9 cursor-pointer transition-all duration-150
                                ${ (hoverRating || rating) >= index ? "text-yellow-400 fill-yellow-400" : "text-gray-600 hover:text-gray-500" }`}
                                onMouseEnter={() => setHoverRating(index)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setRating(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Experience Tags */}
                <div className="mb-6">
                    <div className="flex flex-wrap justify-center gap-2">
                        {experienceTags.map((tag) => (
                           <button key={tag} onClick={() => handleTagClick(tag)}
                                className={`px-3 py-1.5 text-xs rounded-full transition-colors duration-200
                                ${selectedTags.includes(tag) ? 'bg-indigo-600 text-white' : 'bg-gray-700/60 text-gray-300 hover:bg-gray-700'}`}>
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
                
                 <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Any Feedback or Suggestion? (optional)"
                    className="w-full h-20 p-2 mb-4 text-sm bg-gray-800/50 rounded-md border border-gray-700/80
                    focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-200 resize-none"
                />

                <div className="flex flex-col gap-3">
                     {/* ✅ CHANGED: Logic now only checks for a rating */}
                     <button onClick={handleSubmit} disabled={isSubmitting || rating === 0}
                        className="w-full flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white
                        transition-colors hover:bg-indigo-700 focus:outline-none disabled:bg-gray-600 disabled:cursor-not-allowed">
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin"/> : "Send Feedback"}
                    </button>
                     <button onClick={handleClose}
                        className="w-full text-sm text-gray-500 hover:text-gray-400">
                        Missed something? Back to Coding
                    </button>
                </div>
              </>
            ) : (
                // Thank you state
                <div className="flex flex-col items-center gap-4 py-8">
                    <CheckCircle className="w-16 h-16 text-green-400"/>
                    <h2 className="text-xl font-bold text-gray-100">Thank you!</h2>
                    <p className="text-gray-400 text-sm">Your feedback has been sent.</p>
                    <button onClick={handleClose}
                        className="mt-4 rounded-md bg-gray-700/60 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700">
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