import Image from "next/image";

import { useContext, useState } from "react";
import { HomeContext } from "@/Context/HomeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleArrowUp,faCircleChevronDown,} from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import ModalSentValue from "./ModalSentValue";
import { ModalExitValue } from "./ModalExitValue";
import { formatarNumero } from "../PlanPage/HeaderPlan";


export const Header = () => {
  const { dataUser, valueWallet } = useContext(HomeContext);

  const [showValueWallet, setShowValueWallet] = useState(false);

  const [openModalSentValue, setOpenModalSentValue] = useState<boolean>(false)

  const [openModalExitValue, setOpenModalExitValue] = useState<boolean>(false)

  const openModalValue = ()=> {
    setOpenModalSentValue(true)
  }

  const openModalExitValueFn = ()=> {
    setOpenModalExitValue(true)
  }


  return (
    <div className="w-full flex flex-col items-center h-[350px] bg-bluePrimary rounded-b-[30px] overflow-x-hidden ">
      <div className="w-[390px] flex pt-[41px] pl-[28px]">
        <div>
          <Image
            src={dataUser.photoURL}
            alt="foto do usuário"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
        <div className="flex-col justify-center items-center text-center pl-[37px]">
          <p className="text-white">Bem vindo de volta</p>
          <p className="text-white font-semibold text-xl ">{dataUser.name}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center pt-[71px]">
        <p className="text-white">Seu saldo</p>
        {valueWallet.length > 0 ? (
          valueWallet.map((wallet: any, index: number) => (
            <div
              key={index}
              className="w-full flex items-center justify-center gap-3">
              <p
                className={`${
                  showValueWallet
                    ? "bg-blackOpacity px-1 text-blackOpacity"
                    : "bg-transparent px-1 text-white"
                } text-center outline-none font-semibold text-4xl pl-3`}
              >
                R$ {formatarNumero(wallet.valueWallet)}
              </p>
              <button onClick={() => setShowValueWallet(!showValueWallet)} className="flex items-center">
                {showValueWallet ? (
                  <FontAwesomeIcon
                    icon={faEye}
                    className="text-white text-lg"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    className="text-white text-lg"
                  />
                )}
              </button>
            </div>
          ))
        ) : (
          <p className="text-white">Carregando saldo...</p>
        )}
      </div>
      <div className="px-[28px] pt-[55px]">
        <div className="flex gap-[37px]">
          <button className=" w-[144px] h-[40px] flex justify-center items-center gap-1 bg-white rounded-[20px] font-medium" onClick={openModalExitValueFn}>
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              className="text-bluePrimary text-2xl"
            />
            <p className="text-blackPrimary">Saída</p>
          </button>
          <button className="w-[144px] h-[40px] flex justify-center items-center gap-1 bg-white rounded-[20px] font-medium" onClick={ openModalValue }>
            <FontAwesomeIcon
              icon={faCircleArrowUp}
              className="text-bluePrimary text-2xl"
            />
            <p className="text-blackPrimary">Entrada</p>
          </button>
        </div>
      </div>
      {openModalSentValue && <ModalSentValue setOpenModalSentValue={setOpenModalSentValue}/>}
      {openModalExitValue && <ModalExitValue setOpenModalSentValue={ setOpenModalExitValue}/>}
    </div>
  );
};
