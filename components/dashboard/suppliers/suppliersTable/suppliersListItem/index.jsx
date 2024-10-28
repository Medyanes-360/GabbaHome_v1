import ButtonComponent from "@/globalElements/button";
import UpdateSupplierModal from "../supplierModal/updateSupplierModal";
import { useState } from "react";
import useSupplierStore from "@/zustand/fetchOperations/supplier";

export default function SuppliersListItem({ activeColIDs, data }) {
  const deleteSupplier = useSupplierStore((state) => state.deleteSupplier);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // veriyi silme:
  const deleteHandler = () => {
    deleteSupplier(data.id);
  };

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      {activeColIDs.includes(1) && (
        <td
          scope="row"
          class=" px-6 py-4 !max-w-[250px]   break-words   font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {data.competentName_1}
        </td>
      )}
      {activeColIDs.includes(2) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.competentPhoneNumber_1}
        </td>
      )}
      {activeColIDs.includes(3) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.competentEmail_1}
        </td>
      )}
      {activeColIDs.includes(4) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.competentName_2}
        </td>
      )}
      {activeColIDs.includes(5) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.competentPhoneNumber_2}
        </td>
      )}
      {activeColIDs.includes(6) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.competentEmail_2}
        </td>
      )}
      {activeColIDs.includes(7) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.firmName}
        </td>
      )}
      {activeColIDs.includes(8) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.firmAddress}
        </td>
      )}
      {activeColIDs.includes(9) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.firmTaxNumber}
        </td>
      )}
      {activeColIDs.includes(10) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.firmPhoneNumber_1}
        </td>
      )}
      {activeColIDs.includes(11) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.firmPhoneNumber_2}
        </td>
      )}
      {activeColIDs.includes(12) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.firmEmail}
        </td>
      )}
      {activeColIDs.includes(13) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words excel-ignore ">
          {data.user.phoneNumber}
        </td>
      )}
      {activeColIDs.includes(14) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words excel-ignore ">
          {data.user.email}
        </td>
      )}
      {activeColIDs.includes(15) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words excel-ignore ">
          {data.user.password}
        </td>
      )}

      <td class="  px-6 py-4 !max-w-[250px]   break-words excel-ignore ">
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
      <UpdateSupplierModal
        data={data}
        isOpen={isUpdateModalOpen}
        setIsOpen={setIsUpdateModalOpen}
      />
    </tr>
  );
}
