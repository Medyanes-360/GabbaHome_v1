"use client";
import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import LanguageButton from "@/globalElements/languageButton";
import TranslateFormModal from "@/globalElements/translateForm";
import useProductTypeStore from "@/zustand/fetchOperations/product/productType";
import { useState } from "react";

export default function ProductTypeListItem({ data }) {
  const deleteProductType = useProductTypeStore(
    (state) => state.deleteProductType
  );
  const updateProductType = useProductTypeStore(
    (state) => state.updateProductType
  );

  //-start- editMode:
  const [isEditMode, setIsEditMode] = useState(false);

  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);
  const [languageData, setLanguageData] = useState({
    name_tr: data.name_tr,
    name_uk: data.name_uk,
    name_en: data.name_en,
    description_tr: data.description_tr,
    description_uk: data.description_uk,
    description_en: data.description_en,
  });

  const [productTypeNameInputValue, setProductTypeNameInputValue] = useState(
    data.name
  );
  const [
    productTypeDescriptionInputValue,
    setProductTypeDescriptionInputValue,
  ] = useState(data.description);

  const updateHandler = () => {
    const productTypeToUpdate = {
      id: data.id,
      name: productTypeNameInputValue,
      description: productTypeDescriptionInputValue,
      ...languageData,
    };

    // eğer data hiç değiştirilmemişse güncelleme:
    if (!(JSON.stringify(data) === JSON.stringify(productTypeToUpdate))) {
      updateProductType(productTypeToUpdate);
      setIsEditMode(false);
    }
  };
  // -end-

  // -start- delete
  const deleteHandler = () => {
    if (confirm("Ürün Tipini silmek istediğinize emin misiniz?")) {
      deleteProductType(data.id);
    }
  };
  // -end-

  return (
    <tr className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="border-r px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {new Date(data.updatedAt).toLocaleDateString() +
          " " +
          new Date(data.updatedAt).toLocaleTimeString()}
      </th>
      <th
        scope="row"
        className="border-r px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {!isEditMode && <span>{data.name}</span>}
        {isEditMode && (
          <InputComponent
            placeholdertext="Örn. Oturma Grubu"
            value={productTypeNameInputValue}
            setvalue={setProductTypeNameInputValue}
          />
        )}
      </th>
      <th
        scope="row"
        className="border-r px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {!isEditMode && <span>{data.description}</span>}
        {isEditMode && (
          <InputComponent
            placeholdertext="Örn. Oturma Grubu Açoıklaması"
            value={productTypeDescriptionInputValue}
            setvalue={setProductTypeDescriptionInputValue}
          />
        )}
      </th>
      <th
        scope="row"
        className="border-r px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <LanguageButton
          onClick={() => {
            setIsOpenTranslateModal(true);
          }}
          width={48}
          height={48}
          edit={isEditMode}
        />
        <TranslateFormModal
          itemName="Ürün Tipi"
          isOpen={isOpenTranslateModal}
          setIsOpen={setIsOpenTranslateModal}
          languageData={languageData}
          setLanguageData={setLanguageData}
          isViewMode={!isEditMode}
          isEditMode={isEditMode}
        />
      </th>

      <td className="">
        <div className="flex items-center justify-center gap-2">
          {isEditMode && (
            <>
              <ButtonComponent
                onClick={updateHandler}
                text="Güncelle"
                classname="bg-green-500    text-white"
              />
              <ButtonComponent
                onClick={() => {
                  setIsEditMode(false);
                }}
                text="İptal"
                classname="bg-red-500   text-white"
              />
            </>
          )}
          {!isEditMode && (
            <>
              {" "}
              <ButtonComponent
                onClick={() => {
                  setIsEditMode(true);
                }}
                text="Düzenle"
                classname="bg-blue-500    text-white"
              />
              <ButtonComponent
                onClick={deleteHandler}
                text="Sil"
                classname=" bg-red-500 text-white"
              />
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
