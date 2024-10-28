"use client";
import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import MultipleSelectComponent from "@/globalElements/multipleSelect";
import { useEffect, useRef, useState } from "react";
import EmployeesListItem from "./employeesListItem";
import AddEmployeeModal from "./employeeModal/addEmployeeModal";
import useEmployeeStore from "@/zustand/fetchOperations/employee";
import ExcelDownloadButtonComponent from "@/globalElements/excelDownloadButton";
import { filterData } from "@/functions/util/dataFilter";

export default function DashboardEmployeesTable() {
  const data = useEmployeeStore((state) => state.employees);
  const getAllEmployees = useEmployeeStore((state) => state.getAllEmployees);

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
      getAllEmployees();
    }
  }, []);

  const filteredData = filterData(data, filterInputValue);
  const userRoles = [
    {
      selected: true,
      value: "EMPLOYEE",
      name: "standart",
    },
    {
      value: "COMPANY_MANAGER",
      name: "Şirket Yöneticisi",
    },
    {
      value: "STORE_MANAGER",
      name: "Mağaza Yöneticisi",
    },
    {
      value: "LOGISTIC",
      name: "Lojistik",
    },
  ];

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
            fileName="Çalışan Verileri"
            tableId="employees-table"
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
          <AddEmployeeModal
            userRoles={userRoles}
            isOpen={isOpenAddModal}
            setIsOpen={setIsOpenAddModal}
          />
        </div>
      </div>

      {/* Aktif columnlar */}

      {/* Tablo */}
      <div
        id="employees-table"
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
                      class={`  !max-w-[250px] w-fit px-6 py-3 truncate ${
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
                class=" !max-w-[250px] w-fit px-6 py-3 truncate  excel-ignore"
              >
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 &&
              filteredData
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((employeeData, index) => {
                  return (
                    <EmployeesListItem
                      userRoles={userRoles}
                      key={index}
                      activeColIDs={activeColIDs}
                      data={employeeData}
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
    columnName: "Çalışan Adı",
    initialSelected: true,
  },
  {
    id: 2,
    columnName: "Çalışan Soyadı",
    initialSelected: true,
  },
  {
    id: 3,
    columnName: "Rol / Yetki",
    initialSelected: true,
    ignoreExcel: true,
  },
  {
    id: 4,
    columnName: "Telefon numarası",
    initialSelected: true,
  },
  {
    id: 5,
    columnName: "Şifre",
    initialSelected: true,
    ignoreExcel: true,
  },
  {
    id: 6,
    columnName: "Email",
    initialSelected: true,
  },
  {
    id: 7,
    columnName: "Adres",
    initialSelected: true,
  },
  {
    id: 8,
    columnName: "Maaş",
    initialSelected: true,
  },
  {
    id: 9,
    columnName: "Bonus",
    initialSelected: true,
  },
  {
    id: 10,
    columnName: "Maksimum İndirim Oranı",
    initialSelected: true,
  },
  {
    id: 11,
    columnName: "Yönetici Yorumu",
    initialSelected: true,
  },
  {
    id: 12,
    columnName: "Yönetici Yorumu Türkçe",
    initialSelected: true,
  },
  {
    id: 13,
    columnName: "Manager Comment English",
    initialSelected: true,
  },
  {
    id: 14,
    columnName: "Manager Comment Ukrainian",
    initialSelected: true,
  },
];
