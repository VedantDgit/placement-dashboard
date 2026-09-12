"use client";

import React from "react";
import Link from "next/link";
import { usePlacementStore } from "@/store/usePlacementStore";
import { getDeadlineUrgency } from "@/lib/utils";
import { Calendar, Clock, AlertTriangle, ChevronRight, ExternalLink } from "lucide-react";

export const UpcomingDeadlines: React.FC = () => {
  const { events, companies } = usePlacementStore();

  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const urgentCount = events.filter((e) => {
    const urg = getDeadlineUrgency(e.date);
    return urg.urgency === "today" || urg.urgency === "3days";
  }).length;

  return (
    <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#1b2336]">
        <div>
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400" />
            <span>Upcoming Deadlines & Interviews</span>
          </h2>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            {urgentCount > 0 ? (
              <span className="text-amber-400 font-semibold">
                {urgentCount} placement deadline{urgentCount > 1 ? "s" : ""} require attention.
              </span>
            ) : (
              "All upcoming events are on track."
            )}
          </p>
        </div>

        <Link
          href="/calendar"
          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-medium"
        >
          <span>View All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-2.5">
        {sortedEvents.length === 0 ? (
          <div className="py-8 text-center text-zinc-500 text-xs">
            No upcoming events scheduled. Click &quot;Add&quot; to schedule an interview or OA deadline.
          </div>
        ) : (
          sortedEvents.slice(0, 5).map((evt) => {
            const urgency = getDeadlineUrgency(evt.date);
            return (
              <div
                key={evt.id}
                className="p-3 rounded-xl bg-[#111624] border border-[#1e273d] flex items-center justify-between gap-3 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#161e30] border border-[#232f48] flex flex-col items-center justify-center text-center shrink-0">
                    <span className="text-[9px] uppercase font-bold text-zinc-400">
                      {new Date(evt.date).toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="text-xs font-bold text-zinc-100 font-mono">
                      {new Date(evt.date).getDate()}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-zinc-100 truncate">
                        {evt.title}
                      </span>
                      {evt.companyName && (
                        <span className="text-[10px] text-zinc-400 bg-[#161d2d] px-1.5 py-0.2 rounded border border-[#232f48]">
                          {evt.companyName}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                      {evt.type} {evt.time ? `• ${evt.time}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-md font-semibold border ${urgency.badgeClass}`}
                  >
                    {urgency.label}
                  </span>
                  {evt.locationOrUrl && (
                    <a
                      href={evt.locationOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-zinc-500 hover:text-blue-400 transition-colors"
                      title="Open meeting link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
