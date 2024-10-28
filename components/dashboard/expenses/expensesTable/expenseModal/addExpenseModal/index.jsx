import ButtonComponent from "@/globalElements/button";
import DateTimeInputComponent from "@/globalElements/dateTime";
import InputComponent from "@/globalElements/input";
import ModalComponent from "@/globalElements/modal";
import PriceInputComponent from "@/globalElements/priceInput";
import SelectComponent from "@/globalElements/select";
import useExpenseStore from "@/zustand/fetchOperations/expense";
import useStoreStore from "@/zustand/fetchOperations/store";
import { useEffect, useState } from "react";

export default function AddExpenseModal({ isOpen, setIsOpen }) {
  const createExpense = useExpenseStore((state) => state.createExpense);

  const stores = useStoreStore((state) => state.stores);
  const getAllStores = useStoreStore((state) => state.getAllStores);

  const [errorStates, setErrorStates] = useState({
    paidToInputError: false,
    paymentDateInputError: false,

    paymentNameInputError: false,
    descriptionInputError: false,
  });

  const [storeIdInputValue, setStoreIdInputValue] = useState("");
  const [paidToInputValue, setPaidToInputValue] = useState("");
  const [paidTo_enInputValue, setPaidTo_enInputValue] = useState("");
  const [paidTo_ukInputValue, setPaidTo_ukInputValue] = useState("");
  const [paidTo_trInputValue, setPaidTo_trInputValue] = useState("");
  const [paymentDateInputValue, setPaymentDateInputValue] = useState(null);
  const [paymentTypeInputValue, setPaymentTypeInputValue] = useState("");
  const [paymentNameInputValue, setPaymentNameInputValue] = useState("");

  const [amountValue, setAmountValue] = useState({
    currency: "USD",
    amount: 0,
  });
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const [description_enInputValue, setDescription_enInputValue] = useState("");

  const [description_ukInputValue, setDescription_ukInputValue] = useState("");
  const [description_trInputValue, setDescription_trInputValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    setErrorStates({
      ...errorStates,
      paidToInputError:
        paidToInputValue.trim() == ""
          ? "Ödeme Yapılan Şirket Bilgisi Boş Bırakılmaz"
          : false,
      paymentDateInputError: !paymentDateInputValue
        ? "Ödeme Tarihi Bilgisi Boş Bırakılmaz"
        : false,
      paymentNameInputError:
        paymentNameInputValue.trim() == ""
          ? "Ödemeye verilecek isim Boş Bırakılmaz"
          : false,
      descriptionInputError:
        descriptionInputValue.trim() == ""
          ? "Ödeme Açıklaması Boş Bırakılmaz"
          : false,
    });

    const expenseToPost = {
      storeId: storeIdInputValue,

      paidTo: paidToInputValue,
      paidTo_en: paidTo_enInputValue,
      paidTo_uk: paidTo_ukInputValue,
      paidTo_tr: paidTo_trInputValue,

      paymentName: paymentNameInputValue,
      paymentDate: paymentDateInputValue && paymentDateInputValue.toJSON(),
      paymentType: paymentTypeInputValue,

      amount: amountValue,

      description: descriptionInputValue,
      description_uk: description_ukInputValue,
      description_en: description_enInputValue,
      description_tr: description_trInputValue,
    };
    if (Object.values(errorStates).every((elem) => elem == false)) {
      createExpense(expenseToPost);
    } else {
    }
  };
  useEffect(() => {
    //eğer halihazırda data yoksa fetchle:
    if (!stores || stores.length < 1) {
      getAllStores();
    }
  }, []);

  const paymentTypes = [
    { selected: true, value: "Nakit", name: "Nakit" },
    { value: "Banka", name: "Banka" },
  ];

  return (
    <ModalComponent
      title="Gider Verisi Ekle"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="flex flex-col gap-2">
        <SelectComponent
          errortext={errorStates.storeIdInputErrorz}
          labeltext="Mağaza"
          placeholdertext="Mağaza Seçiniz.."
          setvalue={setStoreIdInputValue}
          value={storeIdInputValue}
          data={stores.map((elem) => {
            return {
              selected: storeIdInputValue == elem.id,
              value: elem.id,
              name: elem.name,
            };
          })}
        />
        <InputComponent
          errortext={errorStates.paidToInputError}
          labeltext="Ödememe Yapılan Şirket Bilgisi"
          placeholdertext="Ödememe Yapılan Şirket Bilgisi"
          value={paidToInputValue}
          setvalue={setPaidToInputValue}
        />
        <InputComponent
          errortext={errorStates.paidTo_enInputError}
          labeltext="Ödeme Yapılan Şirket Bilgisi İngilizce "
          placeholdertext="Ödeme Yapılan Şirket Bilgisi İngilizce"
          value={paidTo_enInputValue}
          setvalue={setPaidTo_enInputValue}
        />
        <InputComponent
          errortext={errorStates.paidTo_ukInputError}
          labeltext="Ödeme Yapılan Şirket Bilgisi Ukraynaca "
          placeholdertext="Ödeme Yapılan Şirket Bilgisi Ukraynaca"
          value={paidTo_ukInputValue}
          setvalue={setPaidTo_ukInputValue}
        />
        <InputComponent
          errortext={errorStates.paidTo_trInputError}
          labeltext="Ödeme Yapılan Şirket Bilgisi Türkçe "
          placeholdertext="Ödeme Yapılan Şirket Bilgisi Türkçe"
          value={paidTo_trInputValue}
          setvalue={setPaidTo_trInputValue}
        />
        <DateTimeInputComponent
          errortext={errorStates.paymentDateInputError}
          datetime
          value={paymentDateInputValue}
          setvalue={setPaymentDateInputValue}
        />
        <InputComponent
          errortext={errorStates.paymentNameInputError}
          labeltext="Ödemeye verilecek isim"
          placeholdertext="Ödemeye verilecek isim"
          value={paymentNameInputValue}
          setvalue={setPaymentNameInputValue}
        />
        <SelectComponent
          errortext={errorStates.paymentTypeInputError}
          labeltext="Ödeme Tipi"
          placeholdertext="Ödeme Tipi Seçiniz.."
          setvalue={setPaymentTypeInputValue}
          data={paymentTypes}
        />

        <PriceInputComponent
          errortext={errorStates.amountError}
          labeltext="Miktar"
          placeholdertext="Miktar"
          value={amountValue}
          setvalue={setAmountValue}
        />

        <InputComponent
          errortext={errorStates.descriptionInputError}
          labeltext="Ödeme Açıklaması"
          placeholdertext="Ödeme Açıklaması"
          value={descriptionInputValue}
          setvalue={setDescriptionInputValue}
        />
        <InputComponent
          errortext={errorStates.description_ukInputError}
          labeltext="Ödeme Açıklaması Ukraynaca"
          placeholdertext="Ödeme Açıklaması Ukraynaca"
          value={description_ukInputValue}
          setvalue={setDescription_ukInputValue}
        />
        <InputComponent
          errortext={errorStates.description_enInputError}
          labeltext="Ödeme Açıklaması İngilizce"
          placeholdertext="Ödeme Açıklaması İngilizce"
          value={description_enInputValue}
          setvalue={setDescription_enInputValue}
        />
        <InputComponent
          errortext={errorStates.description_trInputError}
          labeltext="Ödeme Açıklaması Türkçe"
          placeholdertext="Ödeme Açıklaması Türkçe"
          value={description_trInputValue}
          setvalue={setDescription_trInputValue}
        />
        <ButtonComponent
          onClick={submitHandler}
          text="Gider Verisini Ekle"
          classname="w-[95%] m-auto  mt-5 bg-green-500 px-4 py-2 rounded-md text-white "
        />
      </div>
    </ModalComponent>
  );
}
