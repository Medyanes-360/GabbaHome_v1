import InputComponent from "@/globalElements/input";
import LanguageButton from "@/globalElements/languageButton";
import SelectComponent from "@/globalElements/select";

import useProductTypeStore from "@/zustand/fetchOperations/product/productType";
import { useEffect, useState } from "react";
import useUpdateProductFormStore from "@/zustand/componentOperations/updateProductForm";
import TranslateFormModal from "@/globalElements/translateForm";
import PriceInputComponent from "@/globalElements/priceInput";

export default function UpdateProductFormProductInformationPanel({}) {
  const productTypes = useProductTypeStore((state) => state.productTypes);

  const getAllProductTypes = useProductTypeStore(
    (state) => state.getAllProductTypes
  );

  const categories = [
    { value: "Mobilya", name: "Mobilya", selected: true },
    { value: "Elektronik", name: "Elektronik", disabled: true },
    { value: "Giyim", name: "Giyim", disabled: true },
    { value: "Aksesuar", name: "Aksesuar", disabled: true },
  ];

  const errorStates = useUpdateProductFormStore((state) => state.errorStates);
  const setErrorStates = useUpdateProductFormStore(
    (state) => state.setErrorStates
  );

  const languageData = useUpdateProductFormStore((state) => state.languageData);
  const setLanguageData = useUpdateProductFormStore(
    (state) => state.setLanguageData
  );

  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);
  const category = useUpdateProductFormStore((state) => state.category);
  const setCategory = useUpdateProductFormStore((state) => state.setCategory);
  const productNameInputValue = useUpdateProductFormStore(
    (state) => state.productNameInputValue
  );
  const setProductNameInputValue = useUpdateProductFormStore(
    (state) => state.setProductNameInputValue
  );
  const productDescriptionInputValue = useUpdateProductFormStore(
    (state) => state.productDescriptionInputValue
  );
  const setProductDescriptionInputValue = useUpdateProductFormStore(
    (state) => state.setProductDescriptionInputValue
  );
  const productTypeId = useUpdateProductFormStore(
    (state) => state.productTypeId
  );
  const setProductTypeId = useUpdateProductFormStore(
    (state) => state.setProductTypeId
  );
  const priceInputValue = useUpdateProductFormStore(
    (state) => state.priceInputValue
  );
  const setPriceInputValue = useUpdateProductFormStore(
    (state) => state.setPriceInputValue
  );

  useEffect(() => {
    //eğer halihazırda data yoksa fetchle:
    if (!productTypes || productTypes.length < 1) {
      getAllProductTypes();
    }
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2 items-center">
        <SelectComponent
          labeltext="Ürün Kategorisi"
          placeholdertext="Ürün Kategorisini Seçiniz.."
          setvalue={setCategory}
          value={category}
          data={categories}
        />{" "}
        <SelectComponent
          labeltext="Ürün Tipi"
          placeholdertext="Ürün Tipi Seçiniz.."
          setvalue={setProductTypeId}
          value={productTypeId}
          data={productTypes.map((elem) => {
            return {
              selected: productTypeId == elem.id,
              value: elem.id,
              name: elem.name,
            };
          })}
        />
        <LanguageButton onClick={() => setIsOpenTranslateModal(true)} />
        <TranslateFormModal
          itemName="Ürün"
          setLanguageData={setLanguageData}
          isOpen={isOpenTranslateModal}
          setIsOpen={setIsOpenTranslateModal}
          languageData={languageData}
          isEditMode={true}
        />
      </div>
      <div className="flex gap-2">
        <InputComponent
          errortext={errorStates.productNameInputError}
          labeltext="Ürüne Verilecek İsim"
          placeholdertext="Ürün  Adı"
          value={productNameInputValue}
          setvalue={setProductNameInputValue}
        />
        <InputComponent
          errortext={errorStates.productDescriptionInputError}
          labeltext="Ürün Açıklaması"
          placeholdertext="Ürün Açıklaması"
          value={productDescriptionInputValue}
          setvalue={setProductDescriptionInputValue}
        />{" "}
        <PriceInputComponent
          errortext={errorStates.priceInputError}
          labeltext="Ürün Fiyatı"
          placeholdertext="Fiyat"
          value={priceInputValue}
          setvalue={setPriceInputValue}
        />
      </div>
    </div>
  );
}
