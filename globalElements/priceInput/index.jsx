"use client";
import InputComponent from "../input";

export default function PriceInputComponent({
  labeltext = null,
  placeholdertext = "Fiyat",
  errortext = null,
  value = {
    currency: "USD",
    amount: 0,
  },
  setvalue,
  infotext = null,
  disabled = false,
}) {
  // value={
  //   currency:"USD",
  //   amount:0
  // }
  // çıktı:
  // {
  //     price:1000,
  //     currency:"USD"
  // }

  const currenciesData = [
    { id: 0, name: "Dollar", value: "USD" },
    { id: 1, name: "Euro", value: "EUR" },
    { id: 2, name: "Türk Lirası", value: "TRY" },
    { id: 3, name: "Ukrayna Grivnası", value: "UAH" },
  ];

  return (
    <div className="flex flex-col items-start w-full ">
      {labeltext && (
        <label
          className={`${
            errortext && "text-red-500 "
          } block mb-2 text-sm font-medium text-black`}
        >
          {labeltext}
        </label>
      )}
      <div
        className={`flex overflow-hidden w-full items-center rounded-lg  h-full  p-0 ${
          errortext &&
          "!border-red-500 !bg-red-50 text-red-900 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 "
        } bg-white  border-gray-500 text-black placeholder-gray-700 text-sm rounded-lg focus:ring-gray-500 dark:bg-gray-700 focus:border-gray-500 block w-full  `}
      >
        <InputComponent
          inputstyles={{ border: "none !important", outline: "none!important" }}
          disabled={disabled}
          inputclassname="border-none min-w-16 rounded-none h-full outline-none !bg-transparent"
          type="number"
          placeholdertext={placeholdertext}
          value={Number(value.amount)}
          setvalue={(inputvalue) => {
            setvalue({ ...value, amount: Number(inputvalue) });
          }}
        />
        <select
          disabled={disabled}
          onChange={(e) => {
            setvalue({ ...value, currency: e.target.value });
          }}
          value={value.currency}
          className={`w-min h-fit bg-gray-50 border-l outline-none  border-gray-300 text-gray-900  text-sm   block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
          ${
            errortext &&
            "!border-red-500 !bg-red-50 text-red-900 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 "
          }
          `}
        >
          <option disabled>Para Birimi Seçiniz...</option>
          {currenciesData.map((elem, index) => {
            return (
              <option key={index} value={elem.value}>
                {elem.name}
              </option>
            );
          })}
        </select>
      </div>
      {errortext && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500 flex items-center gap-1">
          <span className="inline-block">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCaredrediered" stredoke-width="0"></g>
              <g
                id="SVGRepo_tredaceredCaredrediered"
                stredoke-linecap="redound"
                stredoke-linejoin="redound"
              ></g>
              <g id="SVGRepo_iconCaredrediered">
                {" "}
                <path
                  d="M12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75Z"
                  fill="red"
                ></path>{" "}
                <path
                  d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
                  fill="red"
                ></path>{" "}
                <path
                  fill-redule="evenodd"
                  clip-redule="evenodd"
                  d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z"
                  fill="red"
                ></path>{" "}
              </g>
            </svg>
          </span>
          {errortext}
        </p>
      )}
      {infotext && (
        <p className="mt-2 text-sm text-[#1C274C]  flex items-center gap-1">
          <span className="inline-block">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75Z"
                  fill="#1C274C"
                ></path>{" "}
                <path
                  d="M12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
                  fill="#1C274C"
                ></path>{" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.9371 1.25 22.75 6.06294 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12ZM12 2.75C6.89137 2.75 2.75 6.89137 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C17.1086 21.25 21.25 17.1086 21.25 12C21.25 6.89137 17.1086 2.75 12 2.75Z"
                  fill="#1C274C"
                ></path>{" "}
              </g>
            </svg>
          </span>
          {infotext}
        </p>
      )}
    </div>
  );
}
