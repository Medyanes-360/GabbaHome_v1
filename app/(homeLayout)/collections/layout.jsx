"use client";
import ButtonComponent from "@/globalElements/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CollectionsLayout({ children }) {
  const pathName = usePathname();

  return (
    <>
      {" "}
      <div className="w-full flex items-center justify-between border-b-2 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <Link
            className={`${
              pathName === "/collections/collection-types" && "opacity-50"
            }`}
            href="/collections/collection-types"
          >
            <ButtonComponent
              disabled={pathName == "/collections/collection-types" && true}
              text="Koleksiyon Tipleri"
              classname="bg-orange-500 px-4 py-2 rounded-md text-white "
            />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <Link
            className={`${pathName === "/collections" && "opacity-50"}`}
            href="/collections"
          >
            <ButtonComponent
              disabled={pathName == "/collections" && true}
              text="Koleksiyon Listesi"
              classname="bg-blue-500 px-4 py-2 rounded-md text-white "
            />
          </Link>
          <Link
            className={`${
              pathName === "/collections/create-collection" && "opacity-50"
            }`}
            href="/collections/create-collection"
          >
            <ButtonComponent
              disabled={pathName == "/collections/create-collection" && true}
              text="Yeni Koleksiyon oluştur"
              classname="bg-green-500 px-4 py-2 rounded-md text-white "
            />
          </Link>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
}
