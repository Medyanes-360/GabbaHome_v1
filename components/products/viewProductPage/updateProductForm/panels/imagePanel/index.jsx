"use client";
import ImageInputComponent from "@/globalElements/imageInput";
import useUpdateProductFormStore from "@/zustand/componentOperations/updateProductForm";

import Image from "next/image";

export default function UpdateProductFormImagePanel() {
  const productImages = useUpdateProductFormStore(
    (state) => state.productImages
  );
  const setProductImages = useUpdateProductFormStore(
    (state) => state.setProductImages
  );

  const setImage = (index, imageData) => {
    const newImages = [];
    productImages.forEach((elem) => {
      let newElem = { id: elem.id, data: elem.data };

      if (elem.id == index) {
        newElem["data"] = imageData;
      }

      newImages.push(newElem);
    });

    setProductImages(newImages);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
      {productImages.map((elem, index) => {
        return (
          <ImageInputComponent
            key={index}
            image={elem.data}
            setImage={setImage}
            imageIndex={elem.id}
            width={200}
            height={200}
          />
        );
      })}
      <div className="flex items-center justify-center w-[200px] h-[200px] bg-transparent rounded-xl">
        <button
          onClick={() => {
            setProductImages([
              ...productImages,
              { id: productImages.length, data: null },
            ]);
          }}
        >
          <Image
            src="/assets/icons/plusIcon.svg"
            alt=""
            width={150}
            height={150}
          />
        </button>
      </div>
    </div>
  );
}
