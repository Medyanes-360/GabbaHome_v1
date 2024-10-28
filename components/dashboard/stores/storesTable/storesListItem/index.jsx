import ButtonComponent from "@/globalElements/button";
import UpdateStoreModal from "../storeModal/updateStoreModal";
import { useState } from "react";
import useStoreStore from "@/zustand/fetchOperations/store";

export default function StoresListItem({ activeColIDs, data }) {
  const deleteStore = useStoreStore((state) => state.deleteStore);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // veriyi silme:
  const deleteHandler = () => {
    deleteStore(data.id);
  };

  //şirketi aktifleştirme:

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      {activeColIDs.includes(0) && (
        <td
          scope="row"
          class=" px-6 py-4 !max-w-[250px]   break-words   font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {data.name}
        </td>
      )}
      {activeColIDs.includes(1) && (
        <td
          scope="row"
          class=" px-6 py-4 !max-w-[250px]   break-words   font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {data.name_tr}
        </td>
      )}
      {activeColIDs.includes(2) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.name_en}
        </td>
      )}
      {activeColIDs.includes(3) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.name_uk}
        </td>
      )}
      {activeColIDs.includes(4) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.description}
        </td>
      )}
      {activeColIDs.includes(5) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.description_tr}
        </td>
      )}
      {activeColIDs.includes(6) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.description_en}
        </td>
      )}

      {activeColIDs.includes(7) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.description_uk}
        </td>
      )}
      {activeColIDs.includes(8) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.country}
        </td>
      )}
      {activeColIDs.includes(9) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">{data.state}</td>
      )}
      {activeColIDs.includes(10) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.maxDiscountRate}
        </td>
      )}
      {activeColIDs.includes(11) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.maxBonusRate}
        </td>
      )}
      {activeColIDs.includes(12) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">{data.tel_1}</td>
      )}
      {activeColIDs.includes(13) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">{data.tel_2}</td>
      )}
      {activeColIDs.includes(14) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">{data.fax}</td>
      )}
      {activeColIDs.includes(15) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.email_1}
        </td>
      )}
      {activeColIDs.includes(16) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.email_2}
        </td>
      )}
      {activeColIDs.includes(17) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.address}
        </td>
      )}
      {activeColIDs.includes(18) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.address_tr}
        </td>
      )}
      {activeColIDs.includes(19) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.address_en}
        </td>
      )}
      {activeColIDs.includes(20) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.address_uk}
        </td>
      )}
      {activeColIDs.includes(21) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_1}
        </td>
      )}
      {activeColIDs.includes(22) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_2}
        </td>
      )}
      {activeColIDs.includes(23) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_3}
        </td>
      )}

      <td class="  px-6 py-4 !max-w-[250px]   break-words   excel-ignore">
        <div className="flex  gap-2   items-center justify-center">
          <ButtonComponent
            onClick={() => setIsUpdateModalOpen(true)}
            text="Düzenle"
            classname="bg-blue-500 px-4 py-2 rounded-md text-white "
          />
          <ButtonComponent
            onClick={deleteHandler}
            text="Sil"
            classname="bg-red-500 px-4 py-2 rounded-md text-white "
          />
        </div>
      </td>
      <UpdateStoreModal
        data={data}
        isOpen={isUpdateModalOpen}
        setIsOpen={setIsUpdateModalOpen}
      />
    </tr>
  );
}

const cols = [
  {
    id: 0,
    columnName: "Mağaza İsmi",
    initialSelected: true,
  },
  {
    id: 1,
    columnName: "Mağaza İsmi Türkçe",
    initialSelected: false,
  },
  {
    id: 2,
    columnName: "Store Name English",
    initialSelected: false,
  },
  {
    id: 3,
    columnName: "Store Name Ukrainian",
    initialSelected: false,
  },
  {
    id: 4,
    columnName: "Mağaza Açıklaması",
    initialSelected: true,
  },
  {
    id: 5,
    columnName: "Mağaza Açıklaması Türkçe",
    initialSelected: false,
  },
  {
    id: 6,
    columnName: "Store Description English",
    initialSelected: true,
  },
  {
    id: 7,
    columnName: "Store Description Ukrainian",
    initialSelected: false,
  },
  {
    id: 8,
    columnName: "Ülke",
    initialSelected: true,
  },
  {
    id: 9,
    columnName: "Şehir",
    initialSelected: true,
  },
  {
    id: 10,
    columnName: "Maksimum İndirim Oranı",
    initialSelected: true,
  },
  {
    id: 11,
    columnName: "Maximum Bonus Oranı",
    initialSelected: true,
  },
  {
    id: 12,
    columnName: "Telefon 1",
    initialSelected: true,
  },
  {
    id: 13,
    columnName: "Telefon 2",
    initialSelected: true,
  },
  {
    id: 14,
    columnName: "Fax",
    initialSelected: true,
  },
  {
    id: 15,
    columnName: "Email 1",
    initialSelected: true,
  },
  {
    id: 16,
    columnName: "Email 2",
    initialSelected: true,
  },
  {
    id: 17,
    columnName: "Adres",
    initialSelected: true,
  },
  {
    id: 18,
    columnName: "Adres Türkçe",
    initialSelected: false,
  },
  {
    id: 19,
    columnName: "Address English",
    initialSelected: false,
  },
  {
    id: 20,
    columnName: "Address Ukrainian",
    initialSelected: false,
  },

  {
    id: 21,
    columnName: "Extra 1",
    initialSelected: true,
  },
  {
    id: 22,
    columnName: "Extra 2",
    initialSelected: true,
  },
  {
    id: 23,
    columnName: "Extra 3",
    initialSelected: true,
  },
];
