import { create } from "zustand";

// tüm stateler [state,setState] şeklinde ayarlanmıştır. yani örneğin [category,setCategory] ile aynen useState'te kullandığımız gibi.

const useUpdateProductFormStore = create((set) => ({
  id: null,
  productCode: null,
  errorStates: {
    productNameInputError: "",
    productDescriptionInputError: "",
    priceInputError: "",
  },
  languageData: {
    name_tr: "",
    name_en: "",
    name_uk: "",
    description_en: "",
    description_tr: "",
    description_uk: "",
  },
  category: "Mobilya",
  productNameInputValue: "",
  productDescriptionInputValue: "",
  productTypeId: null,
  priceInputValue: {
    currency: "USD",
    amount: 0,
  },
  productMeasurements: [],
  productMetals: [],
  productColors: [],
  productFabrics: [],
  productExtras: [],
  productImages: [],

  setProductData: (productToSet) =>
    set((state) => ({
      ...state,
      id: productToSet.id,
      productCode: productToSet.productCode,
      productNameInputValue: productToSet.name,
      productDescriptionInputValue: productToSet.description,
      category: productToSet.category,

      productTypeId: productToSet.productType?.id,
      languageData: {
        name_tr: productToSet.name_tr,
        name_en: productToSet.name_en,
        name_uk: productToSet.name_uk,
        description_en: productToSet.description_en,
        description_tr: productToSet.description_tr,
        description_uk: productToSet.description_uk,
      },
      priceInputValue: productToSet.price,

      productMeasurements: productToSet.measurements,
      productMetals: productToSet.metals,
      productColors: productToSet.colors,
      productFabrics: productToSet.fabrics,
      productExtras: productToSet.extras.map((elem) => {
        const { id, ...elemWithoutId } = elem;
        return { tempId: id, ...elemWithoutId };
      }),
      productImages: productToSet.images.map((elem, index) => {
        return { id: elem.id, data: elem.image };
      }),
    })),

  // setErrorStates örnek: setErrorStates(
  // { productNameInputError:"product name boş bırakılamaz" }
  //)
  setErrorStates: (errorState) =>
    set((state) => ({
      ...state,
      errorStates: { ...state.errorStates, ...errorState },
    })),
  // örnek: setCategory("Elektronik")
  setCategory: (category) => set((state) => ({ ...state, category: category })),
  setProductNameInputValue: (productName) =>
    set((state) => ({ ...state, productNameInputValue: productName })),
  setProductDescriptionInputValue: (productDescription) =>
    set((state) => ({
      ...state,
      productDescriptionInputValue: productDescription,
    })),

  setLanguageData: (languageData) =>
    set((state) => ({ ...state, languageData: languageData })),
  setProductTypeId: (productTypeId) =>
    set((state) => ({ ...state, productTypeId: productTypeId })),
  setPriceInputValue: (price) =>
    set((state) => ({ ...state, priceInputValue: price })),

  addProductMeasurement: (measurement) =>
    set((state) => ({
      ...state,
      productMeasurements: [...state.productMeasurements, measurement],
    })),
  removeProductMeasurement: (measurementId) =>
    set((state) => {
      return {
        ...state,
        productMeasurements: [
          ...state.productMeasurements.filter(
            (elem) => elem.measurementId != measurementId
          ),
        ],
      };
    }),

  addProductMetal: (metal) =>
    set((state) => ({
      ...state,
      productMetals: [...state.productMetals, metal],
    })),
  removeProductMetal: (metalId) =>
    set((state) => {
      return {
        ...state,
        productMetals: [
          ...state.productMetals.filter((elem) => elem.metalId != metalId),
        ],
      };
    }),

  addProductFabric: (fabric) =>
    set((state) => ({
      ...state,
      productFabrics: [...state.productFabrics, fabric],
    })),
  removeProductFabric: (fabricId) =>
    set((state) => {
      return {
        ...state,
        productFabrics: [
          ...state.productFabrics.filter((elem) => elem.fabricId != fabricId),
        ],
      };
    }),

  addProductColor: (color) =>
    set((state) => ({
      ...state,
      productColors: [...state.productColors, color],
    })),
  removeProductColor: (colorId) =>
    set((state) => {
      return {
        ...state,
        productColors: [
          ...state.productColors.filter((elem) => elem.colorId != colorId),
        ],
      };
    }),
  addProductExtra: (extra) =>
    set((state) => ({
      ...state,
      productExtras: [...state.productExtras, extra],
    })),
  removeProductExtra: (extraId) =>
    set((state) => {
      return {
        ...state,
        productExtras: [
          ...state.productExtras.filter((elem) => elem.tempId != extraId),
        ],
      };
    }),
  setProductImages: (images) =>
    set((state) => ({
      ...state,
      productImages: images,
    })),
}));

export default useUpdateProductFormStore;
