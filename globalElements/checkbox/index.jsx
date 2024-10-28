import { AnimatePresence } from "framer-motion";
import { MotionDiv } from "../motion";

export default function CheckboxComponent({
  checked,
  setChecked,
  index = null,
  disabled = false,
}) {
  return (
    <>
      <MotionDiv
        onClick={() => {
          if (!disabled) {
            setChecked(!checked, index);
          }
        }}
        whileHover={
          !disabled &&
          (checked
            ? { scale: 0.8, opacity: 0.8 }
            : { scale: 1.03, opacity: 0.8 })
        }
        whileTap={!disabled && { scale: 0.95 }}
        transition={!disabled && { duration: 0.2 }}
        animate={
          !disabled &&
          (checked
            ? { scale: 0.7, transition: { delay: 0.25 } }
            : { scale: 1, transition: { delay: 0.25 } })
        }
        className={`${
          disabled && "opacity-70 !cursor-default"
        } w-10 h-10 rounded-md cursor-pointer flex items-center justify-center border-blue-500 border-2  `}
      >
        <AnimatePresence>
          {checked && (
            <MotionDiv
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <CheckSvg />
            </MotionDiv>
          )}
        </AnimatePresence>
      </MotionDiv>
    </>
  );
}

const CheckSvg = () => {
  return (
    <svg
      height="24px"
      width="24px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 511.999 511.999"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          style={{ fill: "#4268ff" }}
          d="M494.328,98.756l-33.279-33.279c-9.99-9.99-26.185-9.99-36.175,0L172.007,318.344 c-3.877,3.877-10.163,3.877-14.04,0L87.11,247.488c-9.99-9.99-26.185-9.99-36.175,0l-33.26,33.26c-9.99,9.99-9.99,26.185,0,36.175 l129.581,129.581c9.997,9.997,26.209,9.989,36.194-0.019l310.896-311.572C504.318,124.919,504.309,108.738,494.328,98.756z"
        ></path>{" "}
        <g>
          {" "}
          <path
            style={{ fill: "#000000" }}
            d="M165.343,464.196c-9.557,0-18.54-3.721-25.3-10.479L10.462,324.135 c-13.949-13.95-13.949-36.649,0-50.6l33.26-33.26c13.951-13.95,36.649-13.95,50.6,0l70.664,70.664L417.661,58.265 c13.95-13.948,36.649-13.949,50.6,0l33.279,33.28l0,0c13.935,13.936,13.947,36.623,0.027,50.573L190.67,453.689 c-6.755,6.771-15.744,10.502-25.308,10.507C165.356,464.196,165.349,464.196,165.343,464.196z M69.022,250.203 c-3.938,0-7.876,1.499-10.875,4.498l-33.259,33.26c-5.997,5.997-5.997,15.754,0,21.75l129.581,129.581 c2.905,2.905,6.767,4.505,10.874,4.505c0.003,0,0.006,0,0.009,0c4.112-0.002,7.974-1.607,10.879-4.517l310.896-311.572 c5.983-5.997,5.978-15.748-0.012-21.738l0,0l-33.279-33.281c-5.996-5.997-15.754-5.996-21.75,0L179.219,325.557 c-7.848,7.848-20.617,7.847-28.466,0l-70.856-70.856C76.898,251.702,72.961,250.203,69.022,250.203z"
          ></path>{" "}
          <path
            style={{ fill: "#000000" }}
            d="M277.27,318.332c-2.611,0-5.221-0.997-7.213-2.989c-3.983-3.983-3.982-10.442,0.001-14.425 l3.192-3.192c3.983-3.982,10.443-3.982,14.425,0.001c3.983,3.983,3.982,10.442-0.001,14.425l-3.192,3.192 C282.49,317.337,279.88,318.332,277.27,318.332z"
          ></path>{" "}
          <path
            style={{ fill: "#000000" }}
            d="M168.75,426.851c-2.61,0-5.221-0.996-7.212-2.988c-3.983-3.983-3.983-10.442,0-14.426l81.922-81.922 c3.983-3.983,10.442-3.983,14.426,0c3.984,3.983,3.983,10.442,0,14.426l-81.922,81.922 C173.971,425.856,171.36,426.851,168.75,426.851z"
          ></path>{" "}
        </g>{" "}
      </g>
    </svg>
  );
};
