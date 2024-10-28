"use client";
import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import MultipleSelectComponent from "@/globalElements/multipleSelect";
import { useEffect, useRef, useState } from "react";
import StoresListItem from "./storesListItem";
import AddStoreModal from "./storeModal/addStoreModal";
import useStoreStore from "@/zustand/fetchOperations/store";

import ExcelDownloadButtonComponent from "@/globalElements/excelDownloadButton";
import { filterData } from "@/functions/util/dataFilter";

export default function DashboardStoresTable() {
  const data = useStoreStore((state) => state.stores);
  const getAllStores = useStoreStore((state) => state.getAllStores);

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
      getAllStores();
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
            fileName="Mağazalar"
            tableId="stores-table"
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
          <AddStoreModal
            isOpen={isOpenAddModal}
            setIsOpen={setIsOpenAddModal}
          />
        </div>
      </div>

      {/* Aktif columnlar */}

      {/* Tablo */}
      <div
        id="stores-table"
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
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((storeData, index) => {
                  return (
                    <StoresListItem
                      key={index}
                      activeColIDs={activeColIDs}
                      data={storeData}
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
    initialSelected: false,
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
    columnName: "Maksimum Bonus Oranı",
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
