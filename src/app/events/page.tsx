// "use client";

// import Link from "next/link";
// import { ArrowRight, Calendar } from "lucide-react";

// // An array to hold all your events. It's easy to add more here.
// const events = [
//   {
//     title: "MindMaze: The CP Arena",
//     description: "A competitive programming arena to test your problem-solving skills and algorithmic knowledge.",
//     href: "/events/mindmaze",
//     status: "Upcoming",
//     tags: ["Competitive Programming", "Algorithms", "Data Structures"],
//   },
// ];

// const getStatusStyles = (status: string) => {
//   switch (status) {
//     case "Live":
//       return "bg-green-500/10 text-green-400 ring-green-500/20";
//     case "Upcoming":
//       return "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20";
//     case "Archived":
//       return "bg-gray-500/10 text-gray-400 ring-gray-500/20";
//     case "Ended":
//       return "bg-red-500/10 text-red-400 ring-red-500/20";
//     default:
//       return "bg-primary-700 text-primary-300";
//   }
// };

// export default function EventsPage() {
//   return (
//     <main className="min-h-screen w-full bg-background bg-grid-pattern p-4 sm:p-6 lg:p-8">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-12 text-center animate-fade-in">
//           <h1 className="text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-primary-50 to-primary-400 text-glow">
//             Replix Events
//           </h1>
//           <p className="mt-4 text-lg text-primary-300">
//             The official hub for all coding competitions and events.
//           </p>
//         </div>

//         {/* Events Grid */}
//         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 animate-slide-up">
//           {events.map((event) => (
//             <Link
//               href={event.href}
//               key={event.title}
//               className="group relative flex flex-col rounded-2xl p-6 frost-panel hover-glow"
//             >
//               <div className="flex-grow">
//                 {/* Status Badge */}
//                 <div className="mb-4 flex items-center justify-between">
//                   <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${getStatusStyles(event.status)}`}>
//                     {event.status}
//                   </span>
//                 </div>
                
//                 {/* Title and Description */}
//                 <h2 className="text-xl font-semibold text-primary-100">{event.title}</h2>
//                 <p className="mt-2 text-sm text-primary-300">{event.description}</p>
//               </div>

//               {/* Tags */}
//               <div className="mt-6 flex-wrap gap-2 flex">
//                 {event.tags.map((tag) => (
//                   <span key={tag} className="inline-block rounded-full bg-primary-800/50 px-3 py-1 text-xs text-primary-300">
//                     {tag}
//                   </span>
//                 ))}
//               </div>

//               {/* Footer with CTA */}
//               <div className="mt-6 border-t border-primary-700/50 pt-4 flex items-center justify-between text-sm text-primary-400">
//                 <span>View Event</span>
//                 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

























"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Users,
  Award,
  Plus,
  Search as SearchIcon,
} from "lucide-react";

type Event = {
  id: string;
  title: string;
  description: string;
  href: string;
  status: "Live" | "Upcoming" | "Archived" | "Ended";
  tags: string[];
  date?: string; // ISO string
  attendees?: number;
  prize?: string;
};

const sampleEvents: Event[] = [
  {
    id: "mindmaze",
    title: "MindMaze: The CP Arena",
    description:
      "A competitive programming arena to test your problem-solving skills and algorithmic knowledge.",
    href: "/events/mindmaze",
    status: "Ended",
    tags: ["Competitive Programming", "Algorithms", "Data Structures", "DSA"],
    // date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    date: "20 Aug, 2025, 01:00 pm",
    // attendees: 0,
    // prize: "₹10,000 + Internship",
  },
  {
    id: "gdgoc-aec",
    title: "GDGoC-AEC Core Team Hiring Test",
    description:
      "GDGoC-AEC Core Team Hiring Test",
    href: "/events/gdgoc-aec",
    status: "Upcoming",
    tags: ["Competitive Programming", "Algorithms", "Data Structures", "DSA"],
    // date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    date: "10 Oct, 2025, 01:00 pm",
    // attendees: 0,
    // prize: "₹10,000 + Internship",
  },
  // {
  //   id: "algosprint",
  //   title: "AlgoSprint Hack 2025",
  //   description: "Rapid-fire algorithm challenges + full hacking experience for team innovation and speed.",
  //   href: "/events/algosprint-hack",
  //   status: "Live",
  //   tags: ["Algorithms", "Team"],
  //   date: "10 Oct, 2025, 10:00 AM",
  //   attendees: 320,
  //   prize: "Swags + Certificates",
  // },
];

const statusClasses: Record<string, string> = {
  Live: "bg-gradient-to-r from-green-600/10 to-green-500/8 text-green-400 ring-green-500/20",
  Upcoming:
    "bg-gradient-to-r from-yellow-500/8 to-yellow-400/6 text-yellow-400 ring-yellow-500/20",
  Archived: "bg-gray-800/20 text-gray-300 ring-gray-700/20",
  Ended: "bg-red-600/8 text-red-400 ring-red-600/20",
};

function formatDate(iso?: string) {
  if (!iso) return "TBA";
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "TBA";
  }
}

