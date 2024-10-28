import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import useMeasurementStore from "@/zustand/fetchOperations/component/measurement";
import { useState } from "react";

export default function MeasurementListItem({ data }) {
  const deleteMeasurement = useMeasurementStore(
    (state) => state.deleteMeasurement
  );
  const updateMeasurement = useMeasurementStore(
    (state) => state.updateMeasurement
  );

  // -start- editMode:
  const [isEditMode, setIsEditMode] = useState(false);

  const [olcuAdiInputValue, setOlcuAdiInputValue] = useState(data.name);
  const [enInputValue, setEnInputValue] = useState(data.en);
  const [boyInputValue, setBoyInputValue] = useState(data.boy);
  const [genislikInputValue, setGenislikInputValue] = useState(data.genislik);
  const [ozelOlcuInputValue, setOzelOlcuInputValue] = useState(
    data.specialValue
  );
  const updateHandler = () => {
    const measurementToUpdate = {
      id: data.id,
      name: olcuAdiInputValue,
      en: enInputValue,
      boy: boyInputValue,
      genislik: genislikInputValue,
      specialValue: ozelOlcuInputValue,
    };

    // eğer data hiç değiştirilmemişse güncelleme:
    if (!(JSON.stringify(data) === JSON.stringify(measurementToUpdate))) {
      updateMeasurement(measurementToUpdate);
      setIsEditMode(false);
    }
  };

  // -end-

  // -start- delete
  const deleteHandler = () => {
    if (confirm("Ölçüyü silmek istediğinize emin misiniz?")) {
      deleteMeasurement(data.id);
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
            value={olcuAdiInputValue}
            setvalue={setOlcuAdiInputValue}
          />
        )}
        {!isEditMode && <span>{data.name}</span>}
      </th>
      <td className="border-r px-6  py-2">
        {isEditMode && data.specialValueDefined ? (
          <InputComponent
            value={ozelOlcuInputValue}
            setvalue={setOzelOlcuInputValue}
          />
        ) : (
          <span>{data.specialValueDefined ? data.specialValue : "-"}</span>
        )}
      </td>
      <td className="border-r px-6 py-2">
        {isEditMode && !data.specialValueDefined ? (
          <InputComponent value={enInputValue} setvalue={setEnInputValue} />
        ) : (
          <span>
            {data.specialValueDefined ? "-" : data.en + " " + data.unit}
          </span>
        )}
      </td>
      <td className="border-r px-6 py-2">
        {isEditMode && !data.specialValueDefined ? (
          <InputComponent value={boyInputValue} setvalue={setBoyInputValue} />
        ) : (
          <span>
            {data.specialValueDefined ? "-" : data.boy + " " + data.unit}
          </span>
        )}
      </td>
      <td className="border-r px-6 py-2">
        {isEditMode && !data.specialValueDefined ? (
          <InputComponent
            value={genislikInputValue}
            setvalue={setGenislikInputValue}
          />
        ) : (
          <span>
            {data.specialValueDefined ? "-" : data.genislik + " " + data.unit}
          </span>
        )}
      </td>
      <td className="  ">
        <div className="flex items-center justify-center gap-2">
          {isEditMode && (
            <>
              <ButtonComponent
                onClick={updateHandler}
                text="Güncelle"
                classname="bg-green-500  text-white"
              />
              <ButtonComponent
                onClick={() => {
                  setIsEditMode(false);
                }}
                text="İptal"
                classname="bg-red-500  text-white"
              />
            </>
          )}
          {!isEditMode && (
            <>
              {" "}
              <ButtonComponent
                onClick={(e) => {
                  setIsEditMode(true);
                }}
                text="Düzenle"
                classname="bg-blue-500  text-white"
              />
              <ButtonComponent
                onClick={deleteHandler}
                text="Sil"
                classname="bg-red-500 text-white"
              />
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
