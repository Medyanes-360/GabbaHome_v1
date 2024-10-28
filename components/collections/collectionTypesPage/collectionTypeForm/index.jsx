"use client";
import InputComponent from "@/globalElements/input";
import LanguageButton from "@/globalElements/languageButton";
import { useState } from "react";
import ButtonComponent from "@/globalElements/button";
import useCollectionTypeStore from "@/zustand/fetchOperations/collection/collectionType";
import useGlobalStore from "@/zustand/globalStore";
import TranslateFormModal from "@/globalElements/translateForm";

export default function CollectionTypeForm() {
  const createCollectionType = useCollectionTypeStore(
    (state) => state.createCollectionType
  );

  const isLoading = useGlobalStore((state) => state.isLoading);

  const [errorStates, setErrorStates] = useState({
    collectionTypeNameInputError: null,
    collectionTypeDescriptionInputError: null,
  });

  const [collectionTypeNameInputValue, setCollectionTypeNameInputValue] =
    useState("");
  const [
    collectionTypeDescriptionInputValue,
    setCollectionTypeDescriptionInputValue,
  ] = useState("");

  const [languageData, setLanguageData] = useState({});
  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    if (collectionTypeNameInputValue.trim() === "") {
      setErrorStates((oldStates) => {
        return {
          ...oldStates,
          collectionTypeNameInputError: "İsim Bilgisi Boş Bırakılamaz",
        };
      });
    } else {
      const collectionTypeToPost = {
        name: collectionTypeNameInputValue,
        description: collectionTypeDescriptionInputValue,

        // form'dan aldığımız language datası:
        ...languageData,
      };

      createCollectionType(collectionTypeToPost);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full gap-2">
        <InputComponent
          errortext={errorStates.collectionTypeNameInputError}
          labeltext="Koleksiyon Tipine Verilecek İsim"
          placeholdertext="Örn. Oturma Grubu"
          value={collectionTypeNameInputValue}
          setvalue={setCollectionTypeNameInputValue}
        />
        <InputComponent
          errortext={errorStates.collectionTypeDescriptionInputError}
          labeltext="Koleksiyon Tipi İçin Açıklama"
          placeholdertext="Örn. Oturma Grubu Açoıklaması"
          value={collectionTypeDescriptionInputValue}
          setvalue={setCollectionTypeDescriptionInputValue}
        />
        <LanguageButton
          onClick={() => {
            setIsOpenTranslateModal(true);
          }}
        />
        <TranslateFormModal
          itemName="Koleksiyon Tipi"
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
        text={"Koleksiyon Tipini Kaydet"}
        classname="bg-green-500 text-white w-[50%] mt-5 m-auto"
      />
    </div>
  );
}
