"use client";
import { useState } from "react";
import CreateProductFormPanels from "./panels";
import CreateProductFormTabs from "./tabs";

// bu component'taki product bilgilerini alacağımız işlemlerin tamamı prop drillingi önlemek için zustand'da /components/createProductForm içinde yapılmıştır
export default function CreateProductForm() {
  const [activePanel, setActivePanel] = useState(1);
  return (
    <div className="flex">
      <div>
        <CreateProductFormTabs
          activePanel={activePanel}
          setActivePanel={setActivePanel}
        />
      </div>
      <CreateProductFormPanels activePanel={activePanel} />
    </div>
  );
}
