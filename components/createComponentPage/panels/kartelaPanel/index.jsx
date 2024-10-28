"use client";
import { useState } from "react";
import KartelaFormu from "./kartela/kartelaFormu";
import KartelaListesi from "./kartela/kartelaListesi";
import SwitchComponent from "@/globalElements/switch";
import KartelaKategorisiFormu from "./kartelaKategorisi/kartelaKategorisiFormu";
import KartelaKategorisiListesi from "./kartelaKategorisi/kartelaKategorisiListesi";

export default function KartelaTabPanel({ activePanel }) {
  const [isKartelaKategorisiFormu, setIsKartelaKategorisiFormu] =
    useState(false);

  const switchHandler = (e) => {
    setIsKartelaKategorisiFormu(e.currentTarget.checked);
  };
  return (
    <>
      {" "}
      <div className="flex items-center justify-center border-b-2 border-black pb-2 mb-2">
        <SwitchComponent
          labeltext="Kartela Kategorisi Ekle"
          onchange={switchHandler}
        />
      </div>
      {!isKartelaKategorisiFormu && (
        <>
          {" "}
          <KartelaFormu />
          <KartelaListesi />
        </>
      )}
      {isKartelaKategorisiFormu && (
        <>
          {" "}
          <KartelaKategorisiFormu />
          <KartelaKategorisiListesi />
        </>
      )}
    </>
  );
}
