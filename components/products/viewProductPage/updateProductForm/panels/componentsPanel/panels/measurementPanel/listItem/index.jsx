import ButtonComponent from "@/globalElements/button";
import CheckboxComponent from "@/globalElements/checkbox";
import InputComponent from "@/globalElements/input";
import useUpdateProductFormStore from "@/zustand/componentOperations/updateProductForm";

import { useEffect, useState } from "react";

export default function UpdateProductFormMeasurementListItem({ data }) {
  const addProductMeasurement = useUpdateProductFormStore(
    (state) => state.addProductMeasurement
  );
  const removeProductMeasurement = useUpdateProductFormStore(
    (state) => state.removeProductMeasurement
  );
  const productMeasurements = useUpdateProductFormStore(
    (state) => state.productMeasurements
  );
  const [standardChecked, setStandardChecked] = useState(
    productMeasurements.find((elem) => elem.measurementId == data.id)
      ?.isStandard
  );
  const [plusChecked, setPlusChecked] = useState(
    productMeasurements.find((elem) => elem.measurementId == data.id)?.price > 0
  );
  const [minusChecked, setMinusChecked] = useState(
    productMeasurements.find((elem) => elem.measurementId == data.id)?.price < 0
  );
  const [priceInputValue, setPriceInputValue] = useState(
    productMeasurements.find((elem) => elem.measurementId == data.id)?.price
  );
  const [isAddedToList, setIsAddedToList] = useState(
    // eğer component listeye eklenmişse disabled yap:
    productMeasurements.find((elem) => elem.measurementId == data.id) !=
      undefined
  );

  // checkbox'ların handler'ı. seçilen index değerine göre işlemleri yap. seçilen checkbox hariç diğer checkboxların ve inputların değerlerini sıfırla:
  const checkHandler = (e, index) => {
    if (index == "standard") {
      setStandardChecked(e);
      setPlusChecked(false);
      setMinusChecked(false);
      setPriceInputValue("");
    } else if (index == "plus") {
      setPlusChecked(e);
      setStandardChecked(false);
      setMinusChecked(false);
      setPriceInputValue("");
    } else if (index == "minus") {
      setMinusChecked(e);
      setStandardChecked(false);
      setPlusChecked(false);
      setPriceInputValue("");
    }
  };

  // price inputlardaki fiyatların handler'ı, eğer gönderilen değer - inputundan geliyorsa ve 0 dan büyük değer verildiyse -1 ile çarp.
  const priceInputChangeHandler = (value, isMinus) => {
    if (isMinus && value > 0) {
      setPriceInputValue(value * -1);
    } else if (!isMinus && value < 0) {
      setPriceInputValue(value * -1);
    } else {
      setPriceInputValue(value);
    }
  };

  // store'daki productMeasurements içine bu componentı gönder:
  const handleAddProductMeasurement = () => {
    const measurementToAdd = {
      measurementId: data.id,
      isStandard: standardChecked,
      price: standardChecked ? 0 : parseInt(priceInputValue),
    };

    //örnek kontrol
    // standart seçilmemiş ve fiyat da verilmemişse:
    if (!standardChecked && (priceInputValue == 0 || priceInputValue == "")) {
      alert(
        "Fiyat boş bırakılamaz. Eğer fiyat belirtmeyecekseniz lütfen standart seçiniz."
      );
    } else {
      addProductMeasurement(measurementToAdd);
    }
  };

  // component'ı store'dan sil:
  const handleRemoveProductMeasurement = () => {
    removeProductMeasurement(data.id); // component'ı state'ten sil
    //inputları boşalt:
    setPlusChecked(false);
    setStandardChecked(false);
    setMinusChecked(false);
    setPriceInputValue("");
  };

  useEffect(() => {
    setIsAddedToList(
      // state'teki componentlar arasında bu component mevcut mu? eğer mevcutsa isAddedToList=true olur.
      productMeasurements.find((elem) => elem.measurementId == data.id) !=
        undefined
    );
  });

  return (
    <tr className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="border-r px-6 py-2  font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {!isAddedToList ? (
          <ButtonComponent
            disabled={!standardChecked && !plusChecked && !minusChecked}
            onClick={handleAddProductMeasurement}
            text="Ekle"
            classname="bg-green-500 px-4 py-2 rounded-md text-white "
          />
        ) : (
          <ButtonComponent
            onClick={handleRemoveProductMeasurement}
            text="Çıkar"
            classname="bg-red-500 px-4 py-2 rounded-md text-white "
          />
        )}
      </th>
      <th
        scope="row"
        className="border-r px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <CheckboxComponent
          disabled={isAddedToList}
          checked={standardChecked}
          setChecked={checkHandler}
          index="standard"
        />
      </th>
      <th
        scope="row"
        className="border-r px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="w-full flex gap-2 items-center justify-center">
          <CheckboxComponent
            disabled={isAddedToList}
            checked={plusChecked}
            setChecked={checkHandler}
            index="plus"
          />
          {plusChecked && (
            <InputComponent
              disabled={isAddedToList}
              type="number"
              placeholdertext="Fiyat"
              value={priceInputValue}
              setvalue={(value) => {
                priceInputChangeHandler(value, false);
              }}
              inputclassname={"w-24"}
            />
          )}
        </div>
      </th>
      <td className="border-r px-6  py-2">
        {" "}
        <div className="w-full flex gap-2 items-center justify-center">
          <CheckboxComponent
            // eğer component listeye eklenmişse disabled yap:
            disabled={isAddedToList}
            checked={minusChecked}
            setChecked={checkHandler}
            index="minus"
          />{" "}
          {minusChecked && (
            <InputComponent
              // eğer component listeye eklenmişse disabled yap:
              disabled={isAddedToList}
              type="number"
              placeholdertext="Fiyat"
              value={priceInputValue}
              setvalue={(value) => {
                priceInputChangeHandler(value, true);
              }}
              inputclassname={"!w-24"}
            />
          )}
        </div>
      </td>
      <td className="border-r px-6 py-2">{data.name}</td>
      <td className="border-r px-6 py-2">
        {data.specialValueDefined ? data.specialValue : "-"}
      </td>
      <td className="border-r px-6 py-2">
        {" "}
        {data.specialValueDefined ? "-" : data.en + " " + data.unit}
      </td>
      <td className="border-r px-6 py-2">
        {" "}
        {data.specialValueDefined ? "-" : data.boy + " " + data.unit}
      </td>
      <td className="border-r px-6 py-2">
        {" "}
        {data.specialValueDefined ? "-" : data.genislik + " " + data.unit}
      </td>
    </tr>
  );
}
