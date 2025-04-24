const RunningCodeSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="h-5 w-5 bg-primary-500/20 rounded-full" />
      <div className="h-4 bg-primary-500/20 rounded w-32" />
    </div>
    
    <div className="space-y-2">
      <div className="h-4 bg-gray-700/30 rounded w-3/4" />
      <div className="h-4 bg-gray-700/30 rounded w-1/2" />
      <div className="h-4 bg-gray-700/30 rounded w-5/6" />
    </div>

    <div className="space-y-2 pt-4">
      <div className="h-4 bg-gray-700/30 rounded w-2/3" />
      <div className="h-4 bg-gray-700/30 rounded w-4/5" />
      <div className="h-4 bg-gray-700/30 rounded w-3/4" />
    </div>
    
    <div className="absolute bottom-6 right-6">
      <div className="h-6 w-28 bg-primary-500/20 rounded-lg" />
    </div>
  </div>
);

export default RunningCodeSkeleton;