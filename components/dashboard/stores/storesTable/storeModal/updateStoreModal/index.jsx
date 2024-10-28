import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import ModalComponent from "@/globalElements/modal";
import useStoreStore from "@/zustand/fetchOperations/store";
import { useState } from "react";

export default function UpdateStoreModal({ isOpen, setIsOpen, data }) {
  const updateStore = useStoreStore((state) => state.updateStore);

  const [errorStates, setErrorStates] = useState({
    nameInputError: false,
    name_trInputError: false,
    name_enInputError: false,
    name_ukInputError: false,
    descriptionInputError: false,
    description_trInputError: false,
    description_enInputError: false,
    description_ukInputError: false,

    countryInputError: false,
    stateInputError: false,
    maxDiscountRateInputError: false,
    maxBonusRateInputError: false,
    tel1InputError: false,
    tel2InputError: false,
    faxInputError: false,
    email1InputError: false,
    email2InputError: false,
    addressInputError: false,
    address_enInputError: false,
    address_ukInputError: false,
    address_trInputError: false,

    extra1InputError: false,
    extra2InputError: false,
    extra3InputError: false,
  });

  const [nameInputValue, setNameInputValue] = useState(data.name);
  const [name_trInputValue, setName_trInputValue] = useState(data.name_tr);
  const [name_enInputValue, setName_enInputValue] = useState(data.name_en);
  const [name_ukInputValue, setName_ukInputValue] = useState(data.name_uk);
  const [descriptionInputValue, setDescriptionInputValue] = useState(
    data.description
  );
  const [description_trInputValue, setDescription_trInputValue] = useState(
    data.description_tr
  );
  const [description_enInputValue, setDescription_enInputValue] = useState(
    data.description_en
  );
  const [description_ukInputValue, setDescription_ukInputValue] = useState(
    data.description_uk
  );

  const [countryInputValue, setCountryInputValue] = useState(data.country);
  const [stateInputValue, setStateInputValue] = useState(data.state);
  const [maxDiscountRateInputValue, setMaxDiscountRateInputValue] = useState(
    data.maxDiscountRate
  );
  const [maxBonusRateInputValue, setMaxBonusRateInputValue] = useState(
    data.maxBonusRate
  );

  const [tel1InputValue, setTel1InputValue] = useState(data.tel_1);
  const [tel2InputValue, setTel2InputValue] = useState(data.tel_2);
  const [faxInputVAlue, setFaxInputValue] = useState(data.fax);
  const [email1InputValue, setEmail1InputValue] = useState(data.email_1);
  const [email2InputValue, setEmail2InputValue] = useState(data.email_2);

  const [addressInputValue, setAddressInputValue] = useState(data.address);

  const [address_enInputValue, setAddress_enInputValue] = useState(
    data.address_en
  );
  const [address_ukInputValue, setAddress_ukInputValue] = useState(
    data.address_uk
  );
  const [address_trInputValue, setAddress_trInputValue] = useState(
    data.address_tr
  );

  const [extra1InputValue, setExtra1InputValue] = useState(data.extra_1);
  const [extra2InputValue, setExtra2InputValue] = useState(data.extra_2);
  const [extra3InputValue, setExtra3InputValue] = useState(data.extra_3);

  // Mağaza Verisi Güncelleme

  const submitHandler = (e) => {
    e.preventDefault();

    setErrorStates({
      ...errorStates,
      storeNameInputError:
        nameInputValue.trim() == "" ? "Mağaza İsmi Boş Bırakılmaz" : false,
      tel1InputError:
        tel1InputValue.trim() == "" ? "Telefon Bilgisi Boş Bırakılmaz" : false,

      addressInputError:
        addressInputValue.trim() == "" ? "Adres Bilgisi Boş Bırakılmaz" : false,
      countryInputError:
        countryInputValue.trim() == "" ? "Ülke Bilgisi Boş Bırakılmaz" : false,
      stateInputError:
        stateInputValue.trim() == "" ? "Şehir Bilgisi Boş Bırakılmaz" : false,
    });

    const storeToUpdate = {
      id: data.id,
      name: nameInputValue,
      description: descriptionInputValue,
      name_tr: name_trInputValue,
      name_en: name_enInputValue,
      name_uk: name_ukInputValue,
      description_tr: description_trInputValue,
      description_en: description_enInputValue,
      description_uk: description_ukInputValue,

      tel_1: tel1InputValue,
      tel_2: tel2InputValue,

      fax: faxInputVAlue,

      email_1: email1InputValue,
      email_2: email2InputValue,

      country: countryInputValue,
      state: stateInputValue,

      address: addressInputValue,

      address_tr: address_trInputValue,
      address_en: address_enInputValue,
      address_uk: address_ukInputValue,

      maxDiscountRate: parseFloat(maxDiscountRateInputValue),
      maxBonusRate: parseFloat(maxBonusRateInputValue),

      extra_1: extra1InputValue,
      extra_2: extra2InputValue,
      extra_3: extra3InputValue,
    };

    if (Object.values(errorStates).every((elem) => elem == false)) {
      updateStore(storeToUpdate);
    }
  };

  return (
    <ModalComponent
      title="Mağaza Verisi Ekle"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="flex flex-col gap-2">
        <InputComponent
          errortext={errorStates.nameInputError}
          labeltext="Mağaza İsmi"
          placeholdertext="Mağaza İsmi"
          value={nameInputValue}
          setvalue={setNameInputValue}
        />
        <InputComponent
          errortext={errorStates.name_trInputError}
          labeltext="Mağaza Adı Türkçe"
          placeholdertext="Mağaza Adı Türkçe"
          value={name_trInputValue}
          setvalue={setName_trInputValue}
        />
        <InputComponent
          errortext={errorStates.name_enInputError}
          labeltext="Store Name English"
          placeholdertext="Store Name English"
          value={name_enInputValue}
          setvalue={setName_enInputValue}
        />
        <InputComponent
          errortext={errorStates.name_ukInputError}
          labeltext="Store Name Ukrainian"
          placeholdertext="Store Name Ukrainian"
          value={name_ukInputValue}
          setvalue={setName_ukInputValue}
        />
        <InputComponent
          errortext={errorStates.descriptionInputError}
          labeltext="Mağaza Açıklaması"
          placeholdertext="Mağaza Açıklaması"
          value={descriptionInputValue}
          setvalue={setDescriptionInputValue}
        />
        <InputComponent
          errortext={errorStates.description_trInputError}
          labeltext="Mağaza Açıklaması Türkçe"
          placeholdertext="Mağaza Açıklaması Türkçe"
          value={description_trInputValue}
          setvalue={setDescription_trInputValue}
        />
        <InputComponent
          errortext={errorStates.description_enInputError}
          labeltext="Store Description English"
          placeholdertext="Store Description English"
          value={description_enInputValue}
          setvalue={setDescription_enInputValue}
        />
        <InputComponent
          errortext={errorStates.description_ukInputError}
          labeltext="Store Description Ukrainian"
          placeholdertext="Store Description Ukrainian"
          value={description_ukInputValue}
          setvalue={setDescription_ukInputValue}
        />
        <InputComponent
          errortext={errorStates.maxDiscountRateInputError}
          type="number"
          step={0.01}
          min={0}
          labeltext="Maksimum İndirim Oranı %"
          placeholdertext="Maksimum İndirim %"
          value={maxDiscountRateInputValue}
          setvalue={setMaxDiscountRateInputValue}
        />
        <InputComponent
          errortext={errorStates.maxBonusRateInputError}
          type="number"
          step={0.01}
          min={0}
          labeltext="Maksimum Bonus Oranı %"
          placeholdertext="Maksimum Bonus %"
          value={maxBonusRateInputValue}
          setvalue={setMaxBonusRateInputValue}
        />
        <InputComponent
          errortext={errorStates.countryInputError}
          labeltext="Ülke"
          placeholdertext="Ülke"
          value={countryInputValue}
          setvalue={setCountryInputValue}
        />
        <InputComponent
          errortext={errorStates.stateInputError}
          labeltext="Şehir"
          placeholdertext="Şehir"
          value={stateInputValue}
          setvalue={setStateInputValue}
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

        <ButtonComponent
          onClick={submitHandler}
          text="Mağaza Verisini Güncelle"
          classname="w-[95%] m-auto  mt-5 bg-green-500 px-4 py-2 rounded-md text-white "
        />
      </div>
    </ModalComponent>
  );
}
