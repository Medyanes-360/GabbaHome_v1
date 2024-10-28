import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import ModalComponent from "@/globalElements/modal";
import { useState } from "react";
export default function TranslateFormModal({
  itemName = "Nesne",
  isOpen,
  setIsOpen,
  setLanguageData,
  isEditMode = false,
  isCreateMode = false,
  isViewMode = false,
  languageData,
}) {
  const [name_en, setname_en] = useState(
    isCreateMode ? "" : languageData.name_en
  );
  const [description_en, setdescription_en] = useState(
    isCreateMode ? "" : languageData.description_en
  );
  const [name_uk, setname_uk] = useState(
    isCreateMode ? "" : languageData.name_uk
  );
  const [description_uk, setdescription_uk] = useState(
    isCreateMode ? "" : languageData.description_uk
  );
  const [name_tr, setname_tr] = useState(
    isCreateMode ? "" : languageData.name_tr
  );
  const [description_tr, setdescription_tr] = useState(
    isCreateMode ? "" : languageData.description_tr
  );

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name_tr: name_tr,
      name_uk: name_uk,
      name_en: name_en,
      description_tr: description_tr,
      description_uk: description_uk,
      description_en: description_en,
    };
    setLanguageData(data);
    setIsOpen(false);
  };

  return (
    <ModalComponent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={`Dil Çevirisi ${isEditMode ? "Düzenle" : ""} ${
        isCreateMode ? "Ekle" : ""
      }`}
    >
      <div className="overflow-y-scroll h-full">
        <div className=" pb-2  flex flex-col gap-2 mt-2 border-b-2">
          <p className="text-xl">Türkçe</p>
          <InputComponent
            disabled={isViewMode}
            labeltext={`${itemName} Adı`}
            placeholdertext={`${itemName} Adı`}
            value={name_tr}
            setvalue={setname_tr}
          />
          <InputComponent
            disabled={isViewMode}
            labeltext={`${itemName} Açıklaması`}
            placeholdertext={`${itemName} Açıklaması`}
            value={description_tr}
            setvalue={setdescription_tr}
          />
        </div>
        <div className=" pb-2 flex flex-col gap-2 mt-2 border-b-2">
          <p className="text-xl">Ukrainian</p>
          <InputComponent
            disabled={isViewMode}
            labeltext={`${itemName} Adı`}
            placeholdertext={`${itemName} Adı`}
            value={name_uk}
            setvalue={setname_uk}
          />
          <InputComponent
            disabled={isViewMode}
            labeltext={`${itemName} Açıklaması`}
            placeholdertext={`${itemName} Açıklaması`}
            value={description_uk}
            setvalue={setdescription_uk}
          />
        </div>
        <div className=" pb-2 flex flex-col gap-2 mt-2 border-b-2">
          <p className="text-xl">English</p>
          <InputComponent
            disabled={isViewMode}
            labeltext={`${itemName} Adı`}
            placeholdertext={`${itemName} Adı`}
            value={name_en}
            setvalue={setname_en}
          />
          <InputComponent
            disabled={isViewMode}
            labeltext={`${itemName} Açıklaması`}
            placeholdertext={`${itemName} Açıklaması`}
            value={description_en}
            setvalue={setdescription_en}
          />
        </div>
        {isEditMode && (
          <small>
            Güncellemeleri Kaydetmek için bu pencereyi kapattıktan sonra
            'Güncelle' butonuna basmayı unutmayın.{" "}
          </small>
        )}
        {isCreateMode && (
          <small>
            Güncellemeleri Kaydetmek için bu pencereyi kapattıktan sonra
            'Kaydet' butonuna basmayı unutmayın.{" "}
          </small>
        )}
        {!isViewMode && (
          <ButtonComponent
            onClick={submitHandler}
            type="submit"
            text={"Çevirileri Kaydet"}
            classname="bg-green-500 w-full text-white   m-auto"
          />
        )}
      </div>
    </ModalComponent>
  );
}
