import KartelaTabPanel from "./kartelaPanel";
import MetalTabPanel from "./metalPanel";
import OlcuTabPanel from "./olcuPanel";
import RenkTabPanel from "./renkPanel";

export default function CreateComponentPagePanels({ activePanel }) {
  return (
    <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
      {activePanel == 1 && <OlcuTabPanel />}
      {activePanel == 2 && <KartelaTabPanel />}
      {activePanel == 3 && <MetalTabPanel />}
      {activePanel == 4 && <RenkTabPanel />}
    </div>
  );
}
