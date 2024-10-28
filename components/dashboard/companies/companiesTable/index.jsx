"use client";
import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import MultipleSelectComponent from "@/globalElements/multipleSelect";
import { useEffect, useRef, useState } from "react";
import CompaniesListItem from "./companiesListItem";
import AddCompanyModal from "./companyModal/addCompanyModal";
import useCompanyStore from "@/zustand/fetchOperations/company";
import ExcelDownloadButtonComponent from "@/globalElements/excelDownloadButton";
import { filterData } from "@/functions/util/dataFilter";

export default function DashboardCompaniesTable() {
  const data = useCompanyStore((state) => state.companies);
  const getAllCompanies = useCompanyStore((state) => state.getAllCompanies);

  const [activeColIDs, setActiveColIDs] = useState([
    ...cols.filter((col) => col.initialSelected).map((col) => col.id),
  ]);

  const [filterInputValue, setFilterInputValue] = useState("");
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const isFetched = useRef(true);
  useEffect(() => {
    if (!data || data.length == 0) {
      if (!isFetched.current) {
        return;
      }
      isFetched.current = true;
      getAllCompanies();
    }
  }, []);

  const filteredData = filterData(data, filterInputValue);

  return (
    <>
      {/* arama */}
      <div className=" mb-5 flex    rounded-xl  justify-between items-center">
        <div className=" px-5 py-2 flex gap-2 items-center ">
          {" "}
          <InputComponent
            labeltext="Verilerde Arayın..."
            placeholdertext="Verilerde Arayın.."
            value={filterInputValue}
            setvalue={setFilterInputValue}
          />
          <MultipleSelectComponent
            labeltext={"Gösterilen Sütunlar"}
            setvalue={setActiveColIDs}
            data={cols.map((elem) => {
              return {
                selected: elem.initialSelected,
                value: elem.id,
                name: elem.columnName,
              };
            })}
          />{" "}
          <ExcelDownloadButtonComponent
            fileName="Şirket Verileri"
            tableId="companies-table"
            ignoredClassname="excel-ignore"
          />
        </div>
        <div className="flex items-center gap-5">
          <ButtonComponent
            onClick={() => {
              setIsOpenAddModal(true);
            }}
            text="Veri Ekle"
            classname="bg-green-500 px-4 py-2 rounded-md text-white "
          />
          <AddCompanyModal
            isOpen={isOpenAddModal}
            setIsOpen={setIsOpenAddModal}
          />
        </div>
      </div>

      {/* Aktif columnlar */}

      {/* Tablo */}
      <div
        id="companies-table"
        class="relative overflow-x-auto shadow-md sm:rounded-lg  "
      >
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {cols.map((columnData, index) => {
                return (
                  activeColIDs.indexOf(columnData.id) > -1 && (
                    <th
                      key={index}
                      scope="col"
                      class={`!max-w-[250px] w-fit truncate   px-6 py-3 ${
                        columnData.ignoreExcel && "excel-ignore"
                      }`}
                    >
                      {columnData.columnName}
                    </th>
                  )
                );
              })}
              <th
                scope="col"
                class=" !max-w-[250px] w-fit px-6 py-3 truncate excel-ignore "
              >
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 &&
              filteredData
                .sort((a, b) => {
                  // aktiflikleri aynıysa isme göre sırala, eğer aynı değilse aktif olanı başa al
                  if (a.isActive == b.isActive) {
                    return a.name.localeCompare(b.name);
                  }
                  return b.isActive - a.isActive;
                })

                .map((companyData, index) => {
                  return (
                    <CompaniesListItem
                      key={index}
                      activeColIDs={activeColIDs}
                      data={companyData}
                    />
                  );
                })}
            {filteredData.length == 0 && (
              <tr className="text-3xl w-full  truncate text-center">
                <td colSpan={activeColIDs.length} className="w-full !py-5">
                  Gösterilecek Veri yok
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

const cols = [
  {
    id: 1,
    columnName: "Aktiflik Durumu",
    initialSelected: true,
    ignoreExcel: true,
  },
  {
    id: 2,
    columnName: "Şirket İsmi",
    initialSelected: true,
  },
  {
    id: 3,
    columnName: "KDV Oranı",
    initialSelected: true,
  },
  {
    id: 4,
    columnName: "Yetkili İsmi",
    initialSelected: true,
  },
  {
    id: 5,
    columnName: "Telefon 1",
    initialSelected: true,
  },
  {
    id: 6,
    columnName: "Telefon 2",
    initialSelected: true,
  },
  {
    id: 6.5,
    columnName: "Fax ",
    initialSelected: true,
  },
  {
    id: 7,
    columnName: "Email 1",
    initialSelected: true,
  },
  {
    id: 8,
    columnName: "Email 2",
    initialSelected: true,
  },
  {
    id: 9,
    columnName: "Adres",
    initialSelected: true,
  },
  {
    id: 10,
    columnName: "Vergi No",
    initialSelected: true,
  },
  {
    id: 11,
    columnName: "Banka",
    initialSelected: true,
  },
  {
    id: 12,
    columnName: "Banka Hesap Numarası",
    initialSelected: true,
  },
  {
    id: 13,
    columnName: "Banka MFO",
    initialSelected: true,
  },
  {
    id: 14,
    columnName: "IBAN",
    initialSelected: true,
  },
  {
    id: 15,
    columnName: "Extra 1",
  },
  {
    id: 16,
    columnName: "Extra 2",
  },
  {
    id: 17,
    columnName: "Extra 3",
  },
  {
    id: 18,
    columnName: "Extra 1 Türkçe",
  },
  {
    id: 19,
    columnName: "Extra 2 Türkçe",
  },
  {
    id: 20,
    columnName: "Extra 3 Türkçe",
  },
  {
    id: 21,
    columnName: "Extra 1 Ukrainian",
  },
  {
    id: 22,
    columnName: "Extra 2 Ukrainian",
  },
  {
    id: 23,
    columnName: "Extra 3 Ukrainian",
  },
  {
    id: 24,
    columnName: "Extra 1 English",
  },
  {
    id: 25,
    columnName: "Extra 2 English",
  },
  {
    id: 26,
    columnName: "Extra 3 English",
  },
];