export default function EventsPage() {
  const [events] = useState<Event[]>(sampleEvents);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | "All">("All");

  const stats = useMemo(() => {
    const total = events.length;
    const upcoming = events.filter((e) => e.status === "Upcoming").length;
    const live = events.filter((e) => e.status === "Live").length;
    const attendees = events.reduce((s, e) => s + (e.attendees || 100), 0);
    return { total, upcoming, live, attendees };
  }, [events]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (statusFilter !== "All" && e.status !== statusFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [events, query, statusFilter]);

  return (
    <main className="min-h-screen w-full bg-background bg-grid-pattern p-6 sm:p-8 lg:p-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-primary-50 to-primary-400 text-glow">
            Replix Events
          </h1>
          <p className="mt-4 text-2xl text-primary-300">
             The official hub for all coding competitions and events.
          </p>
          <p className="mt-6 text-lg text-primary-300 max-w-2xl mx-auto">
            Host and participate in high-quality coding competitions, hackathons and
            community events — organized with fairness, scale and polish.
          </p>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center justify-center gap-3 rounded-2xl bg-primary-800/20 p-4">
              <div className="rounded-full bg-primary-900/30 p-2">
                <Users className="h-5 w-5 text-primary-100" />
              </div>
              <div className="text-left">
                <div className="text-sm text-primary-300">Total participants</div>
                <div className="text-lg font-semibold text-primary-50">{stats.attendees}+</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 rounded-2xl bg-primary-800/20 p-4">
              <div className="rounded-full bg-primary-900/30 p-2">
                <Calendar className="h-5 w-5 text-primary-100" />
              </div>
              <div className="text-left">
                <div className="text-sm text-primary-300">Upcoming events</div>
                <div className="text-lg font-semibold text-primary-50">{stats.upcoming}</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 rounded-2xl bg-primary-800/20 p-4">
              <div className="rounded-full bg-primary-900/30 p-2">
                <Award className="h-5 w-5 text-primary-100" />
              </div>
              <div className="text-left">
                <div className="text-sm text-primary-300">Live now</div>
                <div className="text-lg font-semibold text-primary-50">{stats.live}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Controls */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-3">
            <label htmlFor="search" className="sr-only">
              Search events
            </label>
            <div className="relative flex w-full items-center rounded-xl bg-primary-900/20 px-3 py-2">
              <SearchIcon className="absolute left-3 h-4 w-4 text-primary-400" />
              <input
                id="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title, tag or description..."
                className="w-full bg-transparent pl-9 text-sm placeholder:text-primary-400 focus:outline-none"
                aria-label="Search events"
              />
            </div>

            <select
              aria-label="Filter by status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="hidden sm:inline-flex rounded-xl bg-primary-900/30 px-3 py-2 text-sm text-primary-50 placeholder-primary-400 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            >
              <option value="All">All statuses</option>
              <option value="Live">Live</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ended">Ended</option>
              <option value="Archived">Archived</option>
            </select>


          </div>

          {/* <div className="flex gap-3">
            <Link
              href="/events/create"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 px-4 py-2 text-sm font-medium text-black shadow-lg hover:scale-[1.01] active:scale-100"
            >
              <Plus className="h-4 w-4" />
              Host an event
            </Link>

            <Link
              href="/events/organizer-guide"
              className="hidden items-center gap-2 rounded-xl border border-primary-700/50 px-4 py-2 text-sm text-primary-200 hover:bg-primary-800/10 sm:inline-flex"
            >
              Organizer guide
            </Link>
          </div> */}
        </div>

        {/* Events Grid */}
        <section aria-label="Events list">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {filtered.map((event) => (
              <Link
                href={event.href}
                key={event.id}
                className="group relative flex flex-col rounded-2xl p-6 frost-panel hover-glow transition-shadow hover:shadow-xl"
                aria-label={`Open event ${event.title}`}
              >
                <div className="flex items-start justify-between">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${statusClasses[event.status]}`}>
                    {event.status}
                  </span>

                  <div className="flex items-center gap-3 text-sm text-primary-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                  </div>
                </div>

                <h2 className="mt-4 text-xl font-semibold text-primary-100">{event.title}</h2>
                <p className="mt-2 text-sm text-primary-300 line-clamp-3">{event.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <span key={tag} className="inline-block rounded-full bg-primary-800/40 px-3 py-1 text-xs text-primary-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-primary-700/50 pt-4 text-sm text-primary-400">
                  <div className="flex items-center gap-4">
                    {event.attendees && (
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees ?? 0}</span>
                      </div>
                    )}

                    {event.prize && (
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span className="truncate max-w-[8rem]">{event.prize}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-primary-300">View Event</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}


            
            {/* Organizer CTA card */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 text-primary-50 shadow-2xl transition-transform hover:-translate-y-1">
              <div>
                <h3 className="text-xl font-bold">Host your event on Replix</h3>
                <p className="mt-2 text-sm text-primary-300">
                  We handle fair scoring, auto-judging, leaderboard, and infra — you focus on the problems and community.
                </p>

                <ul className="mt-4 flex flex-col gap-2 text-sm text-primary-300">
                  <li>• Auto-judge & standard parameters checks</li>
                  <li>• Scalable infrastructure for any size</li>
                  <li>• Promotion & participant management</li>
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-primary-700/40 pt-4">
                <a href="mailto:contact@replix.co.in" className="inline-flex items-center gap-2 rounded-lg bg-primary-50/10 px-4 py-2 text-sm font-medium">
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </a>

                <span className="text-xs text-primary-300">Trusted by campus clubs & companies</span>
              </div>
            </div>




          </div>
        </section>
      </div>
    </main>
  );
}
