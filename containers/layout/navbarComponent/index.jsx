import Image from "next/image";
import Link from "next/link";

export default function NavbarComponent() {
  return (
    <nav className="   bg-white  relative">
      <div className=" transition-all   duration-200      w-full z-[100000]">
        <div className="py-4 z-[5000] h-full  flex relative bg-blue-dark  text-lg items-center justify-between">
          <div className="flex  w-full relative bg-blue-dark  text-lg items-center justify-between">
            <Link href="/">
              <Image
                src="/assets/images/company_logo.svg"
                alt={process.env.COMPANY_NAME}
                className="w-[160px] h-[90px]"
                priority
                width="160"
                height="90"
              />
            </Link>

            <div className=" flex ">
              {data.routes.map((elem, index) => {
                return (
                  <div
                    key={index}
                    className={`flex group m-1   ${
                      elem.subRoutes && "hover:rounded-t-md"
                    }   hover:bg-orange-light rounded-md relative w-fit transition duration-200 hover:scale-105 hover:shadow-lg  `}
                  >
                    {!elem.url && (
                      <button
                        key={index}
                        className=" py-2 px-2 group-hover:text-blue-dark transition duration-200  text-lg text-white-dark"
                      >
                        {elem.title}
                      </button>
                    )}
                    {elem.url && (
                      <Link
                        href={elem.url}
                        key={index}
                        className=" py-2 px-2  transition duration-200  group-hover:text-blue-dark   text-lg text-white-dark"
                      >
                        {elem.title}
                      </Link>
                    )}
                    {elem.subRoutes && (
                      <div className="hidden  opacity-0 group-hover:opacity-100  group-hover:shadow-lg transition duration-200    group-hover:flex top-10 min-w-[150%] w-fit  flex-col py-2 absolute   items-start rounded-md rounded-tl-none  bg-orange-light  ">
                        {elem.subRoutes.map((subRoute, index) => {
                          return (
                            <Link
                              key={index}
                              href={subRoute.url}
                              className=" w-full text-blue-dark text-nowrap px-2 hover:text-white-dark hover:bg-blue-dark  text-left pl-2 py-2"
                            >
                              {subRoute.title}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

const data = {
  routes: [
    {
      id: 0,
      title: "Bileşenler",
      url: "/create-component",
    },
    {
      id: 1,
      title: "Ürünler",
      url: "/products",
      //   subRoutes: [
      //     {
      //       id: 0,
      //       title: "Ölçü Oluştur",
      //       url: "/hizmetler/kdv-iadesi-tasdik-raporu",
      //     },
      //     {
      //       id: 1,
      //       title: "Kartela Oluştur",
      //       url: "/hizmetler/tam-tasdik",
      //     },
      //     {
      //       id: 2,
      //       title: "Metal Oluştur",
      //       url: "/hizmetler/ozel-amacli-tam-tasdik",
      //     },
      //     {
      //       id: 3,
      //       title: "Renk oluştur",
      //       url: "/hizmetler/gelir-ve-kurumlar-vergisi-iadeleri",
      //     },
      //     {
      //       id: 4,
      //       title: "Teşvik Mevzuatı ve Uygulamaları",
      //       url: "/hizmetler/tesvik-mevzuati-ve-uygulamalari",
      //     },
      //     {
      //       id: 5,
      //       title: "Vergi İncelemesi Danışmanlığı",
      //       url: "/hizmetler/vergi-incelemesi-danismanligi",
      //     },
      //     {
      //       id: 6,
      //       title: "Vergi Dava Danışmanlığı",
      //       url: "/hizmetler/vergi-dava-danismanligi",
      //     },
      //     {
      //       id: 7,
      //       title: "Denetim Hizmetleri",
      //       url: "/hizmetler/denetim-hizmetleri",
      //     },
      //     {
      //       id: 8,
      //       title: "Eğitim Hizmetleri",
      //       url: "/hizmetler/egitim-hizmetleri",
      //     },
      //   ],
    },
    {
      id: 2,
      title: "Koleksiyonlar",
      url: "/collections",
    },
    {
      id: 3,
      title: "Finansal İşlemler",
      url: "/financial-operations",
    },
    {
      id: 4,
      title: "Teklifler",
      url: "/offers",
    },
  ],
};
