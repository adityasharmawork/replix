import { Terminal } from "lucide-react";

export function EditorPanelSkeleton() {
  return (
    <div className="relative h-full flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 rounded-xl blur-2xl" />
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-3 h-full flex-1">
        {/* Editor Area Skeleton */}
        <div className="relative rounded-xl overflow-hidden ring-1 ring-white/[0.05] h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />
          <div className="h-full bg-[#1e1e2e]/50 backdrop-blur-sm p-4">
            {/* Code line skeletons */}
            {[...Array(15)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-4 bg-white/5 rounded`} />
                <div
                  className={`h-4 bg-white/5 rounded`}
                  style={{ width: `${Math.random() * 60 + 20}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function OutputPanelSkeleton() {
  return (
    <div className="relative h-full flex flex-col">
      <div className="relative bg-[#181825] rounded-xl p-3 ring-1 ring-gray-800/50 h-full flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#1e1e2e] ring-1 ring-gray-800/50">
              <Terminal className="w-4 h-4 text-primary-400/50" />
            </div>
            <div className={`w-16 h-4 bg-white/5 rounded`} />
          </div>
        </div>

        {/* Output Area Skeleton */}
        <div className="relative flex-1">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e2e] to-[#1a1a2e] rounded-xl -z-10" />
          <div className="relative bg-[#1e1e2e]/50 backdrop-blur-sm border border-[#313244] rounded-xl p-3 h-full">
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className={`w-12 h-12 mx-auto mb-4 bg-white/5 rounded-xl`} />
                <div className={`w-48 h-4 mx-auto bg-white/5 rounded`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading state for the entire editor view
export function EditorViewSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 p-2 h-full">
      <EditorPanelSkeleton />
      <OutputPanelSkeleton />
    </div>
  );
}