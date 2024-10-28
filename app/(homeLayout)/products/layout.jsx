"use client";
import ButtonComponent from "@/globalElements/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProductsLayout({ children }) {
  const pathName = usePathname();

  return (
    <>
      {" "}
      <div className="w-full flex items-center justify-between border-b-2 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <Link
            className={`${
              pathName === "/products/product-types" && "opacity-50"
            }`}
            href="/products/product-types"
          >
            <ButtonComponent
              disabled={pathName == "/products/product-types" && true}
              text="Ürün Tipleri"
              classname="bg-orange-500 px-4 py-2 rounded-md text-white "
            />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {" "}
          <Link
            className={`${pathName === "/products" && "opacity-50"}`}
            href="/products"
          >
            <ButtonComponent
              disabled={pathName == "/products" && true}
              text="Ürün Listesi"
              classname="bg-blue-500 px-4 py-2 rounded-md text-white "
            />
          </Link>
          <Link
            className={`${
              pathName === "/products/create-product" && "opacity-50"
            }`}
            href="/products/create-product"
          >
            <ButtonComponent
              disabled={pathName == "/products/create-product" && true}
              text="Yeni Ürün oluştur"
              classname="bg-green-500 px-4 py-2 rounded-md text-white "
            />
          </Link>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
}
