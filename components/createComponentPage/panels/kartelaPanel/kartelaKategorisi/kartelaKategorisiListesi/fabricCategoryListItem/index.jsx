import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import useFabricCategoryStore from "@/zustand/fetchOperations/component/fabricCategory";
import useGlobalStore from "@/zustand/globalStore";
import { useState } from "react";

export default function FabricCategoryListItem({ data }) {
  const isLoading = useGlobalStore((state) => state.isLoading);

  const deleteFabricCategory = useFabricCategoryStore(
    (state) => state.deleteFabricCategory
  );
  const updateFabricCategory = useFabricCategoryStore(
    (state) => state.updateFabricCategory
  );

  // -start- editMode:
  const [isEditMode, setIsEditMode] = useState(false);
  const [kartelaKategorisiAdi, setKartelaKategorisiAdi] = useState(data.name);

  const updateHandler = () => {
    const fabricCategoryToUpdate = {
      id: data.id,
      name: kartelaKategorisiAdi,
    };

    // eğer data hiç değiştirilmemişse güncelleme:
    if (!(JSON.stringify(data) === JSON.stringify(fabricCategoryToUpdate))) {
      updateFabricCategory(fabricCategoryToUpdate);
      setIsEditMode(false);
    }
  };

  // -end

  // -start- delete
  const deleteHandler = () => {
    if (confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) {
      deleteFabricCategory(data.id);
    }
  };
  // -end-

  return (
    <tr className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="border-r px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {new Date(data.updatedAt).toLocaleDateString() +
          " " +
          new Date(data.updatedAt).toLocaleTimeString()}
      </th>
      <th
        scope="row"
        className="border-r px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {!isEditMode && <span>{data.name}</span>}
        {isEditMode && (
          <InputComponent
            placeholdertext="Kategori.."
            value={kartelaKategorisiAdi}
            setvalue={setKartelaKategorisiAdi}
          />
        )}
      </th>

      <td className="">
        <div className="flex items-center justify-center gap-2">
          {isEditMode && (
            <>
              <ButtonComponent
                loading={isLoading}
                onClick={updateHandler}
                text="Güncelle"
                classname="bg-green-500    text-white"
              />
              <ButtonComponent
                onClick={() => {
                  setIsEditMode(false);
                }}
                text="İptal"
                classname="bg-red-500   text-white"
              />
            </>
          )}
          {!isEditMode && (
            <>
              {" "}
              <ButtonComponent
                onClick={() => {
                  setIsEditMode(true);
                }}
                text="Düzenle"
                classname="bg-blue-500    text-white"
              />
              <ButtonComponent
                loading={isLoading}
                onClick={deleteHandler}
                text="Sil"
                classname=" bg-red-500 text-white"
              />
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
