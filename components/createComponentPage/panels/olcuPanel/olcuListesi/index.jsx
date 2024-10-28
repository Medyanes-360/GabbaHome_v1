"use client";
import { useEffect, useRef, useState } from "react";
import MeasurementListItem from "./measurementListItem";
import useMeasurementStore from "@/zustand/fetchOperations/component/measurement";
import useGlobalStore from "@/zustand/globalStore";
import { filterData } from "@/functions/util/dataFilter";

export default function OlcuListesi() {
  const data = useMeasurementStore((state) => state.measurements);
  const getAllMeasurements = useMeasurementStore(
    (state) => state.getAllMeasurements
  );
  const isLoading = useGlobalStore((state) => state.isLoading);

  const [searchInputValue, setSearchInputValue] = useState("");

  const filteredData = filterData(data, searchInputValue);

  const isFetched = useRef(true);
  useEffect(() => {
    if (!data || data.length == 0) {
      if (!isFetched.current) {
        return;
      }
      isFetched.current = true;
      getAllMeasurements();
    }
  }, []);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="pb-4 bg-white dark:bg-gray-900">
          <label htmlFor="table-search" className="sr-only">
            Arama
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.currentTarget.value)}
              type="text"
              id="table-search"
              className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tüm Değerler İçinde Arayın"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className=" !max-w-[250px] w-fit px-6 py-3 truncate  border-r"
              >
                Son Değiştirilme Tarihi
              </th>
              <th
                scope="col"
                className=" !max-w-[250px] w-fit px-6 py-3 truncate  border-r"
              >
                Ölçü İsmi
              </th>
              <th
                scope="col"
                className="border-r  !max-w-[250px] w-fit px-6 py-3 truncate "
              >
                Özel Ölçü
              </th>
              <th
                scope="col"
                className="border-r  !max-w-[250px] w-fit px-6 py-3 truncate "
              >
                En
              </th>
              <th
                scope="col"
                className="border-r  !max-w-[250px] w-fit px-6 py-3 truncate "
              >
                Boy
              </th>
              <th
                scope="col"
                className="border-r  !max-w-[250px] w-fit px-6 py-3 truncate "
              >
                Genişlik
              </th>
              <th
                scope="col"
                className=" !max-w-[250px] w-fit px-6 py-3 truncate "
              >
                İşlemler
              </th>
            </tr>
          </thead>
          {!isLoading && (
            <tbody>
              {filteredData.length > 0 &&
                filteredData
                  .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
                  .map((measurement, index) => {
                    return (
                      <MeasurementListItem key={index} data={measurement} />
                    );
                  })}
              {filteredData.length == 0 && (
                <tr className="text-3xl w-full  truncate text-center">
                  <td colSpan={7} className="w-full !py-5">
                    Gösterilecek Veri yok
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}
