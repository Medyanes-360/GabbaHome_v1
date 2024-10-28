import ButtonComponent from "@/globalElements/button";
import CheckboxComponent from "@/globalElements/checkbox";
import InputComponent from "@/globalElements/input";
import useCreateProductFormStore from "@/zustand/componentOperations/createProductForm";
import { useEffect, useState } from "react";

export default function CreateProductFormExtraListItem({ data }) {
  const addProductExtra = useCreateProductFormStore(
    (state) => state.addProductExtra
  );
  const removeProductExtra = useCreateProductFormStore(
    (state) => state.removeProductExtra
  );
  const productExtras = useCreateProductFormStore(
    (state) => state.productExtras
  );

  const [standardChecked, setStandardChecked] = useState(data.isStandard);
  const [plusChecked, setPlusChecked] = useState(data.price > 0);
  const [minusChecked, setMinusChecked] = useState(data.price < 0);
  const [priceInputValue, setPriceInputValue] = useState(data.price);
  const [descriptionInputValue, setDescriptionInputValue] = useState(
    data.description
  );
  const [isAddedToList, setIsAddedToList] = useState(
    productExtras.find((elem) => elem.tempId == data.tempId) != undefined
  );
  // eğer component listeye eklenmişse disabled yap:

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
  const priceInputChangeHandler = (value, isMinus) => {
    if (isMinus && value > 0) {
      setPriceInputValue(value * -1);
    } else if (!isMinus && value < 0) {
      setPriceInputValue(value * -1);
    } else {
      setPriceInputValue(value);
    }
  };

  const handleAddProductExtra = () => {
    const extraToAdd = {
      tempId: Date.now(),
      description: descriptionInputValue,
      isStandard: standardChecked,
      price: standardChecked ? 0 : parseInt(priceInputValue),
    };
    if (!standardChecked && (priceInputValue == 0 || priceInputValue == "")) {
      alert(
        "Fiyat boş bırakılamaz. Eğer fiyat belirtmeyecekseniz lütfen standart seçiniz."
      );
    } else {
      addProductExtra(extraToAdd);
    }
  };

  const handleRemoveProductExtra = () => {
    removeProductExtra(data.tempId);
    setPlusChecked(false);
    setStandardChecked(false);
    setMinusChecked(false);
    setPriceInputValue("");
  };

  useEffect(() => {
    setIsAddedToList(
      // state'teki componentlar arasında bu component mevcut mu? eğer mevcutsa isAddedToList=true olur.
      productExtras.find((elem) => elem.tempId == data.tempId) != undefined
    );
    setPlusChecked(data.price > 0);
    setDescriptionInputValue(data.description);
    setMinusChecked(data.price < 0);
    setPriceInputValue(data.price);
    setStandardChecked(data.isStandard);
  }, [data, productExtras]);
  return (
    <tr className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="border-r px-6 py-2  font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {!isAddedToList ? (
          <ButtonComponent
            disabled={!standardChecked && !plusChecked && !minusChecked}
            onClick={handleAddProductExtra}
            text="Ekle"
            classname="bg-green-500 px-4 py-2 rounded-md text-white "
          />
        ) : (
          <ButtonComponent
            onClick={handleRemoveProductExtra}
            text="Çıkar"
            classname="bg-red-500 px-4 py-2 rounded-md text-white "
          />
        )}
      </th>{" "}
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
        <div className="w-full flex gap-2 items-center justify-center">
          <CheckboxComponent
            disabled={isAddedToList}
            checked={minusChecked}
            setChecked={checkHandler}
            index="minus"
          />{" "}
          {minusChecked && (
            <InputComponent
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
      <td className="border-r px-6 py-2">
        {(minusChecked || plusChecked || standardChecked) && (
          <InputComponent
            disabled={isAddedToList}
            placeholdertext="Extra Bilgisi.."
            value={descriptionInputValue}
            setvalue={setDescriptionInputValue}
          />
        )}
      </td>
    </tr>
  );
}
