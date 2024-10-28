"use client";
import UpdateProductForm from "@/components/products/viewProductPage/updateProductForm";
import Loader from "@/globalElements/loading";
import useUpdateProductFormStore from "@/zustand/componentOperations/updateProductForm";
import useProductStore from "@/zustand/fetchOperations/product/product";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewProductPageContainer() {
  const params = useParams();
  const productId = params.productId;

  const [isLoaded, setIsLoaded] = useState(false);
  const getProductData = useProductStore((state) => state.getProduct);
  const setProductData = useUpdateProductFormStore(
    (state) => state.setProductData
  );
  const setProduct = async () => {
    const data = await getProductData(productId);
    setProductData(data);
    setIsLoaded(true);
  };
  useEffect(() => {
    setProduct();
  }, []);

  return (
    <>
      {isLoaded && <UpdateProductForm />}
      {!isLoaded && (
        <div className=" fixed top-0 left-0 bg-[rgba(0,0,0,.7)]  w-full h-full mt-5 flex items-center justify-center  ">
          <Loader page />
        </div>
      )}
    </>
  );
}
