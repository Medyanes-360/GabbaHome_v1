"use client";

import {
  DateField,
  DateTimeField,
  LocalizationProvider,
  TimeField,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function DateTimeInputComponent({
  date = false,
  datetime = false,
  time = false,
  value,
  setvalue,
  errortext = null,
  labeltext = null,
}) {
  console.log(value);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {date && (
          <DateField
            label={labeltext ? labeltext : "Tarih"}
            defaultValue={dayjs()}
            slotProps={{
              textField: {
                color: errortext && "error",
                focused: true,
              },
            }}
            value={value}
            onChange={(newValue) => setvalue(newValue)}
          />
        )}
        {datetime && (
          <DateTimeField
            label={labeltext ? labeltext : "Tarih"}
            slotProps={{
              textField: {
                color: errortext && "error",
                focused: true,
              },
            }}
            value={value}
            onChange={(newValue) => {
              setvalue(newValue);
            }}
            ampm={false}
          />
        )}
        {time && (
          <TimeField
            label={labeltext ? labeltext : "Saat"}
            slotProps={{
              textField: {
                color: errortext && "error",
                focused: true,
              },
            }}
            defaultValue={dayjs()}
            value={value}
            onChange={(newValue) => setvalue(newValue)}
          />
        )}
        {errortext && (
          <p className="mt-0 text-sm text-red-600 dark:text-red-500 flex items-center gap-1">
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
      </LocalizationProvider>
    </>
  );
}
