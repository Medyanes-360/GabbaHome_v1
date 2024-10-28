import { useState } from "react";
import UpdateProductFormComponentsPanelTabs from "./tabs";
import UpdateProductFormComponentsPanelMeasurementPanel from "./panels/measurementPanel";
import UpdateProductFormComponentsPanelFabricPanel from "./panels/fabricPanel";
import UpdateProductFormComponentsPanelMetalPanel from "./panels/metalPanel";
import UpdateProductFormComponentsPanelColorPanel from "./panels/colorPanel";
import UpdateProductFormComponentsPanelExtraPanel from "./panels/extraPanel";

export default function UpdateProductFormComponentsPanel() {
  const [activePanel, setActivePanel] = useState(1);
  return (
    <>
      <UpdateProductFormComponentsPanelTabs
        activePanel={activePanel}
        setActivePanel={setActivePanel}
      />
      {activePanel == 1 && <UpdateProductFormComponentsPanelMeasurementPanel />}
      {activePanel == 2 && <UpdateProductFormComponentsPanelFabricPanel />}
      {activePanel == 3 && <UpdateProductFormComponentsPanelMetalPanel />}
      {activePanel == 4 && <UpdateProductFormComponentsPanelColorPanel />}
      {activePanel == 5 && <UpdateProductFormComponentsPanelExtraPanel />}
    </>
  );
}
