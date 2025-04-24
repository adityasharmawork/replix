import { Check } from "lucide-react";

const FeatureItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3 group">
    <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-white/5 flex items-center justify-center 
      border border-zinc-800 group-hover:border-white/20 group-hover:bg-white/10
      transition-all duration-300">
      <Check className="w-3 h-3 text-white" />
    </div>
    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{children}</span>
  </div>
);

export default FeatureItem;