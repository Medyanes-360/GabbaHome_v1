import ButtonComponent from "@/globalElements/button";

export default function UpdateProductFormComponentsPanelTabs({
  activePanel,
  setActivePanel,
}) {
  return (
    <div className="flex w-full gap-5 justify-around  py-5">
      {" "}
      <ButtonComponent
        disabled={activePanel == 1}
        onClick={() => {
          setActivePanel(1);
        }}
        text="Ölçü"
        classname="bg-[#507687] w-full px-4 py-2 rounded-md text-white "
      />
      <ButtonComponent
        disabled={activePanel == 2}
        onClick={() => {
          setActivePanel(2);
        }}
        text="Kartela"
        classname="bg-[#507687] w-full px-4 py-2 rounded-md text-white "
      />
      <ButtonComponent
        disabled={activePanel == 3}
        onClick={() => {
          setActivePanel(3);
        }}
        text="Metal"
        classname="bg-[#507687] w-full px-4 py-2 rounded-md text-white "
      />
      <ButtonComponent
        disabled={activePanel == 4}
        onClick={() => {
          setActivePanel(4);
        }}
        text="Renk"
        classname="bg-[#507687] w-full px-4 py-2 rounded-md text-white "
      />
      <ButtonComponent
        disabled={activePanel == 5}
        onClick={() => {
          setActivePanel(5);
        }}
        text="Ekstra"
        classname="bg-[#507687] w-full px-4 py-2 rounded-md text-white "
      />
    </div>
  );
}
