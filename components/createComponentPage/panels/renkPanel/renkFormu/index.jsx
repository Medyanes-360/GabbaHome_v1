import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import LanguageButton from "@/globalElements/languageButton";
import { useEffect, useRef, useState } from "react";
import useColorStore from "@/zustand/fetchOperations/component/color";
import useGlobalStore from "@/zustand/globalStore";
import TranslateFormModal from "@/globalElements/translateForm";
export default function RenkFormu() {
  const createColor = useColorStore((state) => state.createColor);
  const colorRef = useRef(null);

  const isLoading = useGlobalStore((state) => state.isLoading);

  const [errorStates, setErrorStates] = useState({
    renkAdiInputError: null,
    renkAciklamasiInputError: null,
    renkKoduInputError: null,
  });
  const [renkAdiInputValue, setRenkAdiInputValue] = useState("");
  const [renkAciklamasiInputValue, setRenkAciklamasiInputValue] = useState("");
  const [renkKoduInputValue, setRenkKoduInputValue] = useState("");
  const [languageData, setLanguageData] = useState({});
  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);

  useEffect(() => {
    if (colorRef.current) {
      colorRef.current.style.backgroundColor = `${renkKoduInputValue}`;
    }
  }, [renkKoduInputValue]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (renkAdiInputValue.trim() == "") {
      setErrorStates((oldStates) => {
        return {
          ...oldStates,
          renkAdiInputError: "İsim Bilgisi Boş Bırakılamaz",
        };
      });
    } else {
      const colorToPost = {
        name: renkAdiInputValue,
        description: renkAciklamasiInputValue,
        colorCode: renkKoduInputValue,

        // form'dan aldığımız language datası:
        ...languageData,
      };

      createColor(colorToPost);
    }
  };

  return (
    <>
      <div className="flex w-full">
        <div className="flex w-full flex-col">
          <div className="flex  gap-2 w-full">
            <InputComponent
              error={true}
              errortext={errorStates.renkAdiInputError}
              labeltext="Rengi Belirtecek İsim"
              placeholdertext="Renk Adı"
              value={renkAdiInputValue}
              setvalue={setRenkAdiInputValue}
            />
            <InputComponent
              errortext={errorStates.renkAciklamasiInputError}
              labeltext="Renk Açıklaması"
              placeholdertext="Renk için açıklama.."
              value={renkAciklamasiInputValue}
              setvalue={setRenkAciklamasiInputValue}
            />
            <InputComponent
              errortext={errorStates.renkKoduInputError}
              labeltext="Renk Kodu"
              placeholdertext="Renk Kodu"
              value={renkKoduInputValue}
              setvalue={setRenkKoduInputValue}
            />
            <LanguageButton onClick={() => setIsOpenTranslateModal(true)} />{" "}
            <TranslateFormModal
              itemName="Renk"
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
            text={"Rengi Kaydet"}
            classname="bg-green-500 text-white w-[50%] mt-5 m-auto"
          />
        </div>

        <div className="border-2 p-1 rounded-xl !w-32 !h-32 m-2 ">
          <div ref={colorRef} className="!h-full !w-full  rounded-lg "></div>
        </div>
      </div>
    </>
  );
}
