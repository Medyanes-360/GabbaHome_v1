import InputComponent from "@/globalElements/input";
import LanguageButton from "@/globalElements/languageButton";
import PriceInputComponent from "@/globalElements/priceInput";
import SelectComponent from "@/globalElements/select";
import TranslateFormModal from "@/globalElements/translateForm";
import useCreateProductFormStore from "@/zustand/componentOperations/createProductForm";
import useProductTypeStore from "@/zustand/fetchOperations/product/productType";
import { useEffect, useState } from "react";

export default function CreateProductFormProductInformationPanel({}) {
  const productTypes = useProductTypeStore((state) => state.productTypes);
  const setLanguageData = useCreateProductFormStore(
    (state) => state.setLanguageData
  );
  const getAllProductTypes = useProductTypeStore(
    (state) => state.getAllProductTypes
  );

  const categories = [
    { value: "Mobilya", name: "Mobilya", selected: true },
    { value: "Elektronik", name: "Elektronik", disabled: true },
    { value: "Giyim", name: "Giyim", disabled: true },
    { value: "Aksesuar", name: "Aksesuar", disabled: true },
  ];

  const errorStates = useCreateProductFormStore((state) => state.errorStates);
  const setErrorStates = useCreateProductFormStore(
    (state) => state.setErrorStates
  );

  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);
  const category = useCreateProductFormStore((state) => state.category);
  const setCategory = useCreateProductFormStore((state) => state.setCategory);
  const productNameInputValue = useCreateProductFormStore(
    (state) => state.productNameInputValue
  );
  const setProductNameInputValue = useCreateProductFormStore(
    (state) => state.setProductNameInputValue
  );
  const productDescriptionInputValue = useCreateProductFormStore(
    (state) => state.productDescriptionInputValue
  );
  const setProductDescriptionInputValue = useCreateProductFormStore(
    (state) => state.setProductDescriptionInputValue
  );
  const productTypeId = useCreateProductFormStore(
    (state) => state.productTypeId
  );
  const setProductTypeId = useCreateProductFormStore(
    (state) => state.setProductTypeId
  );
  const priceInputValue = useCreateProductFormStore(
    (state) => state.priceInputValue
  );
  const setPriceInputValue = useCreateProductFormStore(
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
          isCreateMode={true}
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
