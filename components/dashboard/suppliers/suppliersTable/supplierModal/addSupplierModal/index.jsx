import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import ModalComponent from "@/globalElements/modal";
import useSupplierStore from "@/zustand/fetchOperations/supplier";
import { useState } from "react";

export default function AddSupplierModal({ isOpen, setIsOpen }) {
  const createSupplier = useSupplierStore((state) => state.createSupplier);

  const [errorStates, setErrorStates] = useState({
    competentName_1InputError: false,
    competentPhoneNumber_1InputError: false,
    competentEmail_1InputError: false,
    firmNameInputError: false,
    firmAddressInputError: false,
    firmTaxNumberInputError: false,
    firmPhoneNumber_1InputError: false,
    loginPhoneNumberInputError: false,
    loginEmailInputError: false,
    loginPasswordInputError: false,
  });

  const [competentName_1InputValue, setCompetentName_1InputValue] =
    useState("");
  const [
    competentPhoneNumber_1InputValue,
    setCompetentPhoneNumber_1InputValue,
  ] = useState("");
  const [competentEmail_1InputValue, setCompetentEmail_1InputValue] =
    useState("");
  const [competentName_2InputValue, setCompetentName_2InputValue] =
    useState("");
  const [
    competentPhoneNumber_2InputValue,
    setCompetentPhoneNumber_2InputValue,
  ] = useState("");
  const [competentEmail_2InputValue, setCompetentEmail_2InputValue] =
    useState("");
  const [firmNameInputValue, setFirmNameInputValue] = useState("");
  const [firmAddressInputValue, setFirmAddressInputValue] = useState("");

  const [firmTaxNumberInputValue, setFirmTaxNumberInputValue] = useState("");
  const [firmPhoneNumber_1InputValue, setFirmPhoneNumber_1InputValue] =
    useState("");
  const [firmPhoneNumber_2InputValue, setFirmPhoneNumber_2InputValue] =
    useState("");

  const [firmEmailInputValue, setFirmEmailInputValue] = useState("");
  const [loginPhoneNumberInputValue, setLoginPhoneNumberInputValue] =
    useState("");
  const [loginEmailInputValue, setLoginEmailInputValue] = useState("");

  const [loginPasswordInputValue, setLoginPasswordInputValue] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    setErrorStates({
      ...errorStates,
      competentName_1InputError:
        competentName_1InputValue.trim() == ""
          ? "Yetkili 1 İsmi Boş Bırakılmaz"
          : false,
      competentPhoneNumber_1InputValue:
        competentPhoneNumber_1InputValue.trim() == ""
          ? "Yetkili 1 için Telefon Bilgisi Boş Bırakılmaz"
          : false,
      firmNameInputError:
        firmNameInputValue.trim() == "" ? "Firma Adı Boş Bırakılmaz" : false,
      firmAddressInputError:
        firmAddressInputValue.trim() == ""
          ? "Firma Adresi Boş Bırakılmaz"
          : false,
      firmTaxNumberInputError:
        firmTaxNumberInputValue.trim() == ""
          ? "Firma Vergi No Bilgisi Boş Bırakılmaz"
          : false,
      firmPhoneNumber_1InputError:
        firmPhoneNumber_1InputValue.trim() == ""
          ? "Firma Telefon Numarası 1 Bilgisi Boş Bırakılmaz"
          : false,
      loginPhoneNumberInputError:
        loginPhoneNumberInputValue.trim() == ""
          ? "Giriş Yapmak için kullanılmak üzere bir telefon numarası belirtin."
          : false,
      loginEmailInputError:
        loginEmailInputValue.trim() == ""
          ? "Giriş Yapmak için kullanılmak üzere bir e-mail belirtin."
          : false,
      loginPasswordInputError:
        loginPasswordInputValue.trim() == ""
          ? "Giriş Yapmak için kullanılmak üzere bir şifre belirleyin."
          : false,
    });

    const supplierToPost = {
      competentName_1: competentName_1InputValue,
      competentPhoneNumber_1: competentPhoneNumber_1InputValue,
      competentEmail_1: competentEmail_1InputValue,
      competentName_2: competentName_2InputValue,
      competentPhoneNumber_2: competentPhoneNumber_2InputValue,
      competentEmail_2: competentEmail_2InputValue,

      firmName: firmNameInputValue,
      firmAddress: firmAddressInputValue,
      firmTaxNumber: firmTaxNumberInputValue,
      firmPhoneNumber_1: firmPhoneNumber_1InputValue,
      firmPhoneNumber_2: firmPhoneNumber_2InputValue,
      firmEmail: firmEmailInputValue,

      email: loginEmailInputValue,
      phoneNumber: loginPhoneNumberInputValue,
      password: loginPasswordInputValue,
    };
    if (Object.values(errorStates).every((elem) => elem == false)) {
      createSupplier(supplierToPost);
    } else {
    }
  };

  return (
    <ModalComponent
      title="Tedarikçi Verisi Ekle"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="flex flex-col gap-2">
        <InputComponent
          errortext={errorStates.competentName_1InputError}
          labeltext="Yetkili 1 İsmi"
          placeholdertext="Yetkili 1 İsmi"
          value={competentName_1InputValue}
          setvalue={setCompetentName_1InputValue}
        />
        <InputComponent
          errortext={errorStates.competentPhoneNumber_1InputError}
          labeltext="Yetkili 1 Telefon Numarası"
          placeholdertext="Yetkili 1 Telefon Numarası"
          value={competentPhoneNumber_1InputValue}
          setvalue={setCompetentPhoneNumber_1InputValue}
        />
        <InputComponent
          errortext={errorStates.competentEmail_1InputError}
          labeltext="Yetkili 1 Email "
          placeholdertext="Yetkili 1 Email"
          value={competentEmail_1InputValue}
          setvalue={setCompetentEmail_1InputValue}
        />
        <InputComponent
          errortext={errorStates.competentName_2InputError}
          labeltext="Yetkili 2 İsmi"
          placeholdertext="Yetkili 2 İsmi"
          value={competentName_2InputValue}
          setvalue={setCompetentName_2InputValue}
        />
        <InputComponent
          errortext={errorStates.competentPhoneNumber_2InputError}
          labeltext="Yetkili 2 Telefon Numarası"
          placeholdertext="Yetkili 2 Telefon Numarası"
          value={competentPhoneNumber_2InputValue}
          setvalue={setCompetentPhoneNumber_2InputValue}
        />
        <InputComponent
          errortext={errorStates.competentEmail_2InputError}
          labeltext="Yetkili 2 Email "
          placeholdertext="Yetkili 2 Email"
          value={competentEmail_2InputValue}
          setvalue={setCompetentEmail_2InputValue}
        />
        <InputComponent
          errortext={errorStates.firmNameInputError}
          labeltext="Firma Adı"
          placeholdertext="Firma Adı"
          value={firmNameInputValue}
          setvalue={setFirmNameInputValue}
        />
        <InputComponent
          errortext={errorStates.firmAddressInputError}
          labeltext="Firma Adresi"
          placeholdertext="firma Adresi"
          value={firmAddressInputValue}
          setvalue={setFirmAddressInputValue}
        />
        <InputComponent
          errortext={errorStates.firmTaxNumberInputError}
          labeltext="Firma Vergi No"
          placeholdertext="Firma Vergi No"
          value={firmTaxNumberInputValue}
          setvalue={setFirmTaxNumberInputValue}
        />
        <InputComponent
          errortext={errorStates.firmPhoneNumber_1InputError}
          labeltext="Firma Telefon Numarası 1"
          placeholdertext="Firma Telefon Numarası 1"
          value={firmPhoneNumber_1InputValue}
          setvalue={setFirmPhoneNumber_1InputValue}
        />
        <InputComponent
          errortext={errorStates.firmPhoneNumber_2InputError}
          labeltext="Firma Telefon Numarası 2"
          placeholdertext="Firma Telefon Numarası 2"
          value={firmPhoneNumber_2InputValue}
          setvalue={setFirmPhoneNumber_2InputValue}
        />
        <InputComponent
          errortext={errorStates.firmEmailInputError}
          labeltext="Firma Email"
          placeholdertext="Firma Email "
          value={firmEmailInputValue}
          setvalue={setFirmEmailInputValue}
        />
        <InputComponent
          errortext={errorStates.loginPhoneNumberInputError}
          labeltext="Giriş Yapmak için kullanılacak telefon numarası"
          placeholdertext="Giriş Yapmak içi kullanılacak telefon numarası"
          value={loginPhoneNumberInputValue}
          setvalue={setLoginPhoneNumberInputValue}
        />
        <InputComponent
          errortext={errorStates.loginEmailInputError}
          labeltext="Giriş Yapmak için kullanılacak Email"
          placeholdertext="Giriş Yapmak içi kullanılacak Email"
          value={loginEmailInputValue}
          setvalue={setLoginEmailInputValue}
        />
        <InputComponent
          errortext={errorStates.loginPasswordInputError}
          labeltext="Giriş Yapmak için kullanılacak Şifre"
          placeholdertext="Giriş Yapmak içi kullanılacak Şifre"
          type="password"
          value={loginPasswordInputValue}
          setvalue={setLoginPasswordInputValue}
        />
        <ButtonComponent
          onClick={submitHandler}
          text="Tedarikçi Verisini Ekle"
          classname="w-[95%] m-auto  mt-5 bg-green-500 px-4 py-2 rounded-md text-white "
        />
      </div>
    </ModalComponent>
  );
}
