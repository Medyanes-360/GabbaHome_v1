"use client";
import InputComponent from "@/globalElements/input";
import LanguageButton from "@/globalElements/languageButton";
import { useEffect, useRef, useState } from "react";

import ButtonComponent from "@/globalElements/button";

import { generateUniqueCode } from "@/functions/util/generateUniqueCode";
import useCollectionStore from "@/zustand/fetchOperations/collection/collection";
import useCollectionTypeStore from "@/zustand/fetchOperations/collection/collectionType";
import CreateCollectionFormProductList from "./productList";
import useGlobalStore from "@/zustand/globalStore";
import TranslateFormModal from "@/globalElements/translateForm";
import ImageInputComponent from "@/globalElements/imageInput";
import SelectComponent from "@/globalElements/select";

export default function CreateCollectionForm() {
  const createCollection = useCollectionStore(
    (state) => state.createCollection
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

  const [collectionNameInputValue, setCollectionNameInputValue] = useState("");
  const [collectionDescriptionInputValue, setCollectionDescriptionInputValue] =
    useState("");

  const [collectionTypeId, setCollectionTypeId] = useState("");
  const [languageData, setLanguageData] = useState({});
  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [imageValue, setImageValue] = useState("");

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
      const collectionToPost = {
        name: collectionNameInputValue,
        description: collectionDescriptionInputValue,
        collectionTypeId: collectionTypeId,
        image: imageValue ? imageValue : "",
        productIDs: selectedProducts.map((product) => product.id),
        collectionCode: generateUniqueCode(
          collectionNameInputValue.slice(0, 3),
          // koleksiyon adını bul ve ilk iki harfini kod oluşturma fonksiyonuna gönder:
          collectionTypes
            .find((type) => type.id === collectionTypeId)
            ?.name.slice(0, 3)
        ),
        // form'dan aldığımız language datası:
        ...languageData,
      };

      createCollection(collectionToPost);
    }
  };
  const isFetched = useRef(true);
  useEffect(() => {
    if (!collectionTypes || collectionTypes.length == 0) {
      if (!isFetched.current) {
        return;
      }
      isFetched.current = true;
      getAllCollectionTypes();
    }
  }, []);
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full gap-2">
        <div className="w-full">
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
          <SelectComponent
            labeltext="Koleksiyon Tipi"
            placeholdertext="Koleksiyon Tipi Seçiniz.."
            setvalue={setCollectionTypeId}
            value={collectionTypeId}
            data={collectionTypes.map((elem) => {
              return {
                value: elem.id,
                name: elem.name,
              };
            })}
          />
          <div className="flex items-center">
            <p>Çeviri Ekleyin:</p>
            <LanguageButton
              onClick={() => {
                setIsOpenTranslateModal(true);
              }}
            />{" "}
          </div>
          <TranslateFormModal
            itemName="Koleksiyon"
            setLanguageData={setLanguageData}
            isOpen={isOpenTranslateModal}
            setIsOpen={setIsOpenTranslateModal}
            isCreateMode={true}
          />
        </div>

        <div>
          <ImageInputComponent
            labeltext="Koleksiyon resmi yüklemek için tıklayın"
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
        text={"Koleksiyonu Kaydet"}
        classname="bg-green-500 text-white w-[50%] mt-5 m-auto"
      />
      <p className="mt-5 mb-3 text-xl">
        Kaydetmeden önce koleksiyoun ürünlerini seçebilirsiniz. :{" "}
      </p>
      <CreateCollectionFormProductList
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
      />
    </div>
  );
}
