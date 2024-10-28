import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import LanguageButton from "@/globalElements/languageButton";
import { MotionDiv } from "@/globalElements/motion";
import TranslateFormModal from "@/globalElements/translateForm";
import useColorStore from "@/zustand/fetchOperations/component/color";
import { useEffect, useRef, useState } from "react";

export default function ColorListItem({ data }) {
  const deleteColor = useColorStore((state) => state.deleteColor);
  const updateColor = useColorStore((state) => state.updateColor);

  //-start- editMode:
  const [isEditMode, setIsEditMode] = useState(false);
  const [renkAdiInputValue, setRenkAdiInputValue] = useState(data.name);
  const [renkAciklamasiInputValue, setRenkAciklamasiInputValue] = useState(
    data.description
  );
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
    const colorToUpdate = {
      id: data.id,
      name: renkAdiInputValue,
      description: renkAciklamasiInputValue,
      ...languageData,
    };

    // eğer data hiç değiştirilmemişse güncelleme:
    if (!(JSON.stringify(data) === JSON.stringify(colorToUpdate))) {
      updateColor(colorToUpdate);
      setIsEditMode(false);
    }
  };
  // -end-

  // -start- delete
  const deleteHandler = () => {
    if (confirm("Rengi silmek istediğinize emin misiniz?")) {
      deleteColor(data.id);
    }
  };
  // -end-

  // -start- datanın rengini, kutucuğun backgroundu yapma:
  const colorRef = useRef(null);
  useEffect(() => {
    if (colorRef.current) {
      colorRef.current.style.backgroundColor = data.colorCode;
    }
  }, [colorRef]);
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
        {" "}
        {isEditMode && (
          <InputComponent
            placeholdertext="Renk Adı"
            value={renkAdiInputValue}
            setvalue={setRenkAdiInputValue}
          />
        )}
        {!isEditMode && <span>{data.name}</span>}
      </th>
      <td className="border-r px-6  py-2">
        {isEditMode && (
          <InputComponent
            placeholdertext="Renk Açıklaması"
            value={renkAciklamasiInputValue}
            setvalue={setRenkAciklamasiInputValue}
          />
        )}
        {!isEditMode && <span>{data.description}</span>}
      </td>
      <td className="border-r px-6 2">
        <div className="flex items-center  gap-4">
          <div className="relative  flex items-center justify-center ">
            <MotionDiv
              whileHover={{ scale: 2 }}
              transition={{ duration: 0.2 }}
              ref={colorRef}
              className="absolute z-[500] h-10 w-10 rounded-md bg-transparent"
            ></MotionDiv>{" "}
            <ErrorSvg />
          </div>
          <span className="">{data.colorCode}</span>
        </div>
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
          itemName="Renk"
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
