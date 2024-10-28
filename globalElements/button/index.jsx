import useGlobalStore from "@/zustand/globalStore";
import Loader from "../loading";
import { MotionButton } from "../motion";

export default function ButtonComponent({
  type = "button",
  text,
  classname,
  onClick,
  disabled = false,
}) {
  const loading = useGlobalStore((state) => state.isLoading);

  return (
    <MotionButton
      onClick={(e) => {
        if (!disabled && !loading) {
          onClick && onClick(e);
        }
      }}
      type={type}
      className={` px-4 py-2  rounded-md flex justify-center  ${classname} ${
        (disabled || loading) && "opacity-70 cursor-default"
      } `}
      whileHover={!(disabled || loading) && { scale: 1.03 }}
      whileTap={!(disabled || loading) && { scale: 0.95 }}
      transition={!(disabled || loading) && { duration: 0.2 }}
    >
      <div className="truncate gap-2 rounded-md flex items-center justify-center">
        {text}
        {loading && <Loader button />}
      </div>
    </MotionButton>
  );
}
