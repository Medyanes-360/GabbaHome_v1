"use client";
import { useState } from "react";
import UpdateProductFormTabs from "./tabs";
import UpdateProductFormPanels from "./panels";

// bu component'taki product bilgilerini alacağımız işlemlerin tamamı prop drillingi önlemek için zustand'da /components/createProductForm içinde yapılmıştır
export default function UpdateProductForm() {
  const [activePanel, setActivePanel] = useState(1);
  return (
    <div className="flex">
      <div>
        <UpdateProductFormTabs
          activePanel={activePanel}
          setActivePanel={setActivePanel}
        />
      </div>
      <UpdateProductFormPanels activePanel={activePanel} />
    </div>
  );
}
