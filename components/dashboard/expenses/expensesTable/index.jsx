"use client";
import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import MultipleSelectComponent from "@/globalElements/multipleSelect";
import { useEffect, useRef, useState } from "react";
import ExpensesListItem from "./expensesListItem";
import AddExpenseModal from "./expenseModal/addExpenseModal";
import useExpenseStore from "@/zustand/fetchOperations/expense";
import ExcelDownloadButtonComponent from "@/globalElements/excelDownloadButton";
import { filterData } from "@/functions/util/dataFilter";

export default function DashboardExpensesTable() {
  const data = useExpenseStore((state) => state.expenses);
  const getAllExpenses = useExpenseStore((state) => state.getAllExpenses);

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
      getAllExpenses();
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
            fileName="Giderler"
            tableId="expenses-table"
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
          <AddExpenseModal
            isOpen={isOpenAddModal}
            setIsOpen={setIsOpenAddModal}
          />
        </div>
      </div>

      {/* Aktif columnlar */}

      {/* Tablo */}
      <div
        id="expenses-table"
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
                      class="truncate  !max-w-[250px] w-fit px-6 py-3 truncate "
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
                .sort(
                  (a, b) => new Date(a.paymentDate) - new Date(b.paymentDate)
                )
                .map((expenseData, index) => {
                  return (
                    <ExpensesListItem
                      key={index}
                      activeColIDs={activeColIDs}
                      data={expenseData}
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
    columnName: "Tarih",
    initialSelected: true,
  },
  {
    id: 2,
    columnName: "Mağaza",
    initialSelected: true,
  },
  {
    id: 3,
    columnName: "Ödeme Yapılan Şirket Bilgileri",
    initialSelected: true,
  },
  {
    id: 4,
    columnName: "Ödeme Yapılan Şirket Bilgileri İngilizce",
    initialSelected: true,
  },
  {
    id: 5,
    columnName: "Ödeme Yapılan Şirket Bilgileri Ukraynaca",
    initialSelected: true,
  },
  {
    id: 6,
    columnName: "Ödeme Yapılan Şirket Bilgileri Türkçe",
    initialSelected: true,
  },

  {
    id: 7,
    columnName: "Ödeme Tipi",
    initialSelected: true,
  },
  {
    id: 8,
    columnName: "Gider İsmi",
    initialSelected: true,
  },
  {
    id: 9,
    columnName: "Miktar",
    initialSelected: true,
  },
  {
    id: 10,
    columnName: "Açıklama",
    initialSelected: true,
  },
  {
    id: 11,
    columnName: "Açıklama Türkçe",
    initialSelected: true,
  },
  {
    id: 12,
    columnName: "Açıklama İngilizce",
    initialSelected: true,
  },
  {
    id: 13,
    columnName: "Açıklama Ukraynaca",
    initialSelected: true,
  },
];
