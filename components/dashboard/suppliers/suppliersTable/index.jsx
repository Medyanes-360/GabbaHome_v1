"use client";
import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import MultipleSelectComponent from "@/globalElements/multipleSelect";
import { useEffect, useRef, useState } from "react";
import SuppliersListItem from "./suppliersListItem";
import AddSupplierModal from "./supplierModal/addSupplierModal";
import useSupplierStore from "@/zustand/fetchOperations/supplier";
import ExcelDownloadButtonComponent from "@/globalElements/excelDownloadButton";
import { filterData } from "@/functions/util/dataFilter";

export default function DashboardSuppliersTable() {
  const data = useSupplierStore((state) => state.suppliers);
  const getAllSuppliers = useSupplierStore((state) => state.getAllSuppliers);

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
      getAllSuppliers();
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
            fileName="Tedarikçi Verileri"
            tableId="suppliers-table"
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
          <AddSupplierModal
            isOpen={isOpenAddModal}
            setIsOpen={setIsOpenAddModal}
          />
        </div>
      </div>

      {/* Aktif columnlar */}

      {/* Tablo */}
      <div
        id="suppliers-table"
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
                      class={`truncate  !max-w-[250px] w-fit px-6 py-3 ${
                        columnData.ignoreExcel && "excel-ignore"
                      } `}
                    >
                      {columnData.columnName}
                    </th>
                  )
                );
              })}
              <th
                scope="col"
                class=" !max-w-[250px] w-fit px-6 py-3 truncate excel-ignore"
              >
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 &&
              filteredData
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((supplierData, index) => {
                  return (
                    <SuppliersListItem
                      key={index}
                      activeColIDs={activeColIDs}
                      data={supplierData}
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
    columnName: "Yetkili 1 Adı",
    initialSelected: true,
  },
  {
    id: 2,
    columnName: "Yetkili 1 Telefon Numarası",
    initialSelected: true,
  },
  {
    id: 3,
    columnName: "Yetkili 1 Email",
    initialSelected: true,
  },
  {
    id: 4,
    columnName: "Yetkili 2 Adı",
    initialSelected: true,
  },
  {
    id: 5,
    columnName: "Yetkili 2 Telefon Numaras",
    initialSelected: true,
  },
  {
    id: 6,
    columnName: "Yetkili 2 Email",
    initialSelected: true,
  },
  {
    id: 7,
    columnName: "Firma Adı",
    initialSelected: true,
  },
  {
    id: 8,
    columnName: "Firma Adresi",
    initialSelected: true,
  },
  {
    id: 9,
    columnName: "Firma Vergi Numarası",
    initialSelected: true,
  },
  {
    id: 10,
    columnName: "Firma Telefon Numarası 1",
    initialSelected: true,
  },
  {
    id: 11,
    columnName: "Firma Telefon Numarası 2",
    initialSelected: true,
  },
  {
    id: 12,
    columnName: "Firma Email",
    initialSelected: true,
  },
  {
    id: 13,
    columnName: "Giriş Yapmak İçin Kullanılan Telefon Numarası",
    initialSelected: true,
    ignoreExcel: true,
  },
  {
    id: 14,
    columnName: "Giriş Yapmak İçin Kullanılan Email",
    initialSelected: true,
    ignoreExcel: true,
  },
  {
    id: 15,
    columnName: "Şifre",
    initialSelected: true,
    ignoreExcel: true,
  },
];
