import ButtonComponent from "@/globalElements/button";
import ImageModal from "@/globalElements/imageModal";
import InputComponent from "@/globalElements/input";
import LanguageButton from "@/globalElements/languageButton";
import TranslateFormModal from "@/globalElements/translateForm";
import useFabricStore from "@/zustand/fetchOperations/component/fabric";
import useGlobalStore from "@/zustand/globalStore";
import { useState } from "react";

export default function FabricListItem({ data }) {
  const deleteFabric = useFabricStore((state) => state.deleteFabric);
  const updateFabric = useFabricStore((state) => state.updateFabric);

  const isLoading = useGlobalStore((state) => state.isLoading);
  // -start- editmode:
  const [isEditMode, setIsEditMode] = useState(false);
  const [kartelaAdiInputValue, setKartelaAdiInputValue] = useState(data.name);
  const [kartelaAciklamasiInputValue, setKartelaAciklamasiInputValue] =
    useState(data.description);

  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);

  const [languageData, setLanguageData] = useState({
    name_tr: data.name_tr,
    name_uk: data.name_uk,
    name_en: data.name_en,
    description_tr: data.description_tr,
    description_uk: data.description_uk,
    description_en: data.description_en,
  });

  const updateHandler = () => {
    const fabricToUpdate = {
      id: data.id,
      name: kartelaAdiInputValue,
      description: kartelaAciklamasiInputValue,
      ...languageData,
    };

    // eğer data hiç değiştirilmemişse güncelleme:
    if (!(JSON.stringify(data) === JSON.stringify(fabricToUpdate))) {
      updateFabric(fabricToUpdate);
      setIsEditMode(false);
    }
  };

  // -end-
  // -start- delete
  const deleteHandler = () => {
    if (confirm("Kartelayı silmek istediğinize emin misiniz?")) {
      deleteFabric(data.id);
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
            placeholdertext="Kartela Adı"
            value={kartelaAdiInputValue}
            setvalue={setKartelaAdiInputValue}
          />
        )}
      </th>
      <td className="border-r px-6  py-2">
        {!isEditMode && <span>{data.description}</span>}
        {isEditMode && (
          <InputComponent
            placeholdertext="Kartela Adı"
            value={kartelaAciklamasiInputValue}
            setvalue={setKartelaAciklamasiInputValue}
          />
        )}
      </td>
      <td className="border-r  px-6 py-2">
        {data.image != "" && <ImageModal images={[data.image]} />}
        {data.image == "" && "-"}
      </td>
      <td className="border-r px-6  py-2">{data.fabricCategory?.name}</td>

      <td className="border-r px-6 py-2">
        <LanguageButton
          onClick={() => {
            setIsOpenTranslateModal(true);
          }}
          width={48}
          height={48}
        />
        <TranslateFormModal
          itemName="Kartela"
          setLanguageData={setLanguageData}
          isOpen={isOpenTranslateModal}
          setIsOpen={setIsOpenTranslateModal}
          languageData={languageData}
          isEditMode={isEditMode}
          isViewMode={!isEditMode}
        />
      </td>
      <td className="">
        <div className="flex items-center justify-center gap-2">
          {isEditMode && (
            <>
              {" "}
              <ButtonComponent
                loading={isLoading}
                onClick={updateHandler}
                text="Güncelle"
                classname="bg-green-500    text-white"
              />{" "}
              <ButtonComponent
                onClick={() => {
                  setIsEditMode(false);
                }}
                text="İptal"
                classname=" bg-red-500 text-white"
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
                isLoading={isLoading}
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
