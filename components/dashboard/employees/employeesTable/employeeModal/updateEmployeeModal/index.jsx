import ButtonComponent from "@/globalElements/button";
import InputComponent from "@/globalElements/input";
import ModalComponent from "@/globalElements/modal";
import SelectComponent from "@/globalElements/select";
import useEmployeeStore from "@/zustand/fetchOperations/employee";
import { useState } from "react";

export default function UpdateEmployeeModal({
  isOpen,
  setIsOpen,
  data,
  userRoles,
}) {
  const updateEmployee = useEmployeeStore((state) => state.updateEmployee);

  const [errorStates, setErrorStates] = useState({
    nameInputError: false,
    surnameInputError: false,
    phoneNumberInputError: false,
    roleInputError: false,
    passwordInputError: false,
    salaryInputError: false,
    bonusInputError: false,
    maxDiscountRateInputError: false,
    emailInputError: false,
  });

  const [nameInputValue, setNameInputValue] = useState(data.name);
  const [surnameInputValue, setSurnameInputValue] = useState(data.surname);
  const [phoneNumberInputValue, setPhoneNumberInputValue] = useState(
    data.user.phoneNumber
  );
  const [passwordInputValue, setPasswordInputValue] = useState(
    data.user.password
  );
  const [roleValue, setRoleValue] = useState(data.user.role);

  const [emailInputValue, setEmailInputValue] = useState(data.user.email);
  const [addressInputValue, setAddressInputValue] = useState(data.address);

  const [salaryInputValue, setSalaryInputValue] = useState(data.salary);
  const [bonusInputValue, setBonusInputValue] = useState(data.bonus);
  const [maxDiscountRateInputValue, setMaxDiscountRateInputValue] = useState(
    data.maxDiscountRatePercent
  );

  const [managerCommentInputValue, setManagerCommentInputValue] = useState(
    data.managerComment
  );
  const [managerComment_enInputValue, setManagerComment_enInputValue] =
    useState(data.managerComment_en);
  const [managerComment_ukInputValue, setManagerComment_ukInputValue] =
    useState(data.managerComment_uk);
  const [managerComment_trInputValue, setManagerComment_trInputValue] =
    useState(data.managerComment_tr);

  // Şirket Verisi Güncelleme

  const submitHandler = (e) => {
    e.preventDefault();

    setErrorStates({
      ...errorStates,
      nameInputError:
        nameInputValue.trim() == "" ? "Çalışan İsmi Boş Bırakılmaz" : false,
      phoneNumberInputError:
        phoneNumberInputValue.trim() == ""
          ? "Telefon Bilgisi Boş Bırakılmaz"
          : false,

      emailInputError:
        emailInputValue.trim() == "" ? "Email Bilgisi Boş Bırakılmaz" : false,
    });

    const employeeToUpdate = {
      id: data.id,
      userId: data.user.id,
      phoneNumber: phoneNumberInputValue,
      password: passwordInputValue,
      role: roleValue,
      name: nameInputValue,
      surname: surnameInputValue,
      address: addressInputValue,
      email: emailInputValue,
      salary: parseInt(salaryInputValue),
      bonus: parseInt(bonusInputValue),
      maxDiscountRatePercent: parseFloat(maxDiscountRateInputValue),
      managerComment: managerCommentInputValue,
      managerComment_en: managerComment_enInputValue,
      managerComment_tr: managerComment_trInputValue,
      managerComment_uk: managerComment_ukInputValue,
    };

    if (Object.values(errorStates).every((elem) => elem == false)) {
      updateEmployee(employeeToUpdate);
    }
  };

  return (
    <ModalComponent
      title="Çalışan Verisini Düzenle"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="flex flex-col gap-2">
        <InputComponent
          errortext={errorStates.nameInputError}
          labeltext="Çalışan İsmi"
          placeholdertext="Çalışan İsmi"
          value={nameInputValue}
          setvalue={setNameInputValue}
        />
        <InputComponent
          errortext={errorStates.surnameInputError}
          labeltext="Çalışan Soyadı"
          placeholdertext="Çalışan Soyadı"
          value={surnameInputValue}
          setvalue={setSurnameInputValue}
        />
        <InputComponent
          errortext={errorStates.phoneNumberInputError}
          labeltext="Telefon numarası"
          placeholdertext="Çalışanın giriş yapmak için kullanacağı Telefon numarası"
          value={phoneNumberInputValue}
          setvalue={setPhoneNumberInputValue}
        />
        <SelectComponent
          errortext={errorStates.roleInputError}
          labeltext="Çalışanın Rolü / Yetkisi"
          placeholdertext="Rol Seçiniz.."
          setvalue={setRoleValue}
          value={roleValue}
          data={userRoles}
        />
        <InputComponent
          errortext={errorStates.passwordInputError}
          labeltext="Çalışanın sisteme giriş yapmak için kullanacağı şifre"
          placeholdertext="Şifre"
          type="password"
          value={passwordInputValue}
          setvalue={setPasswordInputValue}
        />
        <InputComponent
          errortext={errorStates.emailInputError}
          labeltext="Email"
          placeholdertext="Email"
          value={emailInputValue}
          setvalue={setEmailInputValue}
        />
        <InputComponent
          labeltext="Adres"
          placeholdertext="Adres"
          value={addressInputValue}
          setvalue={setAddressInputValue}
        />
        <InputComponent
          errortext={errorStates.salaryInputError}
          labeltext="Maaş"
          placeholdertext="Maaş"
          value={salaryInputValue}
          type="number"
          setvalue={setSalaryInputValue}
        />
        <InputComponent
          errortext={errorStates.bonusInputError}
          labeltext="Bonus"
          placeholdertext="Bonus "
          value={bonusInputValue}
          setvalue={setBonusInputValue}
        />
        <InputComponent
          errortext={errorStates.maxDiscountRateInputError}
          labeltext="Maksimum İndirim Oranı %"
          placeholdertext="Maksimum İndirim Oranı %"
          value={maxDiscountRateInputValue}
          setvalue={setMaxDiscountRateInputValue}
        />
        <InputComponent
          labeltext="Yönetici Yorumu"
          placeholdertext="Yönetici Yorumu"
          value={managerCommentInputValue}
          setvalue={setManagerCommentInputValue}
        />
        <InputComponent
          labeltext="Yönetici yorumu Türkçe"
          placeholdertext="Yönetici Yorumu Türkçe"
          value={managerComment_trInputValue}
          setvalue={setManagerComment_trInputValue}
        />
        <InputComponent
          labeltext="Manager Comment English"
          placeholdertext="Manager Comment English"
          value={managerComment_enInputValue}
          setvalue={setManagerComment_enInputValue}
        />
        <InputComponent
          labeltext="Manager Comment Ukrainian"
          placeholdertext="Manager Comment Ukrainian"
          value={managerComment_ukInputValue}
          setvalue={setManagerComment_ukInputValue}
        />

        <ButtonComponent
          onClick={submitHandler}
          text="Çalışan Verisini Güncelle"
          classname="w-[95%] m-auto  mt-5 bg-green-500 px-4 py-2 rounded-md text-white "
        />
      </div>
    </ModalComponent>
  );
}
