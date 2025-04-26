import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

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

export const metadata: Metadata = {
  title: "Elif - Code Beyond Limits!",
  description: "Elif is a community-driven code library that allows you to share, discover, and collaborate on code snippets with ease. Join us today and unlock the power of code sharing!",
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
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4171021998173874"
            crossOrigin="anonymous"></script>
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
        </body>
      </html>
    </ClerkProvider>
  );
}


// https://emkc.org/api/v2/piston/runtimes