"use client";
import UpdateCollectionForm from "@/components/collections/viewCollectionPage/updateCollectionForm";
import Loader from "@/globalElements/loading";
import useCollectionStore from "@/zustand/fetchOperations/collection/collection";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewCollectionPageContainer() {
  const params = useParams();
  const collectionId = params.collectionId;

  const getCollectionData = useCollectionStore((state) => state.getCollection);
  const [collectionData, setCollectionData] = useState(null);
  const setCollection = async () => {
    const data = await getCollectionData(collectionId);
    setCollectionData(data);
  };
  useEffect(() => {
    setCollection();
  }, []);

  return (
    <>
      {collectionData && (
        <UpdateCollectionForm collectionData={collectionData} />
      )}
      {!collectionData && (
        <div className=" fixed top-0 left-0 bg-[rgba(0,0,0,.7)]  w-full h-full mt-5 flex items-center justify-center  ">
          <Loader page />
        </div>
      )}
    </>
  );
}
