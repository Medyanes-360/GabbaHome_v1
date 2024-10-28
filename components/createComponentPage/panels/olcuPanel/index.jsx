import OlcuFormu from "./olcuFormu";
import OlcuListesi from "./olcuListesi";

export default function OlcuTabPanel({ activePanel }) {
  return (
    <>
      <OlcuFormu />
      <OlcuListesi />
    </>
  );
}
