import ButtonComponent from "@/globalElements/button";
import UpdateEmployeeModal from "../employeeModal/updateEmployeeModal";
import { useState } from "react";
import useEmployeeStore from "@/zustand/fetchOperations/employee";

export default function EmployeesListItem({ activeColIDs, data, userRoles }) {
  const deleteEmployee = useEmployeeStore((state) => state.deleteEmployee);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // veriyi silme:
  const deleteHandler = () => {
    deleteEmployee(data.id);
  };

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      {activeColIDs.includes(1) && (
        <td scope="row" class=" px-6 py-4 !max-w-[250px]   break-words   ">
          {data.name}
        </td>
      )}
      {activeColIDs.includes(2) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.surname}
        </td>
      )}
      {activeColIDs.includes(3) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words excel-ignore ">
          {userRoles.find((roleItem) => roleItem.value == data.user.role).name}
        </td>
      )}
      {activeColIDs.includes(4) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.user.phoneNumber}
        </td>
      )}
      {activeColIDs.includes(5) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words excel-ignore ">
          {data.user.password}
        </td>
      )}
      {activeColIDs.includes(6) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.user.email}
        </td>
      )}
      {activeColIDs.includes(6) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.address}
        </td>
      )}
      {activeColIDs.includes(7) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">{data.salary}</td>
      )}
      {activeColIDs.includes(8) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">{data.bonus}</td>
      )}
      {activeColIDs.includes(9) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.maxDiscountRatePercent}%
        </td>
      )}
      {activeColIDs.includes(10) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.managerComment}
        </td>
      )}
      {activeColIDs.includes(11) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.managerComment_tr}
        </td>
      )}
      {activeColIDs.includes(12) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.managerComment_en}
        </td>
      )}
      {activeColIDs.includes(13) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.managerComment_uk}
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
      <UpdateEmployeeModal
        userRoles={userRoles}
        data={data}
        isOpen={isUpdateModalOpen}
        setIsOpen={setIsUpdateModalOpen}
      />
    </tr>
  );
}
