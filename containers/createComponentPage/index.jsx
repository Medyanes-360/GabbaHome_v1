"use client";
import CreateComponentPagePanels from "@/components/createComponentPage/panels";
import CreateComponentPageTabs from "@/components/createComponentPage/tabs";
import { useState } from "react";

export default function CreateComponentPageContainer() {
  const [activePanel, setActivePanel] = useState(1);
  return (
    <div className="md:flex">
      <CreateComponentPageTabs
        activePanel={activePanel}
        setActivePanel={setActivePanel}
      />
      <CreateComponentPagePanels activePanel={activePanel} />
    </div>
  );
}
