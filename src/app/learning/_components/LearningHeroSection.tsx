export default function LearningHero({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="relative rounded-3xl overflow-hidden mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/30 backdrop-blur-sm" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-white/5 rounded-full text-sm font-medium">Replix Learning</div>
              <div className="text-sm text-gray-300">Guided paths • Cheatsheets • Interactive IDE</div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-sky-200 leading-tight">
              Learn to Code with Replix —
              <span className="block text-3xl md:text-4xl font-semibold mt-2">Structured, hands-on courses for every level</span>
            </h1>

            <p className="mt-6 text-lg text-gray-300 max-w-2xl">Start from basics, build real projects, and run code instantly in the browser. Clear explanations, cheatsheets, quizzes and progress tracking make learning addictive and rewarding.</p>

            <div className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start">
              <button onClick={onExplore} className="px-6 py-3 bg-white text-black rounded-xl font-medium shadow-lg hover:scale-[1.02] transition-transform">Browse Learning Paths</button>
              <a href="/learning/projects" className="px-5 py-3 ring-1 ring-white/20 rounded-xl text-white hover:bg-white/5">Guided Projects</a>
            </div>

            {/* Fixed: removed the sm:max-w-sm cap and avoided break-words so "Interactive" doesn't split */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-full mx-auto lg:mx-0">
              <div className="p-4 bg-white/4 rounded-xl text-center">
                <div className="text-xl sm:text-2xl font-bold leading-tight">10+</div>
                <div className="text-xs text-gray-300">Languages</div>
              </div>
              <div className="p-4 bg-white/4 rounded-xl text-center">
                <div className="text-xl sm:text-2xl font-bold leading-tight">100+</div>
                <div className="text-xs text-gray-300">Lessons</div>
              </div>
              <div className="p-4 bg-white/4 rounded-xl text-center">
                <div className="text-xl sm:text-2xl font-bold leading-tight break-normal">Interactive</div>
                <div className="text-xs text-gray-300">Editor & Runner</div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-black/40 to-white/3 ring-1 ring-white/6">
              <div className="mb-4 text-sm text-gray-300">Try a sample lesson</div>
              <pre className="bg-black/80 rounded-md p-3 text-xs font-mono text-white overflow-auto">{`// JavaScript — Hello World
console.log('Hello Replix Learning');`}</pre>
              <div className="mt-4 flex gap-2">
                <a href="/editor" target="_blank" className="px-4 py-2 bg-white text-black rounded-lg">Open Editor</a>
                <button onClick={onExplore} className="px-4 py-2 ring-1 ring-white/10 rounded-lg text-white">Preview</button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="absolute -bottom-24 left-0 w-full h-48 bg-gradient-to-t from-transparent to-black/10 blur-3xl" />
    </section>
  );
}
