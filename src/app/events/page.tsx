"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

// An array to hold all your events. It's easy to add more here.
const events = [
  {
    title: "MindMaze: The CP Arena",
    description: "A competitive programming arena to test your problem-solving skills and algorithmic knowledge.",
    href: "/events/mindmaze",
    status: "Upcoming",
    tags: ["Competitive Programming", "Algorithms", "Data Structures"],
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case "Live":
      return "bg-green-500/10 text-green-400 ring-green-500/20";
    case "Upcoming":
      return "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20";
    case "Archived":
      return "bg-gray-500/10 text-gray-400 ring-gray-500/20";
    case "Ended":
      return "bg-red-500/10 text-red-400 ring-red-500/20";
    default:
      return "bg-primary-700 text-primary-300";
  }
};

export default function EventsPage() {
  return (
    <main className="min-h-screen w-full bg-background bg-grid-pattern p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center animate-fade-in">
          <h1 className="text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-primary-50 to-primary-400 text-glow">
            Replix Events
          </h1>
          <p className="mt-4 text-lg text-primary-300">
            The official hub for all coding competitions and events.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 animate-slide-up">
          {events.map((event) => (
            <Link
              href={event.href}
              key={event.title}
              className="group relative flex flex-col rounded-2xl p-6 frost-panel hover-glow"
            >
              <div className="flex-grow">
                {/* Status Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${getStatusStyles(event.status)}`}>
                    {event.status}
                  </span>
                </div>
                
                {/* Title and Description */}
                <h2 className="text-xl font-semibold text-primary-100">{event.title}</h2>
                <p className="mt-2 text-sm text-primary-300">{event.description}</p>
              </div>

              {/* Tags */}
              <div className="mt-6 flex-wrap gap-2 flex">
                {event.tags.map((tag) => (
                  <span key={tag} className="inline-block rounded-full bg-primary-800/50 px-3 py-1 text-xs text-primary-300">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer with CTA */}
              <div className="mt-6 border-t border-primary-700/50 pt-4 flex items-center justify-between text-sm text-primary-400">
                <span>View Event</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}