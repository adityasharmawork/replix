import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

import { Analytics } from "@vercel/analytics/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Replix IDE - Code Beyond Limits!",
//   description: "Replix IDE is a community-driven code library that allows you to share, discover, and collaborate on code snippets with ease. Join us today and unlock the power of code sharing!",
// };




// src/app/layout.tsx

const SITE_URL = "https://replix.co.in";
const SITE_NAME = "Replix IDE";
const DEFAULT_TITLE = "Replix IDE — Best Online Compiler & Coding Platform";

export const metadata: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Replix IDE - Code Beyond Limits!"
  },
  description:
    "Replix IDE is a community-driven code library that allows you to share, discover, and collaborate on code snippets with ease. Join us today and unlock the power of code sharing! Replix (replix.co.in) — All-in-one online IDE & compiler for C, C++, Java, Python, JavaScript, TypeScript, Go, Rust, C#, Ruby, Swift and more. Build, run, debug, share code, join competitive programming events, host contests, and learn with bite-sized lessons — now with AI-assisted judging, auto-debugging, embedded code snippets and progress tracking. Host DSA/CP contests, share code gists, learn with 100+ bite-sized lessons, track progress, and accelerate development with AI-powered code generation and debugging.",
  keywords: [
  "online compiler",
  "online ide",
  "Replix",
  "C",
  "C compiler",
  "C++",
  "C++ compiler",
  "Python",
  "Java",
  "Python online",
  "Java online",
  "Python Compiler",
  "Java Compiler",
  "JavaScript",
  "TypeScript",
  "Rust",
  "Go",
  "Golang",
  "C#",
  "Ruby",
  "Swift",
  "coding",
  "programming",
  "competitive programming",
  "CP",
  "DSA",
  "data structures and algorithms",
  "coding contests",
  "host coding contest",
  "judge platform",
  "AI judging",
  "code sharing",
  "code snippets",
  "learn to code",
  "coding lessons",
  "practice coding",
  "debugging",
  "generate code with AI",
  "online IDE for students",
  "multilanguage IDE",
  "repl",
  "coding platform",
  "code collaboration",
  "cloud compiler",
  "CP contests",
  "coding events",
  "host competitions",
  "AI coding",
  "code generation",
  "online coding tool",
  "coding community",
  "developer tools",
  "IDE online",
  "practice problems",
  "contest hosting",
  "automated judging",
  "coding bootcamp",
  "Code Editor",
  "coding competitions",
  "host events",
  "code debugging",
  "Vibe Coding",
  "Best Online Coding Tool"
  ],
  applicationName: "Replix",
  authors: [{ name: "Aditya Sharma", url: "https://replix.co.in" }],
  openGraph: {
    title: DEFAULT_TITLE,
    description:
      "Replix — Multi-language online IDE & compiler, community code-sharing, competitive events with AI judging, and a practice-first learning platform for DSA, CP and real-world coding.",
    url: SITE_URL,
    siteName: SITE_NAME,
    // images: [
    //   {
    //     url: (process.env.NEXT_PUBLIC_OG_IMAGE || `${SITE_URL}/og.png`),
    //     width: 1200,
    //     height: 630,
    //     alt: "Replix — Online IDE, Compiler & Coding Platform"
    //   }
    // ],
    locale: "en_US",
    type: "website"
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: DEFAULT_TITLE,
  //   description:
  //     "Replix — Online IDE & Compiler. Build, run, debug, share code, host contests, and learn with AI-assisted tools and bite-sized lessons.",
  //   creator: "@AdityaSharma056",
  //   images: [(process.env.NEXT_PUBLIC_OG_IMAGE || `${SITE_URL}/og.png`)]
  // },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  metadataBase: new URL(SITE_URL),
};






export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <head>
          {/* <!-- Google tag (gtag.js) --> */}
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-S85X4VTTGB"></Script>
          <Script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments)
                }
              gtag('js', new Date());

              gtag('config', 'G-S85X4VTTGB');
            `}
          </Script>
          <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4171021998173874"
            crossOrigin="anonymous"></Script>
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative`}>
          {/* Modern background with animated gradient and particles */}
          <div className="fixed inset-0 bg-black z-[-3]" />
          
          {/* Subtle animated gradient */}
          <div className="fixed inset-0 bg-gradient-to-tr from-zinc-900 via-black to-zinc-900 opacity-80 z-[-2] animate-gradient-slow" />
          
          {/* Grid pattern */}
          <div 
            className="fixed inset-0 z-[-1] opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v1H0zM0 0v40h1V0zM39 0v40h1V0zM0 39h40v1H0z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '20px 20px'
            }}
          />
          
          {/* Animated particles with JS will be added in a separate component */}

          {/* Background with subtle patterns and gradients */}
          {/* <div className="fixed inset-0 bg-dark-400 bg-mesh-pattern z-[-2]" />
          <div className="fixed inset-0 bg-gradient-radial from-primary-600/5 to-transparent z-[-1] opacity-60" /> */}
          
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>

          <Footer/>

          <Toaster 
            position="bottom-right"
            toastOptions={{
              className: 'glassmorphism-dark text-white',
              style: {
                background: 'rgba(10, 10, 10, 0.8)',
                color: '#f5f5f5',
                border: '1px solid rgba(229, 229, 229, 0.1)',
              },
            }}
          />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}


// https://emkc.org/api/v2/piston/runtimes