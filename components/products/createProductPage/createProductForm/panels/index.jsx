import useCreateProductFormStore from "@/zustand/componentOperations/createProductForm";
import ButtonComponent from "@/globalElements/button";
import useProductStore from "@/zustand/fetchOperations/product/product";
import { generateUniqueCode } from "@/functions/util/generateUniqueCode";
import useGlobalStore from "@/zustand/globalStore";
import CreateProductFormProductInformationPanel from "./productInformationPanel";
import CreateProductFormComponentsPanel from "./componentsPanel";
import CreateProductFormImagePanel from "./imagePanel";

export default function CreateProductFormPanels({ activePanel }) {
  const productStore = useCreateProductFormStore();
  const createProduct = useProductStore((state) => state.createProduct);

  const isLoading = useGlobalStore((state) => state.isLoading);

  const submitHandler = (e) => {
    e.preventDefault();

    const imagesToSet = [];
    productStore.productImages.forEach((image) => {
      if (image.data) {
        imagesToSet.push(image.data);
      }
    });
    const extrasToSet = [];
    productStore.productExtras.forEach((extra) => {
      const { tempId, ...extraWithoutTempId } = extra;
      extrasToSet.push(extraWithoutTempId);
    });

    if (productStore.productNameInputValue.trim() == "") {
      productStore.setErrorStates({
        ...productStore.errorStates,
        productNameInputError: "İsim Bilgisi Boş Bırakılamaz",
      });
    } else {
      const productToPost = {
        productCode: generateUniqueCode(
          productStore.productNameInputValue.slice(0, 3),
          productStore.category.slice(0, 3)
        ),
        name: productStore.productNameInputValue,
        productTypeId: productStore.productTypeId,
        description: productStore.productDescriptionInputValue,
        category: productStore.category,
        ...productStore.languageData,
        price: productStore.priceInputValue,

        colors: productStore.productColors,
        extras: extrasToSet,
        measurements: productStore.productMeasurements,
        images: imagesToSet,
        metals: productStore.productMetals,
        fabrics: productStore.productFabrics,
      };

      createProduct(productToPost);
    }
  };
  return (
    <div className="flex-col w-full">
      <div className="flex w-full justify-start mb-2">
        <ButtonComponent
          loading={activePanel == 3 && isLoading}
          onClick={submitHandler}
          disabled={activePanel != 3 && true}
          text="Yeni Ürünü Kaydet"
          classname="bg-green-500 px-4 py-2  rounded-md text-white "
        />
      </div>
      <div className="p-6 h-full bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        {activePanel == 1 && <CreateProductFormProductInformationPanel />}
        {activePanel == 2 && <CreateProductFormComponentsPanel />}
        {activePanel == 3 && <CreateProductFormImagePanel />}
      </div>
    </div>
  );
}
