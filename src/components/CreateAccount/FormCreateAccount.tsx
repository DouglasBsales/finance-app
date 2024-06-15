import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const FormCreateAccount = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  return (
    <div className="w-full flex-col pt-[41px]">
      <div>
        <p className="text-3xl font-semibold text-bluePrimary">Criar conta</p>
        <p className="text-blackOpacity font-light text-xs">
          Bem-vindo ao FinanceApp: controle total de finanças.
        </p>
      </div>
      <div className="pt-[41px]">
        <div>
          <p className="font-semibold text-blackPrimary pb-1">Nome:</p>
          <div className="w-[333px] h-[37px] flex items-center pl-2 bg-white rounded-md ">
            <input
              type="text"
              placeholder="Seu nome"
              className=" outline-none text-blackPrimary"
            />
          </div>
        </div>
        <div className="pt-4">
          <p className="font-semibold text-blackPrimary pb-1">Sobrenome:</p>
          <div className="w-[333px] h-[37px] flex items-center pl-2 bg-white rounded-md ">
            <input
              type="text"
              placeholder="Seu sobrenome"
              className=" outline-none text-blackPrimary"
            />
          </div>
        </div>
        <div className="pt-4">
          <p className="font-semibold text-blackPrimary pb-1">Email:</p>
          <div className="w-[333px] h-[37px] flex items-center pl-2 bg-white rounded-md ">
            <input
              type="email"
              placeholder="Seu email"
              className=" outline-none text-blackPrimary"
            />
          </div>
        </div>
        <div className="pt-4">
          <p className="font-semibold text-blackPrimary pb-1">Senha:</p>
          <div className="w-[333px] h-[37px] flex items-center pl-2 bg-white rounded-md ">
            <div className="w-full flex items-center justify-between">
              <input
                type={showPassword ? "password" : "text"}
                placeholder="Sua senha"
                className=" outline-none text-blackPrimary"
              />
              <button
                className="outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="text-blackOpacity pr-4"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="text-blackOpacity pr-4"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <p className="font-semibold text-blackPrimary pb-1">
            Confirme sua senha:
          </p>
          <div className="w-[333px] h-[37px] flex items-center pl-2 bg-white rounded-md ">
            <div className="w-full flex items-center justify-between">
              <input
                type={showConfirmPassword ? "password" : "text"}
                placeholder="Sua senha"
                className=" outline-none text-blackPrimary"
              />
              <button
                className="outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="text-blackOpacity pr-4"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="text-blackOpacity pr-4"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <p className="font-semibold text-blackPrimary pb-1">
            Confirme sua senha:
          </p>
          <div className="w-[333px] h-[37px] flex items-center pl-2 bg-white rounded-md ">
            <div className="w-full flex items-center justify-between">
              <input
                type="text"
                placeholder="(81) 9000-0000"
                className=" outline-none text-blackPrimary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCreateAccount;
