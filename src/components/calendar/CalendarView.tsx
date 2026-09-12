"use client";

import React, { useState } from "react";
import { EventItem } from "@/types";
import { usePlacementStore } from "@/store/usePlacementStore";
import { getDeadlineUrgency } from "@/lib/utils";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  List,
  Grid,
} from "lucide-react";

interface CalendarViewProps {
  onOpenAddEvent: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onOpenAddEvent }) => {
  const { events, deleteEvent } = usePlacementStore();
  const [viewMode, setViewMode] = useState<"agenda" | "month">("agenda");
  const [currentMonthDate, setCurrentMonthDate] = useState(new Date("2026-09-01"));

  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Technical Interview":
        return "bg-purple-500/15 text-purple-300 border-purple-500/30";
      case "Online Assessment":
      case "OA Deadline":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "HR Interview":
      case "Managerial Interview":
        return "bg-pink-500/15 text-pink-300 border-pink-500/30";
      case "Offer Deadline":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      case "Application Deadline":
        return "bg-red-500/15 text-red-300 border-red-500/30";
      default:
        return "bg-blue-500/15 text-blue-300 border-blue-500/30";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#0d121c] border border-[#1e283d]">
        <div>
          <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-blue-400" />
            <span>Placement Schedule & Deadlines</span>
          </h2>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Track interview slots, online assessments, test links, and offer expiry dates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-lg bg-[#111624] border border-[#1e283d]">
            <button
              onClick={() => setViewMode("agenda")}
              className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === "agenda"
                  ? "bg-blue-600 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Agenda</span>
            </button>
            <button
              onClick={() => setViewMode("month")}
              className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
                viewMode === "month"
                  ? "bg-blue-600 text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Month</span>
            </button>
          </div>

          <button
            onClick={onOpenAddEvent}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm shadow-blue-500/20 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Schedule Event</span>
          </button>
        </div>
      </div>

      {/* Agenda View */}
      {viewMode === "agenda" ? (
        <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-3">
          {sortedEvents.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-xs">
              No events scheduled in calendar.
            </div>
          ) : (
            sortedEvents.map((evt) => {
              const urgency = getDeadlineUrgency(evt.date);

              return (
                <div
                  key={evt.id}
                  className="p-4 rounded-xl bg-[#111624] border border-[#1e273d] hover:border-zinc-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    {/* Date Block */}
                    <div className="w-12 h-12 rounded-xl bg-[#161e30] border border-[#232f48] flex flex-col items-center justify-center text-center shrink-0">
                      <span className="text-[10px] uppercase font-bold text-zinc-400">
                        {new Date(evt.date).toLocaleDateString("en-US", { month: "short" })}
                      </span>
                      <span className="text-sm font-bold text-zinc-100 font-mono">
                        {new Date(evt.date).getDate()}
                      </span>
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-zinc-100">{evt.title}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded border font-semibold ${getEventTypeColor(
                            evt.type
                          )}`}
                        >
                          {evt.type}
                        </span>
                        {evt.companyName && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#161e30] text-zinc-300 border border-[#243048]">
                            {evt.companyName}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-zinc-500" />
                          {evt.time || "All day"}
                        </span>
                        {evt.notes && <span className="text-zinc-400 truncate">• {evt.notes}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Urgency & Actions */}
                  <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold border ${urgency.badgeClass}`}
                    >
                      {urgency.label}
                    </span>

                    {evt.locationOrUrl && (
                      <a
                        href={evt.locationOrUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-[#161e30] text-blue-400 hover:text-white border border-[#232f48] transition-colors"
                        title="Meeting link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      onClick={() => {
                        if (confirm(`Delete event "${evt.title}"?`)) {
                          deleteEvent(evt.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-[#161e30] text-zinc-600 hover:text-red-400 border border-[#232f48] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Month View Grid */
        <div className="p-5 rounded-2xl bg-[#0d121c] border border-[#1e283d] space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-200">
            <span>September 2026</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded bg-[#141b2a] text-zinc-400">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 rounded bg-[#141b2a] text-zinc-400">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-1 text-[11px] font-semibold text-zinc-500 uppercase">
                {day}
              </div>
            ))}

            {/* Days in September 2026 (Starts on Tuesday = day 2) */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={`empty-${i}`} className="h-24 bg-[#0a0c13]/40 rounded-lg border border-[#151c2c] p-1" />
            ))}

            {Array.from({ length: 30 }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `2026-09-${dayNum < 10 ? `0${dayNum}` : dayNum}`;
              const dayEvents = events.filter((e) => e.date === dateStr);
              const isToday = dayNum === 12;

              return (
                <div
                  key={dateStr}
                  className={`h-24 rounded-lg border p-1 text-left flex flex-col justify-between overflow-hidden transition-colors ${
                    isToday
                      ? "bg-blue-600/10 border-blue-500/40"
                      : "bg-[#111624] border-[#1e273d] hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-1 rounded ${
                        isToday ? "bg-blue-600 text-white" : "text-zinc-400"
                      }`}
                    >
                      {dayNum}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    )}
                  </div>

                  <div className="space-y-0.5 overflow-hidden">
                    {dayEvents.slice(0, 2).map((evt) => (
                      <div
                        key={evt.id}
                        className="text-[9px] px-1 py-0.5 rounded bg-[#161e30] border border-[#232f48] text-zinc-200 truncate"
                        title={evt.title}
                      >
                        {evt.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[8px] text-zinc-500 block">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
