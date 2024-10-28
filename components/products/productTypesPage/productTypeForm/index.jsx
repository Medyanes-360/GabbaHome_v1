"use client";
import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import LanguageButton from "@/globalElements/languageButton";
import useProductTypeStore from "@/zustand/fetchOperations/product/productType";
import { useState } from "react";
import useGlobalStore from "@/zustand/globalStore";
import TranslateFormModal from "@/globalElements/translateForm";

export default function ProductTypeForm() {
  const createProductType = useProductTypeStore(
    (state) => state.createProductType
  );

  const isLoading = useGlobalStore((state) => state.isLoading);

  const [errorStates, setErrorStates] = useState({
    productTypeNameInputError: null,
    productTypeDescriptionInputError: null,
  });

  const [productTypeNameInputValue, setProductTypeNameInputValue] =
    useState("");
  const [
    productTypeDescriptionInputValue,
    setProductTypeDescriptionInputValue,
  ] = useState("");

  const [languageData, setLanguageData] = useState({});
  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const productTypeToPost = {
      name: productTypeNameInputValue,
      description: productTypeDescriptionInputValue,

      // form'dan aldığımız language datası:
      ...languageData,
    };

    createProductType(productTypeToPost);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full gap-2">
        <InputComponent
          errortext={errorStates.productTypeNameInputError}
          labeltext="Ürün Tipine Verilecek İsim"
          placeholdertext="Örn. Oturma Grubu"
          value={productTypeNameInputValue}
          setvalue={setProductTypeNameInputValue}
        />
        <InputComponent
          errortext={errorStates.productTypeDescriptionInputError}
          labeltext="Ürün Tipi İçin Açıklama"
          placeholdertext="Örn. Oturma Grubu Açoıklaması"
          value={productTypeDescriptionInputValue}
          setvalue={setProductTypeDescriptionInputValue}
        />
        <LanguageButton
          onClick={() => {
            setIsOpenTranslateModal(true);
          }}
        />{" "}
        <TranslateFormModal
          itemName="Ürün Tipi"
          setLanguageData={setLanguageData}
          isOpen={isOpenTranslateModal}
          setIsOpen={setIsOpenTranslateModal}
          isCreateMode={true}
        />
      </div>
      <ButtonComponent
        loading={isLoading}
        onClick={submitHandler}
        type="submit"
        text={"Ürün Tipini Kaydet"}
        classname="bg-green-500 text-white w-[50%] mt-5 m-auto"
      />
    </div>
  );
}
