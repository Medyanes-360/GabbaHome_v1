import ButtonComponent from "@/globalElements/button";
import ImageModal from "@/globalElements/imageModal";
import LanguageButton from "@/globalElements/languageButton";
import TranslateFormModal from "@/globalElements/translateForm";
import useCollectionStore from "@/zustand/fetchOperations/collection/collection";
import Link from "next/link";
import { useState } from "react";

export default function CollectionListItem({ data }) {
  const deleteCollection = useCollectionStore(
    (state) => state.deleteCollection
  );

  const languageData = {
    name_tr: data.name_tr,
    name_uk: data.name_uk,
    name_en: data.name_en,
    description_tr: data.description_tr,
    description_uk: data.description_uk,
    description_en: data.description_en,
  };
  const [isOpenTranslateModal, setIsOpenTranslateModal] = useState(false);
  // -start- delete
  const deleteHandler = () => {
    if (confirm("Bu Koleksiyonu silmek istediğinize emin misiniz?")) {
      deleteCollection(data.id);
    }
  };
  // -end-
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className=" px-6 py-4 !max-w-[250px]   break-words   font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {new Date(data.updatedAt).toLocaleDateString() +
          " " +
          new Date(data.updatedAt).toLocaleTimeString()}
      </th>
      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">
        {data.collectionCode}
      </td>
      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">{data.name}</td>
      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">
        {data.collectionType?.name}
      </td>
      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">
        {data.description}
      </td>
      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">
        <ImageModal images={[data.image]} />
      </td>
      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">
        <LanguageButton
          onClick={() => {
            setIsOpenTranslateModal(true);
          }}
          width={48}
          height={48}
        />
        <TranslateFormModal
          itemName="Koleksiyon"
          isOpen={isOpenTranslateModal}
          setIsOpen={setIsOpenTranslateModal}
          languageData={languageData}
          isViewMode={true}
        />
      </td>

      <td className=" px-6 py-4 !max-w-[250px]   break-words  ">
        <div className="flex items-center justify-center gap-2">
          <Link target="_blank" href={`/collections/${data.id}`}>
            <ButtonComponent
              text="Görüntüle"
              classname="bg-blue-500    text-white"
            />
          </Link>
          <ButtonComponent
            onClick={deleteHandler}
            text="Sil"
            classname="bg-red-500    text-white"
          />
        </div>
      </td>
    </tr>
  );
}
