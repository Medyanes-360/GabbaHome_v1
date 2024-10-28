"use client";
import InputComponent from "@/globalElements/input";
import LanguageButton from "@/globalElements/languageButton";
import { useEffect, useState } from "react";

import ButtonComponent from "@/globalElements/button";

import SelectComponent from "@/globalElements/select";

import useCollectionStore from "@/zustand/fetchOperations/collection/collection";
import useCollectionTypeStore from "@/zustand/fetchOperations/collection/collectionType";

import UpdateCollectionFormProductList from "./productList";
import ImageInputComponent from "@/globalElements/imageInput";
import useGlobalStore from "@/zustand/globalStore";
import TranslateFormModal from "@/globalElements/translateForm";

export default function UpdateCollectionForm({ collectionData }) {
  const updateCollection = useCollectionStore(
    (state) => state.updateCollection
  );
  const collectionTypes = useCollectionTypeStore(
    (state) => state.collectionTypes
  );
  const getAllCollectionTypes = useCollectionTypeStore(
    (state) => state.getAllCollectionTypes
  );

  const isLoading = useGlobalStore((state) => state.isLoading);

  const [errorStates, setErrorStates] = useState({
    collectionNameInputError: null,
    collectionDescriptionInputError: null,
  });

  const [collectionNameInputValue, setCollectionNameInputValue] = useState(
    collectionData.name
  );
  const [collectionDescriptionInputValue, setCollectionDescriptionInputValue] =
    useState(collectionData.description);

  const [collectionTypeId, setCollectionTypeId] = useState(
    collectionData.collectionType ? collectionData.collectionType.id : ""
  );
  const [languageData, setLanguageData] = useState({
    name_tr: collectionData.name_tr,
    name_en: collectionData.name_en,
    name_uk: collectionData.name_uk,
    description_tr: collectionData.description_tr,
    description_en: collectionData.description_en,
    description_uk: collectionData.description_uk,
  });
  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(
    collectionData.products ? collectionData.products : []
  );
  const [imageValue, setImageValue] = useState(collectionData.image);

  const submitHandler = (e) => {
    e.preventDefault();

    if (collectionNameInputValue.trim() == "") {
      setErrorStates((oldStates) => {
        return {
          ...oldStates,
          collectionNameInputError: "İsim Bilgisi Boş Bırakılamaz",
        };
      });
    } else {
      const collectionToUpdate = {
        id: collectionData.id,
        name: collectionNameInputValue,
        description: collectionDescriptionInputValue,
        collectionTypeId: collectionTypeId,
        image: imageValue ? imageValue : "",
        productIDs: selectedProducts.map((product) => product.id),

        // form'dan aldığımız language datası:
        ...languageData,
      };

      updateCollection(collectionToUpdate);
    }
  };
  useEffect(() => {
    if (!collectionTypes || collectionTypes.length === 0) {
      getAllCollectionTypes();
    }
  });
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full gap-2">
        <div className="w-full">
          {" "}
          <InputComponent
            errortext={errorStates.collectionNameInputError}
            labeltext="Koleksiyon Tipine Verilecek İsim"
            placeholdertext="Örn. Oturma Grubu"
            value={collectionNameInputValue}
            setvalue={setCollectionNameInputValue}
          />
          <InputComponent
            errortext={errorStates.collectionDescriptionInputError}
            labeltext="Koleksiyon Tipi İçin Açıklama"
            placeholdertext="Örn. Oturma Grubu Açoıklaması"
            value={collectionDescriptionInputValue}
            setvalue={setCollectionDescriptionInputValue}
          />
        </div>
        <div className="w-full">
          {" "}
          <SelectComponent
            labeltext="Koleksiyon Tipi"
            placeholdertext="Koleksiyon Tipi Seçiniz.."
            setvalue={setCollectionTypeId}
            value={collectionTypeId}
            data={collectionTypes.map((elem) => {
              return {
                selected: collectionTypeId == elem.id,
                value: elem.id,
                name: elem.name,
              };
            })}
          />{" "}
          <div className="flex items-center">
            <p>Çeviri Ekleyin:</p>
            <LanguageButton
              onClick={() => {
                setIsOpenTranslateModal(true);
              }}
            />{" "}
            <TranslateFormModal
              itemName="Koleksiyon"
              setLanguageData={setLanguageData}
              isOpen={isOpenTranslateModal}
              setIsOpen={setIsOpenTranslateModal}
              languageData={languageData}
              isEditMode={true}
            />
          </div>
        </div>
        <div>
          <ImageInputComponent
            image={imageValue}
            setImage={setImageValue}
            width={200}
            height={200}
          />
        </div>
      </div>
      <ButtonComponent
        loading={isLoading}
        onClick={submitHandler}
        type="submit"
        text={"Koleksiyonu Güncelle"}
        classname="bg-green-500 text-white w-[50%] mt-5 m-auto"
      />
      <p className="mt-5 mb-3 text-xl">
        Koleksiyoun ürünlerini seçtikten sonra güncelleme tuşuna basarak
        güncelleyebilirsiniz. :{" "}
      </p>
      <UpdateCollectionFormProductList
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </div>
  );
}
