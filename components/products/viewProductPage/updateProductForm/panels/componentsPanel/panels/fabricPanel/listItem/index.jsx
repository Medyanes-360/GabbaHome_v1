import ButtonComponent from "@/globalElements/button";
import CheckboxComponent from "@/globalElements/checkbox";
import ImageModal from "@/globalElements/imageModal";
import InputComponent from "@/globalElements/input";
import LanguageButton from "@/globalElements/languageButton";
import TranslateFormModal from "@/globalElements/translateForm";
import useUpdateProductFormStore from "@/zustand/componentOperations/updateProductForm";

import { useEffect, useState } from "react";

export default function UpdateProductFormFabricListItem({ data }) {
  const addProductFabric = useUpdateProductFormStore(
    (state) => state.addProductFabric
  );
  const removeProductFabric = useUpdateProductFormStore(
    (state) => state.removeProductFabric
  );
  const productFabrics = useUpdateProductFormStore(
    (state) => state.productFabrics
  );
  const [standardChecked, setStandardChecked] = useState(
    productFabrics.find((elem) => elem.fabricId == data.id)?.isStandard
  );
  const [plusChecked, setPlusChecked] = useState(
    productFabrics.find((elem) => elem.fabricId == data.id)?.price > 0
  );
  const [minusChecked, setMinusChecked] = useState(
    productFabrics.find((elem) => elem.fabricId == data.id)?.price < 0
  );
  const [priceInputValue, setPriceInputValue] = useState(
    productFabrics.find((elem) => elem.fabricId == data.id)?.price
  );
  const [isAddedToList, setIsAddedToList] = useState(
    // eğer component listeye eklenmişse disabled yap:
    productFabrics.find((elem) => elem.fabricId == data.id) != undefined
  );

  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);
  const languageData = {
    name_tr: data.name_tr,
    name_uk: data.name_uk,
    name_en: data.name_en,
    description_tr: data.description_tr,
    description_uk: data.description_uk,
    description_en: data.description_en,
  };

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
  // store'daki productFabrics içine bu componentı gönder:
  const handleAddProductFabric = () => {
    const fabricToAdd = {
      fabricId: data.id,
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
      addProductFabric(fabricToAdd);
    }
  };
  // component'ı store'dan sil:
  const handleRemoveProductFabric = () => {
    removeProductFabric(data.id); // component'ı state'ten sil
    //inputları boşalt:
    setPlusChecked(false);
    setStandardChecked(false);
    setMinusChecked(false);
    setPriceInputValue("");
  };
  useEffect(() => {
    setIsAddedToList(
      // state'teki componentlar arasında bu component mevcut mu? eğer mevcutsa isAddedToList=true olur.
      productFabrics.find((elem) => elem.fabricId == data.id) != undefined
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
            onClick={handleAddProductFabric}
            text="Ekle"
            classname="bg-green-500 px-4 py-2 rounded-md text-white "
          />
        ) : (
          <ButtonComponent
            onClick={handleRemoveProductFabric}
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
      <td className="border-r px-6 py-2"> {data.name}</td>
      <td className="border-r px-6 py-2">
        {" "}
        {data.image != "" && <ImageModal images={[data.image]} />}
        {data.image == "" && "-"}
      </td>
      <td className="border-r px-6 py-2">{data.fabricCategory?.name}</td>
      <td className="border-r px-6 py-2">
        <LanguageButton
          onClick={() => {
            setIsOpenTranslateModal(true);
          }}
        />{" "}
        <TranslateFormModal
          itemName="Kartela"
          isOpen={isOpenTranslateModal}
          setIsOpen={setIsOpenTranslateModal}
          languageData={languageData}
          isViewMode={true}
        />
      </td>
    </tr>
  );
}
