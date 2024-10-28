import useGlobalStore from "@/zustand/globalStore";
import Loader from "../loading";
import { MotionButton } from "../motion";

export default function ExcelDownloadButtonComponent({
  type = "button",
  fileName = "tableData",
  tableId,
  ignoredClassname,
  disabled = false,
}) {
  const loading = useGlobalStore((state) => state.isLoading);

  const downloadHandler = () => {
    const parent = document.getElementById(tableId); // exportlanacak table id'si

    const clone = parent.cloneNode(true);

    // ignore'lanan elementler:
    const elems = clone.querySelectorAll(`.${ignoredClassname}`); //ignorelanacak elementlerin classları

    // satırlar:
    const columns = clone
      .getElementsByTagName("tbody")[0]
      .getElementsByTagName("tr");

    // tablo Headerı:
    const tableHeader = clone
      .getElementsByTagName("thead")[0]
      .getElementsByTagName("tr")[0];

    // index olarak kullanılacak row Headerını ekliyoruz:
    const indexRowHeader = document.createElement("th");
    indexRowHeader.textContent = "#";
    tableHeader.prepend(indexRowHeader);

    // tüm satırlarda dolaş, satırların başına index ekle: (sıra numarası)
    let i = 1;
    for (const column of columns) {
      const indexRow = document.createElement("th");
      indexRow.textContent = i++;
      column.prepend(indexRow);
    }

    //ignore'lanan elementleri clone'dan sil:
    for (const elem of elems) {
      elem.remove();
    }
    // tüm çocuk elementlerinin class attr larını sil:
    const allChildrenOfTable = clone.getElementsByTagName("*");
    for (const child of allChildrenOfTable) {
      child.removeAttribute("class");
      child.removeAttribute("className");
    }
    function ToBinary(str) {
      let result = "";

      str = encodeURIComponent(str);

      for (let i = 0; i < str.length; i++)
        if (str[i] == "%") {
          result += String.fromCharCode(
            parseInt(str.substring(i + 1, i + 3), 16)
          );
          i += 2;
        } else result += str[i];

      return result;
    }
    //clone'un innerhtml ini alarak excele exportlamak için html dosyası oluştur
    var location = "data:application/vnd.ms-excel;base64,";
    var excelTemplate =
      "<html> " +
      "<head> " +
      '<meta http-equiv="content-type" content="text/plain; charset=UTF-8"/> ' +
      "</head> " +
      "<body> " +
      clone.innerHTML +
      "</body> " +
      "</html>";

    // çıktı ismi:
    const outputFilename = fileName;

    // indirme:
    const link = document.createElement("a");
    link.href = location + window.btoa(ToBinary(excelTemplate));
    link.setAttribute("download", outputFilename);
    document.body.appendChild(link);
    link.click();
    //window.location.href = location + window.btoa(ToBinary(excelTemplate));
  };

  return (
    <MotionButton
      onClick={(e) => {
        if (!disabled && !loading) {
          downloadHandler();
        }
      }}
      type={type}
      className={` px-4 py-2  rounded-md flex justify-center   ${
        (disabled || loading) && "opacity-70 cursor-default"
      } `}
      whileHover={!(disabled || loading) && { scale: 1.03 }}
      whileTap={!(disabled || loading) && { scale: 0.95 }}
      transition={!(disabled || loading) && { duration: 0.2 }}
    >
      <div className="truncate relative gap-2 rounded-md flex items-center justify-center">
        <ExcelDownloadSvg />
        <div className="absolute inset-0">{loading && <Loader button />} </div>
      </div>
    </MotionButton>
  );
}

