import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import useFabricCategoryStore from "@/zustand/fetchOperations/component/fabricCategory";
import useGlobalStore from "@/zustand/globalStore";
import { useState } from "react";

export default function KartelaKategorisiFormu() {
  const createFabricCategory = useFabricCategoryStore(
    (state) => state.createFabricCategory
  );

  const isLoading = useGlobalStore((state) => state.isLoading);

  const [errorStates, setErrorStates] = useState({
    kartelaKategorisiAdiInputError: false,
  });
  const [kartelaKategorisiAdi, setKartelaKategorisiAdi] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();

    if (kartelaKategorisiAdi.trim() == "") {
      setErrorStates((oldStates) => {
        return {
          ...oldStates,
          kartelaKategorisiAdiInputError: "Kategori İsmi Boş Bırakılamaz",
        };
      });
    } else {
      const categoryToPost = {
        name: kartelaKategorisiAdi,
      };

      createFabricCategory(categoryToPost);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <InputComponent
          errortext={errorStates.kartelaKategorisiAdiInputError}
          labeltext="Kartela Kategorisi Adı"
          placeholdertext="Kategori.."
          value={kartelaKategorisiAdi}
          setvalue={setKartelaKategorisiAdi}
        />
      </div>
      <ButtonComponent
        loading={isLoading}
        onClick={submitHandler}
        type="submit"
        text={"Kategoriyi Kaydet"}
        classname="bg-green-500 text-white w-[50%] mt-5 m-auto"
      />
    </div>
  );
}
