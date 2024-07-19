import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const FormCreateAccount = () => {
  const [showPassword, setShowPassword] = useState(true);

  const [phone, setPhone] = useState("");

  const maskPhone = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 3) return phoneNumber;
    if (phoneNumberLength < 8) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    }
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2,7)}-${phoneNumber.slice(7, 11)}`;
  };

  const handleInputChange = (e: any) => {
    const maskedValue = maskPhone(e.target.value);
    setPhone(maskedValue);
  };

  return (
    <div className="w-[330px] flex flex-col items-center pt-[40px]">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-semibold text-bluePrimary">
          Crie sua conta
        </p>
        <p className="text-blackSecondary font-light text-xs">
          Preencha seus dados
        </p>
      </div>
      <div className="w-full flex flex-col gap-4 pt-[20px]">
        <div>
          <div className="flex">
            <p className=" text-blackSecondary pb-1">Nome:</p>
            <p className="text-redPrimary">*</p>
          </div>
          <input
            type="text"
            placeholder="nome@example.com"
            className={`w-full h-[40px] outline-none text-blackPrimary pl-3 rounded-md bg-transparent border border-[#E7E8EC] focus:border-bluePrimary`}
          />
        </div>
        <div>
          <div className="flex">
            <p className=" text-blackSecondary pb-1">Email:</p>
            <p className="text-redPrimary">*</p>
          </div>
          <input
            type="text"
            placeholder="nome@example.com"
            className={`w-full h-[40px] outline-none text-blackPrimary pl-3 rounded-md bg-transparent border border-[#E7E8EC] focus:border-bluePrimary`}
          />
        </div>
        <div>
          <div className="flex">
            <p className=" text-blackSecondary pb-1">Senha:</p>
            <p className="text-redPrimary">*</p>
          </div>
          <div>
            <input
              type="password"
              placeholder="•••••••••"
              className={`w-full h-[40px] outline-none text-blackPrimary pl-3 rounded-md bg-transparent border border-[#E7E8EC] focus:border-bluePrimary`}
            />
          </div>
        </div>
        <div>
          <div className="flex">
            <p className=" text-blackSecondary pb-1">Confirmar senha:</p>
            <p className="text-redPrimary">*</p>
          </div>
          <div>
            <input
              type="password"
              placeholder="•••••••••"
              className={`w-full h-[40px] outline-none text-blackPrimary pl-3 rounded-md bg-transparent border border-[#E7E8EC] focus:border-bluePrimary`}
            />
          </div>
        </div>
        <div>
          <div className="flex">
            <p className=" text-blackSecondary pb-1">Telefone:</p>
            <p className="text-redPrimary">*</p>
          </div>
          <div>
            <input
              type="text"
              value={phone}
              onChange={handleInputChange}
              placeholder="(00) 00000-0000"
              className="w-full h-[40px] outline-none text-blackPrimary pl-3 rounded-md bg-transparent border border-[#E7E8EC] focus:border-bluePrimary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCreateAccount;
