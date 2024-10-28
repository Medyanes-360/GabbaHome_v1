"use client";
import ButtonComponent from "@/globalElements/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function OffersLayout({ children }) {
  const pathName = usePathname();

  return (
    <>
      {" "}
      <div className="w-full flex items-center justify-between border-b-2 pb-2 mb-2">
        <div className="flex items-center gap-2">
          {" "}
          <Link
            className={`${pathName === "/offers" && "opacity-50"}`}
            href="/offers"
          >
            <ButtonComponent
              disabled={pathName == "/offers" && true}
              text="Teklifleri Görüntüle"
              classname="bg-blue-500 px-4 py-2 rounded-md text-white "
            />
          </Link>
          <Link
            className={`${pathName === "/offers/create-offer" && "opacity-50"}`}
            href="/offers/create-offer"
          >
            <ButtonComponent
              disabled={pathName == "/offers/view-offers" && true}
              text="Teklif Oluştur"
              classname="bg-green-500 px-4 py-2 rounded-md text-white "
            />
          </Link>
        </div>
        <div className="flex items-center gap-5 mr-5">
          <Link
            className={`${
              pathName === "/offers/basket"
                ? "opacity-50 cursor-default "
                : "hover:scale-110 hover:shadow-xl rounded-full transition-all duration-200"
            } relative bg-transparent  flex items-center justify-center`}
            href="/offers/basket"
          >
            <div className={` rounded-full bg-white p-2`}>
              {" "}
              <BasketSVG />
            </div>
            <span className="px-1.5 py-1 bg-red-500 text-sm  text-white absolute -top-4 -right-4 flex items-center justify-center  rounded-md">
              10
            </span>
          </Link>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
}

const BasketSVG = () => {
  return (
    <svg
      width="25px"
      height="25px"
      viewBox="0 0 15.00 15.00"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000000"
      stroke-width="0.00015000000000000001"
    >
      <g
        id="SVGRepo_bgCarrier"
        stroke-width="0"
        transform="translate(0,0), scale(1)"
      ></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke="#CCCCCC"
        stroke-width="0.3"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M2.44898 14.398L2.89619 14.1743L2.89619 14.1743L2.44898 14.398ZM12.551 14.398L12.9982 14.6216L12.9982 14.6216L12.551 14.398ZM0.703196 6H14.2968V5H0.703196V6ZM14 5.7032V6.14196H15V5.7032H14ZM12.3859 14H2.61409V15H12.3859V14ZM1 6.14196V5.7032H0V6.14196H1ZM2.89619 14.1743C1.6492 11.6804 1 8.93031 1 6.14196H0C0 9.08555 0.685346 11.9887 2.00176 14.6216L2.89619 14.1743ZM2.61409 14C2.73356 14 2.84277 14.0675 2.89619 14.1743L2.00176 14.6216C2.11773 14.8535 2.35478 15 2.61409 15V14ZM12.1038 14.1743C12.1572 14.0675 12.2664 14 12.3859 14V15C12.6452 15 12.8823 14.8535 12.9982 14.6216L12.1038 14.1743ZM14 6.14196C14 8.93031 13.3508 11.6804 12.1038 14.1743L12.9982 14.6216C14.3147 11.9887 15 9.08555 15 6.14196H14ZM14.2968 6C14.1329 6 14 5.86712 14 5.7032H15C15 5.31483 14.6852 5 14.2968 5V6ZM0.703196 5C0.314831 5 0 5.31483 0 5.7032H1C1 5.86712 0.867117 6 0.703196 6V5ZM3.92875 5.75725L6.92875 0.757248L6.07125 0.242752L3.07125 5.24275L3.92875 5.75725ZM8.07125 0.757248L11.0713 5.75725L11.9287 5.24275L8.92875 0.242752L8.07125 0.757248Z"
          fill="#000000"
        ></path>{" "}
      </g>
    </svg>
  );
};
