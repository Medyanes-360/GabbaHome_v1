import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import ModalComponent from "@/globalElements/modal";
import useCompanyStore from "@/zustand/fetchOperations/company";
import { useState } from "react";

export default function UpdateCompanyModal({ isOpen, setIsOpen, data }) {
  const updateCompany = useCompanyStore((state) => state.updateCompany);

  const [errorStates, setErrorStates] = useState({
    companyNameInputError: false,
    competentNameInputError: false,
    tel1InputError: false,
    tel2InputError: false,
    faxInputError: false,
    email1InputError: false,
    email2InputError: false,
    addressInputError: false,
    address_enInputError: false,
    address_ukInputError: false,
    address_trInputError: false,
    taxNumberInputError: false,
    bankNameInputError: false,
    bankAccountNumberInputError: false,
    bankMFOInputError: false,
    ibanInputError: false,
    kdvRatePercentInputError: false,
    extra1InputError: false,
    extra2InputError: false,
    extra3InputError: false,
    extra_1_enInputError: false,
    extra_1_ukInputError: false,
    extra_1_trInputError: false,
    extra_2_enInputError: false,
    extra_2_ukInputError: false,
    extra_2_trInputError: false,
    extra_3_enInputError: false,
    extra_3_ukInputError: false,
    extra_3_trInputError: false,
  });

  const [companyNameInputValue, setCompanyNameInputValue] = useState(data.name);
  const [competentNameInputValue, setCompetentNameInputValue] = useState(
    data.competentName
  );
  const [tel1InputValue, setTel1InputValue] = useState(data.tel_1);
  const [tel2InputValue, setTel2InputValue] = useState(data.tel_2);
  const [faxInputVAlue, setFaxInputValue] = useState(data.fax);
  const [email1InputValue, setEmail1InputValue] = useState(data.email_1);
  const [email2InputValue, setEmail2InputValue] = useState(data.email_2);
  const [addressInputValue, setAddressInputValue] = useState(data.address);

  const [address_enInputValue, setAddress_enInputValue] = useState("");
  const [address_ukInputValue, setAddress_ukInputValue] = useState("");
  const [address_trInputValue, setAddress_trInputValue] = useState("");

  const [taxNumberInputValue, setTaxNumberInputValue] = useState(
    data.taxNumber
  );
  const [bankNameInputValue, setBankNameInputValue] = useState(data.bankName);
  const [bankAccountNumberInputValue, setBankAccountNumberInputValue] =
    useState(data.bankAccountNumber);
  const [bankMFOInputValue, setBankMFOInputValue] = useState(data.bankMFO);
  const [ibanInputValue, setIbanInputValue] = useState(data.iban);
  const [kdvRatePercentInputValue, setKdvRatePercentInputValue] = useState(
    data.kdvRatePercent
  );
  const [extra1InputValue, setExtra1InputValue] = useState(data.extra_1);
  const [extra2InputValue, setExtra2InputValue] = useState(data.extra_2);
  const [extra3InputValue, setExtra3InputValue] = useState(data.extra_3);

  const [extra_1_enInputValue, setExtra_1_enInputValue] = useState(
    data.extra_1_en
  );
  const [extra_1_ukInputValue, setExtra_1_ukInputValue] = useState(
    data.extra_1_uk
  );
  const [extra_1_trInputValue, setExtra_1_trInputValue] = useState(
    data.extra_1_tr
  );

  const [extra_2_enInputValue, setExtra_2_enInputValue] = useState(
    data.extra_2_en
  );
  const [extra_2_ukInputValue, setExtra_2_ukInputValue] = useState(
    data.extra_2_uk
  );
  const [extra_2_trInputValue, setExtra_2_trInputValue] = useState(
    data.extra_2_tr
  );

  const [extra_3_enInputValue, setExtra_3_enInputValue] = useState(
    data.extra_3_en
  );
  const [extra_3_ukInputValue, setExtra_3_ukInputValue] = useState(
    data.extra_3_uk
  );
  const [extra_3_trInputValue, setExtra_3_trInputValue] = useState(
    data.extra_3_tr
  );

  // Şirket Verisi Güncelleme

  const submitHandler = (e) => {
    e.preventDefault();

    setErrorStates({
      ...errorStates,
      companyNameInputError:
        companyNameInputValue.trim() == ""
          ? "Şirket İsmi Boş Bırakılmaz"
          : false,
      tel1InputError:
        tel1InputValue.trim() == "" ? "Telefon Bilgisi Boş Bırakılmaz" : false,
      tel2InputError:
        tel2InputValue.trim() == "" ? "Telefon Bilgisi Boş Bırakılmaz" : false,
      faxInputError: false,
      email1InputError:
        email1InputValue.trim() == "" ? "Email Bilgisi Boş Bırakılmaz" : false,
      email2InputError:
        email2InputValue.trim() == ""
          ? "Telefon Bilgisi Boş Bırakılmaz"
          : false,
      addressInputError:
        addressInputValue.trim() == "" ? "Adres Bilgisi Boş Bırakılmaz" : false,
      taxNumberInputError:
        taxNumberInputValue.trim() == ""
          ? "Vergi No Bilgisi Boş Bırakılmaz"
          : false,
      bankNameInputError:
        bankNameInputValue.trim() == ""
          ? "Banka Adı Bilgisi Boş Bırakılmaz"
          : false,
      bankAccountNumberInputError:
        bankAccountNumberInputValue.trim() == ""
          ? "Banka Hesap No Bilgisi Boş Bırakılmaz"
          : false,
      bankMFOInputError: false,
      ibanInputError:
        ibanInputValue.trim() == "" ? "IBAN Bilgisi Boş Bırakılmaz" : false,
    });

    const companyToUpdate = {
      id: data.id,
      name: companyNameInputValue,
      competentName: competentNameInputValue,

      tel_1: tel1InputValue,
      tel_2: tel2InputValue,

      fax: faxInputVAlue,

      email_1: email1InputValue,
      email_2: email2InputValue,

      address: addressInputValue,

      address_tr: address_trInputValue,
      address_en: address_enInputValue,
      address_uk: address_ukInputValue,

      taxNumber: taxNumberInputValue,
      bankName: bankNameInputValue,
      bankAccountNumber: bankAccountNumberInputValue,
      bankMFO: bankMFOInputValue,

      iban: ibanInputValue,

      kdvRatePercent: parseFloat(kdvRatePercentInputValue),

      extra_1: extra1InputValue,
      extra_2: extra2InputValue,
      extra_3: extra3InputValue,

      extra_1_en: extra_1_enInputValue,
      extra_1_uk: extra_1_ukInputValue,
      extra_1_tr: extra_1_trInputValue,

      extra_2_en: extra_2_enInputValue,
      extra_2_uk: extra_2_ukInputValue,
      extra_2_tr: extra_2_trInputValue,

      extra_3_en: extra_3_enInputValue,
      extra_3_uk: extra_3_ukInputValue,
      extra_3_tr: extra_3_trInputValue,
    };

    if (Object.values(errorStates).every((elem) => elem == false)) {
      updateCompany(companyToUpdate);
    }
  };

  return (
    <ModalComponent
      title="Şirket Verisi Ekle"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="flex flex-col gap-2">
        <InputComponent
          errortext={errorStates.companyNameInputError}
          labeltext="Şirket İsmi"
          placeholdertext="Şirket İsmi"
          value={companyNameInputValue}
          setvalue={setCompanyNameInputValue}
        />
        <InputComponent
          errortext={errorStates.competentNameInputError}
          labeltext="Yetkili İsmi"
          placeholdertext="Yetkili İsmi"
          value={competentNameInputValue}
          setvalue={setCompetentNameInputValue}
        />
        <InputComponent
          errortext={errorStates.tel1InputError}
          labeltext="Telefon 1"
          placeholdertext="Telefon 1"
          value={tel1InputValue}
          setvalue={setTel1InputValue}
        />
        <InputComponent
          errortext={errorStates.tel2InputError}
          labeltext="Telefon 2"
          placeholdertext="Telefon 2"
          value={tel2InputValue}
          setvalue={setTel2InputValue}
        />
        <InputComponent
          errortext={errorStates.faxInputError}
          labeltext="Fax Numarası"
          placeholdertext="Fax Numarası"
          value={faxInputVAlue}
          setvalue={setFaxInputValue}
        />
        <InputComponent
          errortext={errorStates.email1InputError}
          labeltext="Email 1"
          placeholdertext="Email 1"
          value={email1InputValue}
          setvalue={setEmail1InputValue}
        />
        <InputComponent
          errortext={errorStates.email2InputError}
          labeltext="Email 2"
          placeholdertext="Email 2"
          value={email2InputValue}
          setvalue={setEmail2InputValue}
        />
        <InputComponent
          errortext={errorStates.addressInputError}
          labeltext="Adres"
          placeholdertext="Adres"
          value={addressInputValue}
          setvalue={setAddressInputValue}
        />
        <InputComponent
          errortext={errorStates.address_enInputError}
          labeltext="Address English"
          placeholdertext="Address English "
          value={address_enInputValue}
          setvalue={setAddress_enInputValue}
        />
        <InputComponent
          errortext={errorStates.address_ukInputError}
          labeltext="Address Ukraininan"
          placeholdertext="Address Ukrainian"
          value={address_ukInputValue}
          setvalue={setAddress_ukInputValue}
        />
        <InputComponent
          errortext={errorStates.address_trInputError}
          labeltext="Adres Türkçe"
          placeholdertext="Adres Türkçe"
          value={address_trInputValue}
          setvalue={setAddress_trInputValue}
        />
        <InputComponent
          errortext={errorStates.taxNumberInputError}
          labeltext="Vergi Numarası"
          placeholdertext="Vergi Numarası"
          value={taxNumberInputValue}
          setvalue={setTaxNumberInputValue}
        />
        <InputComponent
          errortext={errorStates.bankNameInputError}
          labeltext="Banka Adı"
          placeholdertext="Banka Adı"
          value={bankNameInputValue}
          setvalue={setBankNameInputValue}
        />
        <InputComponent
          errortext={errorStates.bankAccountNumberInputError}
          labeltext="Banka Hesap Numarası"
          placeholdertext="Banka Hesap Numarası"
          value={bankAccountNumberInputValue}
          setvalue={setBankAccountNumberInputValue}
        />
        <InputComponent
          errortext={errorStates.bankMFOInputError}
          labeltext="Banka MFO"
          placeholdertext="Banka MFO"
          value={bankMFOInputValue}
          setvalue={setBankMFOInputValue}
        />
        <InputComponent
          errortext={errorStates.ibanInputError}
          labeltext="IBAN"
          placeholdertext="IBAN"
          value={ibanInputValue}
          setvalue={setIbanInputValue}
        />
        <InputComponent
          errortext={errorStates.kdvRatePercentInputError}
          type="number"
          step={0.01}
          min={0}
          labeltext="KDV Oranı %"
          placeholdertext="KDV Oranı %"
          value={kdvRatePercentInputValue}
          setvalue={setKdvRatePercentInputValue}
        />
        <InputComponent
          errortext={errorStates.extra1InputError}
          labeltext="Extra 1"
          placeholdertext="Extra 1"
          value={extra1InputValue}
          setvalue={setExtra1InputValue}
        />
        <InputComponent
          errortext={errorStates.extra2InputError}
          labeltext="Extra 2"
          placeholdertext="Extra 2"
          value={extra2InputValue}
          setvalue={setExtra2InputValue}
        />
        <InputComponent
          errortext={errorStates.extra3InputError}
          labeltext="Extra 3"
          placeholdertext="Extra 3"
          value={extra3InputValue}
          setvalue={setExtra3InputValue}
        />
        <InputComponent
          errortext={errorStates.extra_1_enInputError}
          labeltext="Extra 1 English"
          placeholdertext="Extra 1 English"
          value={extra_1_enInputValue}
          setvalue={setExtra_1_enInputValue}
        />
        <InputComponent
          errortext={errorStates.extra_1_ukInputError}
          labeltext="Extra 1 Ukrainian"
          placeholdertext="Extra 1 Ukrainian"
          value={extra_1_ukInputValue}
          setvalue={setExtra_1_ukInputValue}
        />
        <InputComponent
          errortext={errorStates.extra_1_trInputError}
          labeltext="Extra 1 Türkçe"
          placeholdertext="Extra 1 Türkçe"
          value={extra_1_trInputValue}
          setvalue={setExtra_1_trInputValue}
        />
        <InputComponent
          errortext={errorStates.extra_2_enInputError}
          labeltext="Extra 2 English"
          placeholdertext="Extra 2 English"
          value={extra_2_enInputValue}
          setvalue={setExtra_2_enInputValue}
        />
        <InputComponent
          errortext={errorStates.extra_2_ukInputError}
          labeltext="Extra 2 Ukrainian"
          placeholdertext="Extra 2 Ukrainian"
          value={extra_2_ukInputValue}
          setvalue={setExtra_2_ukInputValue}
        />
        <InputComponent
          errortext={errorStates.extra_2_trInputError}
          labeltext="Extra 2 Türkçe"
          placeholdertext="Extra 2 Türkçe"
          value={extra_2_trInputValue}
          setvalue={setExtra_2_trInputValue}
        />
        <InputComponent
          errortext={errorStates.extra_3_enInputError}
          labeltext="Extra 3 English"
          placeholdertext="Extra 3 English"
          value={extra_3_enInputValue}
          setvalue={setExtra_3_enInputValue}
        />
        <InputComponent
          errortext={errorStates.extra_3_ukInputError}
          labeltext="Extra 3 Ukrainian"
          placeholdertext="Extra 3 Ukrainian"
          value={extra_3_ukInputValue}
          setvalue={setExtra_3_ukInputValue}
        />
        <InputComponent
          errortext={errorStates.extra_3_trInputError}
          labeltext="Extra 3 Türkçe"
          placeholdertext="Extra 3 Türkçe"
          value={extra_3_trInputValue}
          setvalue={setExtra_3_trInputValue}
        />
        <ButtonComponent
          onClick={submitHandler}
          text="Şirket Verisini Güncelle"
          classname="w-[95%] m-auto  mt-5 bg-green-500 px-4 py-2 rounded-md text-white "
        />
      </div>
    </ModalComponent>
  );
}
