"use client";
import useGlobalStore from "@/zustand/globalStore";
import styles from "./index.module.css";
export default function Loader({
  // button'da veya page'de kullanılacaksa size ı ona göre belirliyoruz
  loading = false,
  button = false,
  classname,
  containerclassname,
  page = false,
}) {
  const isGlobalLoading = useGlobalStore((state) => state.isLoading);
  const isCustomLoading = loading;

  if (!isGlobalLoading && !isCustomLoading) return null;
  return (
    <div
      className={`!w-full  !h-full  flex items-center justify-center ${containerclassname}`}
    >
      <span
        className={`${styles.loader} ${classname}  ${
          button && styles.buttonloader
        } ${page && styles.pageLoader}`}
      ></span>
    </div>
  );
}
