"use client";

import React, { useState } from "react";
import { PipelineBoard } from "@/components/pipeline/PipelineBoard";
import { CompanyModal } from "@/components/companies/CompanyModal";

export default function PipelinePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PipelineBoard onOpenAddCompany={() => setIsAddModalOpen(true)} />

      <CompanyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
