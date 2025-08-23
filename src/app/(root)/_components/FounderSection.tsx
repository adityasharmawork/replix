import { Github, Linkedin, Twitter, Code2, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";

const FounderSection = () => {
  return (
    <div className="max-w-6xl mx-auto my-40 animate-fade-in">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full mb-6">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-sm font-mono text-gray-400">Meet the Visionary</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Built by a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
            Developer
          </span>
          {" "}for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300">
            Developers
          </span>
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Discover the mind behind Replix and the passion that drives innovation in building Replix
        </p>
      </div>

      {/* Main Founder Card */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 rounded-2xl blur-3xl opacity-30" />
        
        <div className="relative frost-panel overflow-hidden rounded-2xl  group">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div 
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
          </div>

          <div className="relative p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Profile Icon Section */}
              <div className="flex-shrink-0 relative animate-float">
                <div className="absolute -inset-4 bg-white/10 rounded-full blur-2xl opacity-50" />
                <div className="relative w-48 h-48 rounded-full overflow-hidden ring-2 ring-white/10 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                  <div className="relative">
                    <Code2 className="w-24 h-24 text-white/80" />
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-pulse" /> */}
                  </div>
                </div>
                
                {/* Floating badges */}
                {/* <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-6 h-6 text-white" />
                </div> */}
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center transform transition-transform duration-500 group-hover:-translate-y-1">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    Aditya Sharma
                  </h3>
                  <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 font-medium">
                    Founder & Creator
                  </p>
                </div>

                {/* <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
                  Passionate about democratizing coding education and building tools that empower the next generation of developers. 
                  With expertise in full-stack development and a vision for accessible learning, I created Replix to bridge the gap 
                  between learning and doing.
                </p> */}

                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
                   I build products that shrink the distance between idea and impact. <br /> As a full‑stack engineer with a product mindset, I build scalable tools and experiences using modern web technologies and scalable infrastructure—helping teams ship confidently and grow faster. <br /> If you’re building something ambitious or want a stronger developer experience, let’s connect and build together.
                </p>

                {/* Skills/Tech Stack */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
                  {['React', 'Next.js', 'Node.js', 'TypeScript', 'DevOps'].map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1.5 bg-white/5 text-gray-300 rounded-full text-sm font-medium ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center lg:justify-start gap-4">
                  {/* GitHub */}
                  <Link
                    href="https://dub.sh/adityagithub" // Replace with your GitHub
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-lg bg-zinc-900 ring-1 ring-zinc-800 hover:ring-white/20 transition-all duration-300"
                  >
                    <Github className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -inset-1 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  {/* LinkedIn */}
                  <Link
                    href="https://dub.sh/adityalinkedin" // Replace with your LinkedIn
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-lg bg-zinc-900 ring-1 ring-zinc-800 hover:ring-white/20 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -inset-1 bg-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  {/* Twitter/X */}
                  <Link
                    href="https://dub.sh/adityax" // Replace with your Twitter/X
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-lg bg-zinc-900 ring-1 ring-zinc-800 hover:ring-white/20 transition-all duration-300"
                  >
                    <Twitter className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -inset-1 bg-sky-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>

                  {/* Connect CTA */}
                  <Link
                    href="mailto:developeradityasharma@gmail.com" // Replace with your email
                    className="group relative inline-flex items-center gap-2 px-4 py-3 ml-4 bg-white text-black rounded-lg font-medium transition-all duration-300 hover:bg-gray-200 hover:scale-105"
                  >
                    <span>Let's Connect</span>
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Quote/Mission */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="relative">
                <div className="absolute left-0 top-0 text-6xl text-white/10 font-serif leading-none">"</div>
                <p className="text-gray-300 text-lg italic pl-8 max-w-4xl">
                  Every line of code in Replix is written with the belief that great tools should be accessible to everyone. 
                  My mission is to empower developers worldwide with an IDE that doesn't just work—it inspires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderSection;
