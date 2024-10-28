import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import { useState } from "react";
import LanguageButton from "@/globalElements/languageButton";
import useMetalStore from "@/zustand/fetchOperations/component/metal";
import useGlobalStore from "@/zustand/globalStore";
import ImageInputComponent from "@/globalElements/imageInput";
import TranslateFormModal from "@/globalElements/translateForm";

export default function MetalFormu() {
  const createMetal = useMetalStore((state) => state.createMetal);

  const [errorStates, setErrorStates] = useState({
    metalAdiInputError: null,
    metalAciklamasiInputError: null,
  });

  const isLoading = useGlobalStore((state) => state.isLoading);

  const [metalAdiInputValue, setMetalAdiInputValue] = useState("");
  const [metalAciklamasiInputValue, setMetalAciklamasiInputValue] =
    useState("");

  const [languageData, setLanguageData] = useState({});
  const [imageValue, setImageValue] = useState("");
  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (metalAdiInputValue.trim() == "") {
      setErrorStates((oldStates) => {
        return {
          ...oldStates,
          metalAdiInputError: "İsim Bilgisi Boş Bırakılamaz",
        };
      });
    } else {
      const metalToPost = {
        name: metalAdiInputValue,
        description: metalAciklamasiInputValue,
        image: imageValue,

        // form'dan aldığımız language datası:
        ...languageData,
      };
      createMetal(metalToPost);
    }
  };

  return (
    <>
      <div className="flex flex-col ">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col w-full gap-3">
            <InputComponent
              errortext={errorStates.metalAdiInputError}
              labeltext="Metal Adı"
              placeholdertext="Metal Adı"
              value={metalAdiInputValue}
              setvalue={setMetalAdiInputValue}
            />
            <InputComponent
              errortext={errorStates.metalAciklamasiInputError}
              labeltext="Metal Açıklaması"
              placeholdertext="Metal Açıklaması"
              value={metalAciklamasiInputValue}
              setvalue={setMetalAciklamasiInputValue}
            />{" "}
          </div>
          <div className="w-[50%] justify-center flex items-center">
            <p>Çeviri Ekleyin:</p>
            <LanguageButton onClick={() => setIsOpenTranslateModal(true)} />
            <TranslateFormModal
              itemName="Metal"
              setLanguageData={setLanguageData}
              isOpen={isOpenTranslateModal}
              setIsOpen={setIsOpenTranslateModal}
              isCreateMode={true}
            />
          </div>
          <div className="w-fit flex items-center justify-center ">
            {" "}
            <ImageInputComponent
              labeltext="Metal Resmi Yüklemek için Tıklayın"
              image={imageValue}
              setImage={setImageValue}
            />
          </div>
        </div>
        <ButtonComponent
          loading={isLoading}
          onClick={submitHandler}
          type="submit"
          text={"Metali Kaydet"}
          classname="bg-green-500 text-white w-[50%] mt-5 m-auto"
        />
      </div>
    </>
  );
}
