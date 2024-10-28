import ButtonComponent from "@/globalElements/button";
import UpdateExpenseModal from "../expenseModal/updateExpenseModal";
import { useState } from "react";
import useExpenseStore from "@/zustand/fetchOperations/expense";

export default function ExpensesListItem({ activeColIDs, data }) {
  const deleteExpense = useExpenseStore((state) => state.deleteExpense);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // veriyi silme:
  const deleteHandler = () => {
    deleteExpense(data.id);
  };

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      {activeColIDs.includes(1) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          <span className="truncate">
            {" "}
            {new Date(data.paymentDate).toLocaleDateString() +
              " " +
              new Date(data.paymentDate).toLocaleTimeString()}
          </span>
        </td>
      )}
      {activeColIDs.includes(2) && (
        <td
          scope="row"
          class=" px-6 py-4 !max-w-[250px]   break-words   truncate"
        >
          {data.store.name}
        </td>
      )}
      {activeColIDs.includes(3) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">{data.paidTo}</td>
      )}
      {activeColIDs.includes(4) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words    ">
          {data.paidTo_en}
        </td>
      )}
      {activeColIDs.includes(5) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.paidTo_uk}
        </td>
      )}
      {activeColIDs.includes(6) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.paidTo_tr}
        </td>
      )}

      {activeColIDs.includes(7) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.paymentType}
        </td>
      )}
      {activeColIDs.includes(8) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.paymentName}
        </td>
      )}
      {activeColIDs.includes(9) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words   ">
          {data.amount.amount + " " + data.amount.currency}
        </td>
      )}
      {activeColIDs.includes(10) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.description}
        </td>
      )}
      {activeColIDs.includes(11) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.description_tr}
        </td>
      )}
      {activeColIDs.includes(12) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.description_en}
        </td>
      )}
      {activeColIDs.includes(13) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.description_uk}
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
      <UpdateExpenseModal
        data={data}
        isOpen={isUpdateModalOpen}
        setIsOpen={setIsUpdateModalOpen}
      />
    </tr>
  );
}
