"use client";
import ButtonComponent from "@/globalElements/button";
import { MotionDiv } from "@/globalElements/motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const currentPath = usePathname();

  const closeSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MotionDiv
      onClick={closeSidebar}
      transition={{ duration: 0.2 }}
      initial={{ width: 400 }}
      animate={{
        width: isOpen ? 400 : 40,
        transition: { duration: 0.4, ease: "easeInOut" },
      }}
      style={{ width: 400 }}
      className=" h-[100vh] flex relative items-start bg-[#F5F5F5] overflow-hidden"
    >
      <MotionDiv
        onClick={(e) => {
          e.stopPropagation();
        }}
        transition={{ duration: 0.2 }}
        initial={{ x: 0, opacity: 1 }}
        animate={{
          x: isOpen ? 0 : -300,
          opacity: isOpen ? 1 : 0,
          transition: { duration: 0.4, ease: "easeInOut" },
        }}
        className="flex max-w-[360px] overflow-hidden bg-white flex-col flex-1 h-full pl-5  "
      >
        {" "}
        <Image
          src="/assets/images/company_logo.svg"
          alt={process.env.COMPANY_NAME}
          className="w-[160px] h-[90px]"
          priority
          width="160"
          height="90"
        />
        <ul className=" w-full px-2  h-fit   ">
          <p className="text-[#78716C] font-bold py-3">Panel</p>
          {data.panel.map((elem, index) => {
            return (
              <li
                className={`${
                  currentPath == elem.url
                    ? "bg-[#78716C] !text-white "
                    : "bg-transparent !text-[#78716C]"
                } hover:bg-[rgba(120,113,108,0.6)] hover:!text-white overflow-hidden text-white flex rounded-md m-1`}
                key={index}
              >
                <Link className=" py-3 px-4 !w-full !h-full" href={elem.url}>
                  {elem.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <hr />
        <ul className=" w-full px-2  h-fit  ">
          <p className="text-[#78716C] font-bold py-3">Diğerleri</p>
          {data.others.map((elem, index) => {
            return (
              <li
                className={`${
                  currentPath == elem.url
                    ? "!bg-[#78716C] !text-white"
                    : "!bg-transparent !text-[#78716C]"
                } hover:bg-[rgba(120,113,108,0.6)]  hover:text-white overflow-hidden text-white flex rounded-md m-1`}
                key={index}
              >
                <Link className=" py-3 px-4 !w-full !h-full" href={"#"}>
                  {elem.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="justify-self-end mt-auto mb-5">
          <Link href="/">
            <ButtonComponent
              text="Anasayfaya dön "
              classname="bg-green-500 px-4 py-2 rounded-md text-white "
            />
          </Link>
        </div>
      </MotionDiv>
      <div className="cursor-pointer hover:bg-[#cccaca] transition-all duration-200 flex items-center justify-center h-full w-[40px] absolute bg-[#F5F5F5] right-0 top-0  ">
        <MotionDiv
          transition={{ duration: 0.2 }}
          initial={{ rotate: "0deg" }}
          animate={{
            rotateY: isOpen ? "0deg" : "180deg",
            scale: isOpen ? 1.1 : 0.9,

            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          className="h-full w-full flex items-center justify-center"
        >
          <ArrowSvg />
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}

const data = {
  panel: [
    { id: 0, title: "Şirket", url: "/dashboard/companies" },
    { id: 1, title: "Mağaza", url: "/dashboard/stores" },
    { id: 2, title: "Çalışan", url: "/dashboard/employees" },
    { id: 3, title: "Tedarikçi", url: "/dashboard/suppliers" },
    { id: 4, title: "Gider", url: "/dashboard/expenses" },
  ],
  others: [
    {
      id: 0,
      title: "Stok",
      subTitles: [
        { id: 0, title: "Stok", url: "/dashboard/stock" },
        { id: 1, title: "Stok Kontrol", url: "/dashboard/stock-control" },
      ],
    },
  ],
};

const ArrowSvg = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLineCap="round"
        strokeLineJoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M16.1795 3.26875C15.7889 2.87823 15.1558 2.87823 14.7652 3.26875L8.12078 9.91322C6.94952 11.0845 6.94916 12.9833 8.11996 14.155L14.6903 20.7304C15.0808 21.121 15.714 21.121 16.1045 20.7304C16.495 20.3399 16.495 19.7067 16.1045 19.3162L9.53246 12.7442C9.14194 12.3536 9.14194 11.7205 9.53246 11.33L16.1795 4.68297C16.57 4.29244 16.57 3.65928 16.1795 3.26875Z"
          fill="#0F0F0F"
        ></path>{" "}
      </g>
    </svg>
  );
};
