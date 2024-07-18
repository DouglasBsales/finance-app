import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const FormLogin = () => {
  return (
    <div className="flex flex-col items-center pt-[40px]">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-semibold text-bluePrimary">Faça login</p>
        <p className="text-blackSecondary font-light text-xs">
          Entre com suas informações
        </p>
      </div>
      <div className="pt-[74px]">
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
        <div className="pt-4">
          <div className="flex">
            <p className=" text-blackSecondary pb-1">Senha:</p>
            <p className="text-redPrimary">*</p>
          </div>
          <div>
            <div className="w-[333px] h-[40px] flex items-center bg-white rounded-md ">
              <div className="w-full flex items-center justify-between">
                <input
                  type={"password"}
                  placeholder="***********"
                  className={`w-full h-[40px] outline-none text-blackPrimary pl-3 rounded-md bg-transparent border border-[#E7E8EC] focus:border-bluePrimary`}
                />
              </div>
            </div>
            <div className="w-full flex justify-end pt-2">
              <p className="text-xs text-bluePrimary">Esqueci minha senha</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
