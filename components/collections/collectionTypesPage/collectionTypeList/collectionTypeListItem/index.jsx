"use client";
import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import LanguageButton from "@/globalElements/languageButton";
import useCollectionTypeStore from "@/zustand/fetchOperations/collection/collectionType";
import { useState } from "react";

export default function CollectionTypeListItem({ data }) {
  const deleteCollectionType = useCollectionTypeStore(
    (state) => state.deleteCollectionType
  );
  const updateCollectionType = useCollectionTypeStore(
    (state) => state.updateCollectionType
  );

  //-start- editMode:
  const [isEditMode, setIsEditMode] = useState(false);

  const [collectionTypeNameInputValue, setCollectionTypeNameInputValue] =
    useState(data.name);
  const [
    collectionTypeDescriptionInputValue,
    setCollectionTypeDescriptionInputValue,
  ] = useState(data.description);

  const updateHandler = () => {
    const collectionTypeToUpdate = {
      id: data.id,
      name: collectionTypeNameInputValue,
      description: collectionTypeDescriptionInputValue,
    };

    // eğer data hiç değiştirilmemişse güncelleme:
    if (!(JSON.stringify(data) === JSON.stringify(collectionTypeToUpdate))) {
      updateCollectionType(collectionTypeToUpdate);
      setIsEditMode(false);
    }
  };
  // -end-

  // -start- delete
  const deleteHandler = () => {
    if (confirm("Koleksiyon Tipini silmek istediğinize emin misiniz?")) {
      deleteCollectionType(data.id);
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
            value={collectionTypeNameInputValue}
            setvalue={setCollectionTypeNameInputValue}
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
            value={collectionTypeDescriptionInputValue}
            setvalue={setCollectionTypeDescriptionInputValue}
          />
        )}
      </th>
      <th
        scope="row"
        className="border-r px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <LanguageButton />
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
