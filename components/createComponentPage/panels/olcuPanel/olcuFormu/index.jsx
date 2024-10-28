"use client";
import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import SelectComponent from "@/globalElements/select";
import SwitchComponent from "@/globalElements/switch";
import useMeasurementStore from "@/zustand/fetchOperations/component/measurement";
import useGlobalStore from "@/zustand/globalStore";
import { useState } from "react";

export default function OlcuFormu() {
  const createMeasurement = useMeasurementStore(
    (state) => state.createMeasurement
  );
  const isLoading = useGlobalStore((state) => state.isLoading);
  const [errorStates, setErrorStates] = useState({
    olcuAdiInputError: null,
    enInputError: null,
    boyInputError: null,
    genislikInputError: null,
    ozelOlcuInputError: null,
  });
  const [olcuAdiInputValue, setOlcuAdiInputValue] = useState("");
  const [enInputValue, setEnInputValue] = useState("");
  const [boyInputValue, setBoyInputValue] = useState("");
  const [genislikInputValue, setGenislikInputValue] = useState("");
  const [ozelOlcuInputValue, setOzelOlcuInputValue] = useState("");

  const [olcuBrimi, setOlcuBirimi] = useState("");

  const [isSpecialValue, setIsSpecialValue] = useState(false);

  const specialValueSubmitHandler = (e) => {
    e.preventDefault();
    const olcuToPost = {
      name: olcuAdiInputValue,
      specialValue: ozelOlcuInputValue,
      specialValueDefined: true,
    };

    createMeasurement(olcuToPost);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (olcuAdiInputValue.trim() == "") {
      setErrorStates((oldStates) => {
        return {
          ...oldStates,
          olcuAdiInputError: "İsim Bilgisi Boş Bırakılamaz",
        };
      });
    } else {
      const olcuToPost = {
        name: olcuAdiInputValue,
        en: enInputValue,
        boy: boyInputValue,
        genislik: genislikInputValue,
        unit: olcuBrimi,
      };

      createMeasurement(olcuToPost);
    }
  };

  const measurementUnits = [
    { value: "m", name: "m" },
    { value: "cm", selected: true, name: "cm" },
    { value: "mm", name: "mm" },
  ];
  return (
    <>
      <div className="flex items-center justify-center border-b-2 border-black pb-2 mb-2">
        <SwitchComponent
          labeltext="Özel Ölçü"
          onchange={(e) => {
            setIsSpecialValue(e.currentTarget.checked);
          }}
        />
      </div>
      {!isSpecialValue && (
        <div className="flex  flex-col">
          <div className="flex gap-2">
            <InputComponent
              errortext={errorStates.olcuAdiInputError}
              labeltext="Ölçüye Verilecek İsim"
              placeholdertext="Ölçü Adı"
              value={olcuAdiInputValue}
              setvalue={setOlcuAdiInputValue}
            />
            <InputComponent
              type="number"
              errortext={errorStates.enInputError}
              labeltext="En"
              placeholdertext="En"
              value={enInputValue}
              setvalue={setEnInputValue}
            />
            <InputComponent
              type="number"
              errortext={errorStates.boyInputError}
              labeltext="Boy"
              placeholdertext="Boy"
              value={boyInputValue}
              setvalue={setBoyInputValue}
            />
            <InputComponent
              type="number"
              errortext={errorStates.genislikInputError}
              labeltext="Genişlik"
              placeholdertext="Genişlik"
              value={genislikInputValue}
              setvalue={setGenislikInputValue}
            />
            <SelectComponent
              labeltext="Ölçü Birimi"
              placeholdertext="Ölçü birimi"
              setvalue={setOlcuBirimi}
              value={olcuBrimi}
              data={measurementUnits}
            />
          </div>
          <ButtonComponent
            loading={isLoading}
            onClick={submitHandler}
            type="submit"
            text={"Ölçüyü Kaydet"}
            classname="bg-green-500 text-white w-[50%] mt-5 m-auto"
          />
        </div>
      )}
      {isSpecialValue && (
        <div className="flex flex-col">
          <div className="flex gap-2">
            <InputComponent
              errortext={errorStates.olcuAdiInputError}
              labeltext="Ölçüye Verilecek İsim"
              placeholdertext="Ölçü Adı"
              value={olcuAdiInputValue}
              setvalue={setOlcuAdiInputValue}
            />
            <InputComponent
              errortext={errorStates.ozelOlcuInputError}
              labeltext="Özel Ölçü"
              placeholdertext="Özel Ölçüyü giriniz. Örnek: 'Soldan 150cm'"
              value={ozelOlcuInputValue}
              setvalue={setOzelOlcuInputValue}
            />
          </div>
          <ButtonComponent
            onClick={specialValueSubmitHandler}
            loading={isLoading}
            type="submit"
            text={"Özel Ölçüyü Kaydet"}
            classname="bg-green-500 text-white w-[50%] mt-5 m-auto"
          />
        </div>
      )}
    </>
  );
}
