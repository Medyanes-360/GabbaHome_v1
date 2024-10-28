"use client";
export default function ModalComponent({
  title,
  children,
  isOpen,
  setIsOpen,
  classname,
}) {
  if (!isOpen) return null;
  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed  top-0 flex items-center justify-center left-0 z-[10000] !w-[100vw] !h-[100vh] bg-black/70"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`bg-white w-fit py-2 px-4 rounded-xl min-w-[50%] ${classname}`}
      >
        {/* Header */}
        <div className="  text-start shadow-2xl w-full pb-2 mb-2 text-2xl">
          {title}
        </div>
        <div className="h-[100%] overflow-scroll  max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
}