const ExcelDownloadSvg = () => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 26 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.9329 9.64844L5.90161 8.125V19.382C5.90173 19.5043 5.92979 19.6254 5.98419 19.7383C6.03858 19.8513 6.11825 19.9539 6.21865 20.0403C6.31904 20.1267 6.4382 20.1952 6.5693 20.2419C6.70041 20.2886 6.84091 20.3126 6.98277 20.3125H24.2921C24.4342 20.3128 24.5748 20.289 24.7062 20.2424C24.8375 20.1957 24.9568 20.1273 25.0574 20.0408C25.158 19.9544 25.2378 19.8518 25.2924 19.7387C25.3469 19.6257 25.375 19.5045 25.3751 19.382V15.2344L15.9329 9.64844Z"
        fill="#185C37"
      />
      <path
        d="M15.9329 3.28011e-07H6.98277C6.84091 -0.00010231 6.70041 0.0238835 6.5693 0.0705884C6.4382 0.117293 6.31904 0.185803 6.21865 0.272205C6.11825 0.358607 6.03858 0.461209 5.98419 0.574155C5.92979 0.6871 5.90173 0.808176 5.90161 0.930469V5.07813L15.9329 10.1562L21.2444 11.6797L25.3751 10.1562V5.07813L15.9329 3.28011e-07Z"
        fill="#21A366"
      />
      <path
        d="M5.90161 5.07812H15.9329V10.1562H5.90161V5.07812Z"
        fill="#107C41"
      />
      <path
        opacity="0.1"
        d="M13.0809 4.0625H5.90161V16.7578H13.0809C13.367 16.7566 13.641 16.6582 13.8435 16.4841C14.0461 16.3099 14.1608 16.074 14.163 15.8273V4.99297C14.1608 4.74636 14.0461 4.51041 13.8435 4.33624C13.641 4.16208 13.367 4.06373 13.0809 4.0625Z"
        fill="black"
      />
      <path
        opacity="0.2"
        d="M12.491 4.57031H5.90161V17.2656H12.491C12.777 17.2644 13.051 17.166 13.2536 16.9919C13.4561 16.8177 13.5709 16.5818 13.573 16.3352V5.50078C13.5709 5.25417 13.4561 5.01822 13.2536 4.84406C13.051 4.66989 12.777 4.57154 12.491 4.57031Z"
        fill="black"
      />
      <path
        opacity="0.2"
        d="M12.491 4.57031H5.90161V16.25H12.491C12.777 16.2488 13.051 16.1504 13.2536 15.9763C13.4561 15.8021 13.5709 15.5661 13.573 15.3195V5.50078C13.5709 5.25417 13.4561 5.01822 13.2536 4.84406C13.051 4.66989 12.777 4.57154 12.491 4.57031Z"
        fill="black"
      />
      <path
        opacity="0.2"
        d="M11.901 4.57031H5.90161V16.25H11.901C12.1871 16.2488 12.461 16.1504 12.6636 15.9763C12.8661 15.8021 12.9809 15.5661 12.983 15.3195V5.50078C12.9809 5.25417 12.8661 5.01822 12.6636 4.84406C12.461 4.66989 12.1871 4.57154 11.901 4.57031Z"
        fill="black"
      />
      <path
        d="M1.08206 4.57031H11.9009C12.1875 4.57011 12.4624 4.668 12.6653 4.84247C12.8682 5.01694 12.9825 5.25373 12.9829 5.50078V14.8117C12.9825 15.0588 12.8682 15.2956 12.6653 15.47C12.4624 15.6445 12.1875 15.7424 11.9009 15.7422H1.08206C0.940126 15.7424 0.799534 15.7185 0.668321 15.6718C0.537109 15.6252 0.41785 15.5567 0.317359 15.4703C0.216868 15.3838 0.137117 15.2812 0.0826624 15.1682C0.0282082 15.0552 0.000118875 14.9341 0 14.8117V5.50078C0.000118875 5.37842 0.0282082 5.25728 0.0826624 5.14429C0.137117 5.03129 0.216868 4.92865 0.317359 4.84224C0.41785 4.75583 0.537109 4.68734 0.668321 4.64068C0.799534 4.59402 0.940126 4.57011 1.08206 4.57031Z"
        fill="url(#paint0_linear_0_1)"
      />
      <path
        d="M3.35303 13.1819L5.62862 10.1476L3.54425 7.13037H5.21809L6.35543 9.0624C6.46056 9.24522 6.53668 9.38115 6.57112 9.47178H6.58653C6.66084 9.3249 6.73968 9.1835 6.82215 9.04522L8.03834 7.1335H9.57896L7.44112 10.1335L9.63334 13.1843H7.99393L6.67987 11.0663C6.61886 10.9752 6.56701 10.8798 6.5249 10.7812H6.50315C6.46483 10.8773 6.41375 10.9693 6.3509 11.0554L4.99787 13.1819H3.35303Z"
        fill="white"
      />
      <path
        d="M24.293 1.31149e-06H15.9329V5.07813H25.3751V0.93047C25.375 0.808111 25.3469 0.686971 25.2924 0.573975C25.238 0.460979 25.1582 0.358341 25.0577 0.271929C24.9572 0.185517 24.838 0.117024 24.7068 0.070365C24.5755 0.0237061 24.435 -0.000204032 24.293 1.31149e-06Z"
        fill="#33C481"
      />
      <path
        d="M15.9329 10.1562H25.3751V15.2344H15.9329V10.1562Z"
        fill="#107C41"
      />
      <path
        d="M14.1875 4.65625V14.7674M14.1875 14.7674L17.2986 11.3646M14.1875 14.7674L11.0764 11.3646"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.5208 18.6562H11.8542C9.65428 18.6562 8.55434 18.6562 7.87092 17.9727C7.1875 17.2893 7.1875 16.1894 7.1875 13.9895M21.1875 13.9895C21.1875 16.1894 21.1875 17.2893 20.5041 17.9727C20.2709 18.2059 19.9893 18.3595 19.6319 18.4607"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_1"
          x1="2.26019"
          y1="3.83906"
          x2="8.98085"
          y2="17.3405"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#18884F" />
          <stop offset="0.5" stop-color="#117E43" />
          <stop offset="1" stop-color="#0B6631" />
        </linearGradient>
      </defs>
    </svg>
  );
};
