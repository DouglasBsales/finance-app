import Image from "next/image";

import { useContext, useState } from "react";
import { HomeContext } from "@/Context/HomeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowUp,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import ModalSentValue from "./ModalSentValue";
import { ModalExitValue } from "./ModalExitValue";
import { formatarNumero } from "../PlanPage/HeaderPlan";

export const Header = () => {
  const { dataUser, valueWallet, setSetTypeTransations } =
    useContext(HomeContext);

  const [showValueWallet, setShowValueWallet] = useState(false);

  const [openModalSentValue, setOpenModalSentValue] = useState<boolean>(false);

  const [openModalExitValue, setOpenModalExitValue] = useState<boolean>(false);

  const openModalValue = () => {
    setOpenModalSentValue(true);
    setSetTypeTransations("walletHomeSent");
  };

  const openModalExitValueFn = () => {
    setOpenModalExitValue(true);
    setSetTypeTransations("walletHomeExit");
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col justify-center items-center pt-[20px]">
        <p className="text-[#62636C]">Seu saldo</p>
        {valueWallet.length > 0 ? (
          valueWallet.map((wallet: any, index: number) => (
            <div
              key={index}
              className="w-full flex items-center justify-center gap-[34px]"
            >
              <div className="flex items-center">
                <p className="text-center font-semibold text-4xl text-bluePrimary pr-3">
                  R$
                </p>
                {showValueWallet ? (
                  <p
                    className={` text-center font-semibold text-4xl text-bluePrimary pl-1`}
                  >
                    {formatarNumero(wallet.valueWallet)}
                  </p>
                ) : (
                  <p className="text-bluePrimary text-4xl pr-1">******</p>
                )}
              </div>
              <div>
                <button
                  onClick={() => setShowValueWallet(!showValueWallet)}
                  className="flex items-center"
                >
                  {showValueWallet ? (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="text-bluePrimary text-lg"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-bluePrimary text-lg"
                    />
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">Carregando saldo...</p>
        )}
      </div>
      <div className="px-[28px] pt-[55px] pb-5 border-b border-[#EFF0F3]">
        <div className="flex gap-[37px]">
          <button
            className=" w-[144px] h-[40px] flex justify-center items-center gap-1 bg-[#F5F5F7] rounded-[20px] font-medium shadow-md shadow-[#00000018]"
            onClick={openModalExitValueFn}
          >
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              className="text-[#62636C] text-2xl"
            />
            <p className="text-[#62636C]">Saída</p>
          </button>
          <button
            className="w-[144px] h-[40px] flex justify-center items-center gap-1 bg-[#2E2E2E] rounded-[20px] font-medium shadow-md shadow-[#00000056] "
            onClick={openModalValue}
          >
            <FontAwesomeIcon
              icon={faCircleArrowUp}
              className="text-white text-xl"
            />
            <p className="text-white ">Entrada</p>
          </button>
        </div>
      </div>
      {openModalSentValue && (
        <ModalSentValue setOpenModalSentValue={setOpenModalSentValue} />
      )}
      {openModalExitValue && (
        <ModalExitValue setOpenModalSentValue={setOpenModalExitValue} />
      )}
    </div>
  );
};
