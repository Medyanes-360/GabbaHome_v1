import ButtonComponent from "@/globalElements/button";
import useProductStore from "@/zustand/fetchOperations/product/product";
import { generateUniqueCode } from "@/functions/util/generateUniqueCode";
import useGlobalStore from "@/zustand/globalStore";
import UpdateProductFormProductInformationPanel from "./productInformationPanel";
import UpdateProductFormComponentsPanel from "./componentsPanel";
import UpdateProductFormImagePanel from "./imagePanel";
import useUpdateProductFormStore from "@/zustand/componentOperations/updateProductForm";

export default function UpdateProductFormPanels({ activePanel }) {
  const productStore = useUpdateProductFormStore();
  const updateProduct = useProductStore((state) => state.updateProduct);

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

    const extractProductIdandId = (elem) => {
      const newElem = [];
      for (let item of elem) {
        const { productId, id, ...itemWithoutProductIdandId } = item;
        newElem.push(itemWithoutProductIdandId);
      }
      console.log(newElem);
      return newElem;
    };
    const productToUpdate = {
      id: productStore.id,
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

      colors: extractProductIdandId(productStore.productColors),
      extras: extractProductIdandId(extrasToSet),
      measurements: extractProductIdandId(productStore.productMeasurements),
      images: imagesToSet,
      metals: extractProductIdandId(productStore.productMetals),
      fabrics: extractProductIdandId(productStore.productFabrics),
    };

    updateProduct(productToUpdate);
  };
  return (
    <div className="flex-col w-full">
      <div className="flex w-full justify-start mb-2">
        <ButtonComponent
          loading={activePanel == 3 && isLoading}
          onClick={submitHandler}
          disabled={activePanel != 3 && true}
          text="Ürünü Güncelle"
          classname="bg-green-500 px-4 py-2  rounded-md text-white "
        />
      </div>
      <div className="p-6 h-full bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
        {activePanel == 1 && <UpdateProductFormProductInformationPanel />}
        {activePanel == 2 && <UpdateProductFormComponentsPanel />}
        {activePanel == 3 && <UpdateProductFormImagePanel />}
      </div>
    </div>
  );
}
