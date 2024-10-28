import Image from "next/image";
import { MotionButton } from "../motion";

export default function ({ edit, onClick, width = 64, height = 64 }) {
  return (
    <>
      <MotionButton
        type="button"
        whileHover={{ scale: 1.05, opacity: 0.9 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        className="min-w-fit p-2  flex   duration-200 items-center justify-center"
      >
        {!edit && (
          <Image
            className=""
            onClick={onClick}
            src="/assets/icons/translateIcon.svg"
            height={height}
            width={width}
            alt="translate"
          />
        )}
        {edit && (
          <Image
            className=""
            onClick={onClick}
            src="/assets/icons/translateIcon_edit.svg"
            height={height}
            width={width}
            alt="translate"
          />
        )}
      </MotionButton>
    </>
  );
}
