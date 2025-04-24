const CardSkeleton = () => (
  <div className="relative group">
    <div className="bg-zinc-900/80 backdrop-blur-md rounded-xl border border-zinc-800/50 overflow-hidden h-[320px]">
      <div className="p-6 space-y-5">
        {/* Header shimmer */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/10 animate-pulse" />
            <div className="space-y-2">
              <div className="w-24 h-6 bg-indigo-500/10 rounded-lg animate-pulse" />
              <div className="w-20 h-4 bg-indigo-500/5 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="w-16 h-8 bg-indigo-500/10 rounded-lg animate-pulse" />
        </div>

        {/* Title shimmer */}
        <div className="space-y-2">
          <div className="w-3/4 h-7 bg-indigo-500/10 rounded-lg animate-pulse" />
          <div className="w-1/2 h-5 bg-indigo-500/5 rounded-lg animate-pulse" />
        </div>

        {/* Code block shimmer */}
        <div className="space-y-2 overflow-hidden rounded-lg border border-zinc-800/50">
          {/* Mock editor header */}
          <div className="flex items-center bg-zinc-950/80 px-3 py-1.5 border-b border-zinc-800/50">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
            </div>
          </div>
          
          {/* Code lines */}
          <div className="bg-zinc-950/50 p-4">
            <div className="w-full h-4 bg-indigo-500/10 rounded animate-pulse mb-2" />
            <div className="w-3/4 h-4 bg-indigo-500/10 rounded animate-pulse mb-2" />
            <div className="w-1/2 h-4 bg-indigo-500/10 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function SnippetsPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Ambient background with loading pulse */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute top-[5%] -left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[5%] -right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-cyan-600/5 rounded-full blur-[100px] animate-pulse" />
      </div>

      {/* Hero Section Skeleton */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="w-48 h-8 bg-indigo-500/10 border border-indigo-500/10 rounded-full mx-auto animate-pulse" />
          <div className="w-96 h-14 bg-indigo-500/10 rounded-xl mx-auto animate-pulse" />
          <div className="w-72 h-6 bg-indigo-500/5 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* Search and Filters Skeleton */}
        <div className="max-w-5xl mx-auto mb-12 space-y-6">
          {/* Search bar */}
          <div className="relative">
            <div className="w-full h-14 bg-zinc-900/80 backdrop-blur-md rounded-xl border border-zinc-800/80 animate-pulse" />
          </div>

          {/* Language filters */}
          <div className="flex flex-wrap gap-3">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-24 h-9 bg-indigo-500/10 border border-indigo-500/10 rounded-lg animate-pulse"
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              style={{
                animationDelay: `${i * 150}ms`,
              }}
            >
              <CardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}