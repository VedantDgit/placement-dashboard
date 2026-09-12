"use client";

import React, { useState } from "react";
import { CalendarView } from "@/components/calendar/CalendarView";
import { AddEventModal } from "@/components/calendar/AddEventModal";

export default function CalendarPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <CalendarView onOpenAddEvent={() => setIsAddModalOpen(true)} />

      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
