"use client";
import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import LanguageButton from "@/globalElements/languageButton";
import SelectComponent from "@/globalElements/select";
import { useEffect, useState } from "react";
import useFabricStore from "@/zustand/fetchOperations/component/fabric";
import useFabricCategoryStore from "@/zustand/fetchOperations/component/fabricCategory";
import useGlobalStore from "@/zustand/globalStore";
import ImageInputComponent from "@/globalElements/imageInput";
import TranslateFormModal from "@/globalElements/translateForm";

export default function KartelaFormu() {
  const createFabric = useFabricStore((state) => state.createFabric);
  const fabricCategories = useFabricCategoryStore(
    (state) => state.fabricCategories
  );
  const getAllFabricCategories = useFabricCategoryStore(
    (state) => state.getAllFabricCategories
  );

  const isLoading = useGlobalStore((state) => state.isLoading);

  const [errorStates, setErrorStates] = useState({
    kartelaAdiInputError: null,
    kartelaAciklamasiInputError: null,
    kartelaKategorisiInputError: null,
  });

  const [kartelaAdiInputValue, setKartelaAdiInputValue] = useState("");
  const [kartelaAciklamasiInputValue, setKartelaAciklamasiInputValue] =
    useState("");
  const [imageValue, setImageValue] = useState("");

  const [kategori, setKategori] = useState(null);

  const [isKartelaKategorisiFormu, setIsKartelaKategorisiFormu] =
    useState(false);

  const [languageData, setLanguageData] = useState({});
  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (kartelaAdiInputValue.trim() == "") {
      setErrorStates((oldStates) => {
        return {
          ...oldStates,
          kartelaAdiInputError: "Kartelaya Verilecek İsim Boş Bırakılamaz",
        };
      });
    } else {
      const fabricToPost = {
        name: kartelaAdiInputValue,
        description: kartelaAciklamasiInputValue,
        image: imageValue,
        fabricCategoryId: kategori,

        // form'dan aldığımız language da,tası:
        ...languageData,
      };

      createFabric(fabricToPost);
    }
  };

  useEffect(() => {
    if (!fabricCategories || fabricCategories.length === 0) {
      getAllFabricCategories();
    }
  });

  return (
    <>
      {!isKartelaKategorisiFormu && (
        <div className="flex  flex-col">
          <div className="flex gap-2">
            <div className="w-full flex flex-col gap-3">
              {" "}
              <InputComponent
                errortext={errorStates.kartelaAdiInputError}
                labeltext="Kartelaya Verilecek İsim"
                placeholdertext="Kartela Adı"
                value={kartelaAdiInputValue}
                setvalue={setKartelaAdiInputValue}
              />
              <InputComponent
                errortext={errorStates.kartelaAciklamasiInputError}
                labeltext="Kartela Açıklaması"
                placeholdertext="Kartela Açıklaması"
                value={kartelaAciklamasiInputValue}
                setvalue={setKartelaAciklamasiInputValue}
              />{" "}
            </div>
            <div className="w-full flex flex-col items-start">
              <SelectComponent
                labeltext="Kartela Kategorisi"
                placeholdertext="Kategori Seçiniz.."
                setvalue={setKategori}
                value={kategori}
                data={fabricCategories.map((elem) => {
                  return {
                    value: elem.id,
                    name: elem.name,
                  };
                })}
              />
              <div className="flex items-center">
                {" "}
                <p>Çeviri Ekleyin:</p>
                <LanguageButton
                  onClick={() => setIsOpenTranslateModal(true)}
                />{" "}
                <TranslateFormModal
                  itemName="Kartela"
                  setLanguageData={setLanguageData}
                  isOpen={isOpenTranslateModal}
                  setIsOpen={setIsOpenTranslateModal}
                  isCreateMode={true}
                />
              </div>
            </div>
            <div>
              <ImageInputComponent
                labeltext="Kartela Resmi Yüklemek için Tıklayın"
                image={imageValue}
                setImage={setImageValue}
              />
            </div>
          </div>
          <ButtonComponent
            loading={isLoading}
            onClick={submitHandler}
            type="submit"
            text={"Kartelayı Kaydet"}
            classname="bg-green-500 text-white w-[50%] mt-5 m-auto"
          />
        </div>
      )}
    </>
  );
}
