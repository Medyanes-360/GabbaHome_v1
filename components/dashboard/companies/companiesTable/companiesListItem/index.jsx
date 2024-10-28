import ButtonComponent from "@/globalElements/button";
import UpdateCompanyModal from "../companyModal/updateCompanyModal";
import { useState } from "react";
import useCompanyStore from "@/zustand/fetchOperations/company";

export default function CompaniesListItem({ activeColIDs, data }) {
  const deleteCompany = useCompanyStore((state) => state.deleteCompany);
  const setActiveCompany = useCompanyStore((state) => state.setActiveCompany);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  // veriyi silme:
  const deleteHandler = () => {
    if (data.isActive) {
      alert(
        "Aktif Şirket silinemez. Başka bir şirketi aktifleyerek silme işlemini gerçekleştirebilirsiniz."
      );
    } else {
      deleteCompany(data.id);
    }
  };

  //şirketi aktifleştirme:
  const activateCompanyHandler = () => {
    setActiveCompany(data.id);
  };

  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      {activeColIDs.includes(1) && (
        <td
          scope="row"
          class=" excel-ignore px-6 py-4 !max-w-[250px]   break-words   font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {data.isActive ? (
            <span className="bg-green-500 text-white font-semibold rounded-2xl px-4 py-2">
              Aktif Şirket
            </span>
          ) : (
            <ButtonComponent
              onClick={activateCompanyHandler}
              text="Aktif Şirket Olarak Belirle"
              classname="bg-cyan-500 px-4 py-2 rounded-md text-white "
            />
          )}
        </td>
      )}
      {activeColIDs.includes(2) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">{data.name}</td>
      )}
      {activeColIDs.includes(3) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.kdvRatePercent}
        </td>
      )}
      {activeColIDs.includes(4) && (
        <td class=" px-6 py-4     !max-w-[250px]   break-words ">
          {data.competentName}askofxvcbkmlkmasfmdkvbcxbmlckmfsklazf
          amksfkmadlkmgakldgmkladmglk lkmasflkgdmaklghmalkg
        </td>
      )}
      {activeColIDs.includes(5) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">{data.tel_1}</td>
      )}
      {activeColIDs.includes(6) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">{data.tel_2}</td>
      )}
      {activeColIDs.includes(6) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">{data.fax}</td>
      )}
      {activeColIDs.includes(7) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.email_1}
        </td>
      )}
      {activeColIDs.includes(8) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.email_2}
        </td>
      )}
      {activeColIDs.includes(9) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.address}
        </td>
      )}
      {activeColIDs.includes(10) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.taxNumber}
        </td>
      )}
      {activeColIDs.includes(11) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.bankName}
        </td>
      )}
      {activeColIDs.includes(12) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.bankAccountNumber}
        </td>
      )}
      {activeColIDs.includes(13) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.bankMFO}
        </td>
      )}
      {activeColIDs.includes(14) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">{data.iban}</td>
      )}
      {activeColIDs.includes(15) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_1}
        </td>
      )}
      {activeColIDs.includes(16) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_2}
        </td>
      )}
      {activeColIDs.includes(17) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_3}
        </td>
      )}
      {activeColIDs.includes(18) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_1_tr}
        </td>
      )}
      {activeColIDs.includes(19) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_2_tr}
        </td>
      )}
      {activeColIDs.includes(20) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_3_tr}
        </td>
      )}
      {activeColIDs.includes(21) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_1_uk}
        </td>
      )}
      {activeColIDs.includes(22) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_2_uk}
        </td>
      )}
      {activeColIDs.includes(23) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_3_uk}
        </td>
      )}
      {activeColIDs.includes(24) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_1_en}
        </td>
      )}
      {activeColIDs.includes(25) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_2_en}
        </td>
      )}
      {activeColIDs.includes(26) && (
        <td class=" px-6 py-4 !max-w-[250px]   break-words  ">
          {data.extra_3_en}
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
      <UpdateCompanyModal
        data={data}
        isOpen={isUpdateModalOpen}
        setIsOpen={setIsUpdateModalOpen}
      />
    </tr>
  );
}
