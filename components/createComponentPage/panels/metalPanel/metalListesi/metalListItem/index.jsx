import ButtonComponent from "@/globalElements/button";
import ImageModal from "@/globalElements/imageModal";
import InputComponent from "@/globalElements/input";
import LanguageButton from "@/globalElements/languageButton";
import TranslateFormModal from "@/globalElements/translateForm";
import useMetalStore from "@/zustand/fetchOperations/component/metal";
import { useState } from "react";

export default function MetalListItem({ data }) {
  const deleteMetal = useMetalStore((state) => state.deleteMetal);
  const updateMetal = useMetalStore((state) => state.updateMetal);

  // -start- editMode:
  const [isEditMode, setIsEditMode] = useState(false);

  const [metalAdiInputValue, setMetalAdiInputValue] = useState(data.name);
  const [metalAciklamasiInputValue, setMetalAciklamasiInputValue] = useState(
    data.description
  );
  const [languageData, setLanguageData] = useState({
    name_tr: data.name_tr,
    name_uk: data.name_uk,
    name_en: data.name_en,
    description_tr: data.description_tr,
    description_uk: data.description_uk,
    description_en: data.description_en,
  });

  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);

  const updateHandler = () => {
    const metalToUpdate = {
      id: data.id,
      name: metalAdiInputValue,
      description: metalAciklamasiInputValue,
      ...languageData,
    };

    // eğer data hiç değiştirilmemişse güncelleme:
    if (!(JSON.stringify(data) === JSON.stringify(metalToUpdate))) {
      updateMetal(metalToUpdate);
      setIsEditMode(false);
    }
  };

  //  -end-
  // -start- delete
  const deleteHandler = () => {
    if (confirm("Metali silmek istediğinize emin misiniz?")) {
      deleteMetal(data.id);
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
        {isEditMode && (
          <InputComponent
            placeholdertext="Metal Adı"
            value={metalAdiInputValue}
            setvalue={setMetalAdiInputValue}
          />
        )}
        {!isEditMode && <span>{data.name}</span>}
      </th>
      <td className="border-r px-6  py-2">
        {!isEditMode && <span>{data.description}</span>}
        {isEditMode && (
          <InputComponent
            placeholdertext="Metal Açıklaması"
            value={metalAciklamasiInputValue}
            setvalue={setMetalAciklamasiInputValue}
          />
        )}
      </td>
      <td className="border-r  px-6 py-2">
        {data.image != "" && <ImageModal images={[data.image]} />}
        {data.image == "" && "-"}
      </td>

      <td className="border-r px-6 py-2">
        <LanguageButton
          onClick={() => {
            setIsOpenTranslateModal(true);
          }}
          edit={isEditMode}
          width={48}
          height={48}
        />
        <TranslateFormModal
          itemName="Metal"
          setLanguageData={setLanguageData}
          isOpen={isOpenTranslateModal}
          setIsOpen={setIsOpenTranslateModal}
          languageData={languageData}
          isViewMode={!isEditMode}
          isEditMode={isEditMode}
        />
      </td>
      <td className="">
        <div className="flex items-center justify-center gap-2">
          {isEditMode && (
            <>
              {" "}
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

const ErrorSvg = () => {
  return (
    <svg
      fill="red"
      height="24px"
      width="24px"
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
