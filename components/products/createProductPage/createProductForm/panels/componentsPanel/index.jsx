import { useState } from "react";
import CreateProductFormComponentsPanelTabs from "./tabs";
import CreateProductFormComponentsPanelMeasurementPanel from "./panels/measurementPanel";
import CreateProductFormComponentsPanelFabricPanel from "./panels/fabricPanel";
import CreateProductFormComponentsPanelMetalPanel from "./panels/metalPanel";
import CreateProductFormComponentsPanelColorPanel from "./panels/colorPanel";
import CreateProductFormComponentsPanelExtraPanel from "./panels/extraPanel";

export default function CreateProductFormComponentsPanel() {
  const [activePanel, setActivePanel] = useState(1);
  return (
    <>
      <CreateProductFormComponentsPanelTabs
        activePanel={activePanel}
        setActivePanel={setActivePanel}
      />
      {activePanel == 1 && <CreateProductFormComponentsPanelMeasurementPanel />}
      {activePanel == 2 && <CreateProductFormComponentsPanelFabricPanel />}
      {activePanel == 3 && <CreateProductFormComponentsPanelMetalPanel />}
      {activePanel == 4 && <CreateProductFormComponentsPanelColorPanel />}
      {activePanel == 5 && <CreateProductFormComponentsPanelExtraPanel />}
    </>
  );
}
