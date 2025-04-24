// import { currentUser } from "@clerk/nextjs/server"
// import { ConvexHttpClient } from "convex/browser";
import NavigationHeader from "@/components/NavigationHeader";
import { ENTERPRISE_FEATURES, FEATURES } from "./_constants";
import { Code, ExternalLink, Star, Terminal, Zap } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import FeatureCategory from "./_components/FeatureCategory";
import FeatureItem from "./_components/FeatureItem";
import HomepageButton from "./_components/HomepageButton";
import LoginButton from "@/components/LoginButton";
import ParticlesBackground from "@/components/ParticlesBackground";
import TypewriterText from "@/components/TypewriterText";
import CodeShowcase from "@/components/CodeShowcase";
import AnimatedStats from "@/components/AnimatedStats";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-white/20 selection:text-white">
      <ParticlesBackground />
      <NavigationHeader />

      {/* main content */}
      <main className="relative pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-20">
            {/* Hero subtle lighting */}
            <div className="absolute top-32 left-1/4 w-72 h-72 bg-white/5 rounded-full filter blur-[120px] opacity-50" />
            <div className="absolute top-40 right-1/4 w-72 h-72 bg-white/5 rounded-full filter blur-[120px] opacity-50" />
            
            <div className="relative inline-block mt-4 mb-16">
              <div className="text-sm mb-14 font-mono text-gray-400 mb-4 inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full">
                <Terminal className="w-4 h-4" />
                <TypewriterText text="TThe future of coding is here" speed={30} />
              </div>
              <div className="absolute -inset-1 bg-white/5 blur-xl opacity-50 rounded-3xl" />
              <h1 className="relative text-5xl md:text-6xl lg:text-7xl font-bold mb-8  leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
                  Reimagine the way <br />
                  You Code
                </span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mt-4 mb-24">
              <span className="font-mono">Elif</span> - All in one Online Compiler cum IDE
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-32">
              <SignedIn>
                <HomepageButton className="px-8 py-3 rounded-md text-black
                   bg-white hover:bg-gray-200
                   transition-all duration-300 shadow-glow-white" />
              </SignedIn>
              <SignedOut>
                <LoginButton />
                <a 
                  href="#features" 
                  className="inline-flex items-center justify-center gap-2 px-4 py-3
                    bg-transparent text-white hover:bg-white/5
                    ring-1 ring-white/10 hover:ring-white/30
                    rounded-md transition-all duration-300"
                >
                  <span className="font-medium">Explore Features</span>
                </a>
              </SignedOut>
            </div>
          </div>
          
          {/* Code Showcase */}
          <div className="max-w-5xl mx-auto mb-40 animate-float-slow">
            <CodeShowcase />
          </div>
          
          {/* Stats Section */}
          <div className="max-w-5xl mx-auto mt-24 mb-24">
            <h2 className="text-xl font-bold text-center text-white mb-8">
              Powering the developers of tomorrow
            </h2>
            <AnimatedStats />
          </div>

          {/* Enterprise Features */}
          <div id="features" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 mb-36">
            {ENTERPRISE_FEATURES.map((feature, index) => (
              <div
                key={feature.label}
                style={{ animationDelay: `${index * 100}ms` }}
                className="group relative overflow-hidden frost-panel p-6
                  hover:shadow-glow hover-glow transition-all duration-300 animate-fade-in"
              >
                <div className="absolute inset-0 bg-white/5 opacity-0 
                  group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative">
                  <div className="w-12 h-12 rounded-lg bg-zinc-900 
                    flex items-center justify-center mb-4 ring-1 ring-zinc-800
                    group-hover:ring-white/10 transition-all duration-300"
                  >
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3">{feature.label}</h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <div className="relative max-w-4xl mx-auto my-64">
            <div className="absolute -inset-0.5 bg-white/10 rounded-lg blur-md opacity-50" />
              
            <div className="relative frost-panel overflow-hidden animate-fade-in-slow">
              {/* Border lines */}
              <div className="absolute inset-x-0 -top-px h-px bg-white/20" />
              <div className="absolute inset-x-0 -bottom-px h-px bg-white/20" />

              <div className="relative p-8 md:p-12">
                {/* header */}
                <div className="text-center mb-12">
                  <div className="inline-flex p-3 rounded-lg bg-zinc-900 
                    ring-1 ring-zinc-800 mb-6">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Lifetime Pro Access for Free
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Unlock the full potential of Elif
                  </p>
                </div>

                {/* Features grid */}
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                  <FeatureCategory label="Development">
                    {FEATURES.development.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>

                  <FeatureCategory label="Collaboration">
                    {FEATURES.collaboration.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>

                  <FeatureCategory label="Productivity">
                    {FEATURES.productivity.map((feature, idx) => (
                      <FeatureItem key={idx}>{feature}</FeatureItem>
                    ))}
                  </FeatureCategory>
                </div>

                {/* CTA */}
                <div className="flex justify-center">
                  <SignedIn>
                    <HomepageButton className="w-full max-w-xs px-6 py-3 rounded-md text-black
                      bg-white hover:bg-gray-200
                      transition-all duration-300 font-medium shadow-glow-white" />
                  </SignedIn>
                  
                  <SignedOut>
                    <LoginButton fullWidth />
                  </SignedOut>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}