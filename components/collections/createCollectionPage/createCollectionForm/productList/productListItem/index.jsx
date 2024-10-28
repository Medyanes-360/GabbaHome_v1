import ButtonComponent from "@/globalElements/button";
import ImageModal from "@/globalElements/imageModal";
import LanguageButton from "@/globalElements/languageButton";
import TranslateFormModal from "@/globalElements/translateForm";
import useProductStore from "@/zustand/fetchOperations/product/product";
import Link from "next/link";
import { useState } from "react";

export default function CreateCollectionFormProductListItem({
  data,
  selectedProducts,
  setSelectedProducts,
}) {
  const getProductImageCount = useProductStore(
    (state) => state.getProductImageCount
  );
  const setProductImages = useProductStore((state) => state.setProductImages);

  const isSelected = selectedProducts.find((product) => product.id == data.id);

  const [isImagesLoading, setIsImagesLoading] = useState(false);

  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);
  const languageData = {
    name_tr: data.name_tr,
    name_uk: data.name_uk,
    name_en: data.name_en,
    description_tr: data.description_tr,
    description_uk: data.description_uk,
    description_en: data.description_en,
  };

  const handleAddProduct = () => {
    setSelectedProducts((oldProducts) => [...oldProducts, data]);
  };
  const handleRemoveProduct = () => {
    const newProducts = [
      ...selectedProducts.filter((product) => product.id != data.id),
    ];
    setSelectedProducts(newProducts);
  };
  const getCountHandler = async () => {
    setIsImagesLoading(true);
    const count = await getProductImageCount(data.id);
    if (count != data.images.length) {
      await setProductImages(data.id);
    }
    setIsImagesLoading(false);
  };

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">
        <div className="flex items-center justify-center gap-2">
          {!isSelected && (
            <ButtonComponent
              onClick={handleAddProduct}
              text="Koleksiyona Ekle"
              classname="bg-green-500    text-white"
            />
          )}
          {isSelected && (
            <ButtonComponent
              onClick={handleRemoveProduct}
              text="Koleksiyondan Çıkar"
              classname="bg-red-500    text-white"
            />
          )}
        </div>
      </td>
      <th
        scope="row"
        className=" px-6 py-4 !max-w-[250px]   break-words   font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {new Date(data.updatedAt).toLocaleDateString() +
          " " +
          new Date(data.updatedAt).toLocaleTimeString()}
      </th>
      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">
        {data.productCode}
      </td>
      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">{data.name}</td>
      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">
        {data.productType?.name}
      </td>
      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">
        {data.description}
      </td>
      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">
        {data.price.amount + " " + data.price.currency}
      </td>
      <td className=" px-6 py-4 !max-w-[250px]   break-words   ">
        {data.images && data.images.length > 0 && data.images[0] ? (
          <div
            onClick={() => {
              getCountHandler();
            }}
            className="relative"
          >
            <ImageModal
              loading={isImagesLoading}
              images={[...data.images.map((elem) => elem.image)]}
            />
          </div>
        ) : (
          <ErrorSvg />
        )}
      </td>
      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">
        <LanguageButton
          onClick={() => {
            setIsOpenTranslateModal(true);
          }}
        />{" "}
        <TranslateFormModal
          itemName="Ürün"
          isOpen={isOpenTranslateModal}
          setIsOpen={setIsOpenTranslateModal}
          languageData={languageData}
          isViewMode={true}
        />
      </td>

      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">
        <div className="flex items-center justify-center gap-2">
          <Link target="_blank" href={`/products/${data.id}`}>
            <ButtonComponent
              text="Görüntüle"
              classname="bg-blue-500    text-white"
            />
          </Link>
        </div>
      </td>
    </tr>
  );
}
const ErrorSvg = () => {
  return (
    <svg
      fill="red"
      height="48px"
      width="48px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke="red"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M64,256c0-106.1,86-192,192-192 c42.1,0,81,13.7,112.6,36.7L100.7,368.6C77.7,337,64,298.1,64,256z M256,448c-42.1,0-81-13.7-112.6-36.7l267.9-267.9 c23,31.7,36.7,70.5,36.7,112.6C448,362.1,362,448,256,448z"></path>{" "}
      </g>
    </svg>
  );
};
