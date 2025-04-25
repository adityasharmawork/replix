// import { useAuth } from "@clerk/nextjs"
// import { Id } from "../../convex/_generated/dataModel"
// import { useMutation, useQuery } from "convex/react";
// import { api } from "../../convex/_generated/api";
// import { Star } from "lucide-react";

// function StarButton({snippetId}: {snippetId: Id<"snippets">}) {
//     const { isSignedIn } = useAuth();
//     const isStarred = useQuery(api.snippets.isSnippetStarred, { snippetId });
//     const starCount = useQuery(api.snippets.getSnippetStarCount, { snippetId });
//     const star = useMutation(api.snippets.starSnippet);

//     const handleStar = async () => {
//         if(!isSignedIn) return;
//         await star({ snippetId });
//     }

//     return (
//         <button 
//             className={`group relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all duration-300
//             border overflow-hidden
//             ${isStarred 
//                 ? "bg-white/10 border-white/30 text-white hover:bg-white/15" 
//                 : "bg-zinc-800/40 border-zinc-700/30 text-gray-300 hover:bg-white/5 hover:border-white/20 hover:text-white"
//             }`}
//             onClick={handleStar}
//         >
//             {/* Background effect */}
//             <div className={`absolute inset-0 opacity-0 transition-opacity duration-300
//                 ${isStarred 
//                     ? "bg-white/5 group-hover:opacity-100" 
//                     : "bg-white/5 group-hover:opacity-100"
//                 }`}
//             />

//             {/* Star icon */}
//             <Star 
//                 className={`w-4 h-4 relative z-10 transition-all duration-300
//                 ${isStarred 
//                     ? "fill-white text-white" 
//                     : "fill-none group-hover:fill-white/80 text-gray-300 group-hover:text-white"
//                 }`}
//             />

//             {/* Star count */}
//             <span className={`text-xs font-medium relative z-10 transition-colors duration-300
//                 ${isStarred 
//                     ? "text-white" 
//                     : "text-gray-300 group-hover:text-white"
//                 }`}>
//                 {starCount}
//             </span>
//         </button>
//     )
// }

// export default StarButton



















import { useAuth } from "@clerk/nextjs"
import { Id } from "../../convex/_generated/dataModel"
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function StarButton({snippetId}: {snippetId: Id<"snippets">}) {
    const { isSignedIn, userId } = useAuth();
    const isStarred = useQuery(api.snippets.isSnippetStarred, { snippetId });
    // const isStarred = useQuery(api.snippets.isSnippetStarredByUser, { snippetId });
    const isStarredByUser = useQuery(api.snippets.isSnippetStarredByUser, { snippetId });
    const isSnippetInMyStarredList = useQuery(api.snippets.isSnippetInMyStarredList, { snippetId });
    const starCount = useQuery(api.snippets.getSnippetStarCount, { snippetId });
    const star = useMutation(api.snippets.starSnippet);

    

    
    // Add a local state to track stars during transitions
    const [isStarring, setIsStarring] = useState(false);
    
    // Debug current auth state
    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`StarButton: User ${userId} - isStarred: ${isStarred} - snippetId: ${snippetId}`);
        }
    }, [userId, isStarred, snippetId]);

    const handleStar = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isSignedIn) {
            toast.error("You must be signed in to star snippets");
            return;
        }
        
        try {
            setIsStarring(true);
            await star({ snippetId });
            
            // Visual feedback for the action
            // if (isStarred) {
            //     toast.success("Snippet unstarred");
            // } else {
            //     toast.success("Snippet starred");
            // }
        } catch (error) {
            console.error("Error starring snippet:", error);
            toast.error("Failed to update star status");
        } finally {
            setIsStarring(false);
        }
    }

    return (
        <button 
            className={`group relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all duration-300
            border overflow-hidden
            ${isSnippetInMyStarredList
                ? "bg-white/10 border-white/30 text-white hover:bg-white/15" 
                : "bg-zinc-800/40 border-zinc-700/30 text-gray-300 hover:bg-white/5 hover:border-white/20 hover:text-white"
            }`}
            onClick={handleStar}
            disabled={isStarring}
        >
            {/* Background effect */}
            <div className={`absolute inset-0 opacity-0 transition-opacity duration-300
                ${isSnippetInMyStarredList 
                    ? "bg-white/5 group-hover:opacity-100" 
                    : "bg-white/5 group-hover:opacity-100"
                }`}
            />

            {/* Star icon */}
            {isStarring ? (
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <Star 
                    className={`w-4 h-4 relative z-10 transition-all duration-300
                    ${isSnippetInMyStarredList 
                        ? "fill-white text-white" 
                        : "fill-none group-hover:fill-white/80 text-gray-300 group-hover:text-white"
                    }`}
                />
            )}

            {/* Star count */}
            <span className={`text-xs font-medium relative z-10 transition-colors duration-300
                ${isSnippetInMyStarredList 
                    ? "text-white" 
                    : "text-gray-300 group-hover:text-white"
                }`}>
                {starCount ?? 0}
            </span>
        </button>
    )
}

export default StarButton