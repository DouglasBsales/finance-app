"use client";

import { useContext, useEffect, useState } from "react";
import { HomeContext } from "@/Context/HomeContext";

import Lottie from "lottie-react";
import constructor from "../../../public/constructor.json";

import Image from "next/image";
import Link from "next/link";

import MiniModalOptionsPlan from "./MiniModalOptionsPlan"
import ModalSentvalueWallet from "./ModalSentValueWallet";
import ModalExitValueWallet from "./ModalExitValueWallet";

import {faAngleLeft, faCircleArrowUp, faCircleChevronDown, faEllipsis,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ContextPlan } from "@/Context/ContextPlan";

export function formatarNumero(numero: number) {
  let partes = numero.toFixed(2).split(".");
  partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return partes.join(",");
}

const HeaderPlan = () => {
  const {planSelected, setPlanSelected,showModalSentValue, setShowModalSentValue, setMethodWallet, setShowModalExitValue, showModalExitValue } = useContext(ContextPlan)
  const [showOptionsPlan, setShowOptionsPlan] = useState(false);

  useEffect(() => {
    const getterPlanDataStorage = () => {
      if (typeof window !== "undefined") {
        const planSelectIfIdStorage: any = localStorage.getItem("planSelected");
        const convertedPlanSelectIfIdStorage: any = JSON.parse(
          planSelectIfIdStorage
        );
        setPlanSelected(convertedPlanSelectIfIdStorage);
      }
    };

    getterPlanDataStorage();
  }, []);

  const openModalSentWallet = () => {
    setShowModalSentValue(true);
    setMethodWallet("entrada")
  };

  const openModalExitWallet = () => {
    setShowModalExitValue(true);
    setMethodWallet("saida")
  };


  return (
    <div className="w-full flex flex-col items-center bg-white rounded-b-[30px] pb-5 overflow-x-hidden">
      {planSelected ? (
        <div className="w-[390px] px-[28px]">
          <Link
            href="/Pages/Home"
            className="flex gap-1 items-center pt-4 text-blackPrimary"
          >
            <FontAwesomeIcon icon={faAngleLeft} />
            <p>Voltar para a home</p>
          </Link>
          <div className="pt-11 ">
            <div className="w-full flex gap-5 justify-between">
              <div>
                <div className="w-[92px] h-[92px] flex justify-center items-center bg-whitePrimary rounded-full">
                  {planSelected ? (
                    <Image
                      src={planSelected.data.iconCategory}
                      alt="Imagem do plano"
                      width={50}
                      height={50}
                    />
                  ) : (
                    <div>Imagem não disponível</div>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center ">
                <p className="text-[28px] text-blackPrimary font-medium">
                  {planSelected
                    ? planSelected.data.nameOfPlan
                    : "Nome do Plano"}
                </p>
                <p className="text-blackprimary">Categoria:</p>
                <p className="text-blackOpacity relative">
                  {planSelected
                    ? planSelected.data.categorySelected
                    : "Não foi possível selecionar a categoria"}
                </p>
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowOptionsPlan(!showOptionsPlan)}
                  className="outline-none"
                >
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    className="text-blackOpacity text-4xl"
                  />
                </button>
                {showOptionsPlan && <MiniModalOptionsPlan />}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[5px] pt-6">
            <div>
              <p className="font-medium text-blackPrimary">Valor atual</p>
              <p className="text-xl text-bluePrimary font-medium">
                {planSelected ? (
                  <p>R$ {formatarNumero(planSelected.data.valuePlanWallet)}</p>
                ) : (
                  "Carregando seu saldo..."
                )}
              </p>
            </div>
            <div>
              <p className="text-blackPrimary font-medium">
                Meta a ser atingida
              </p>
              <p className="text-xl text-blackOpacity font-medium">
                {planSelected ? (
                  <p>R$ {formatarNumero(planSelected.data.valueOfPlan)}</p>
                ) : (
                  "Meta não definida"
                )}
              </p>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex gap-[37px]">
              <button
                className=" w-[144px] h-[40px] flex justify-center items-center gap-1 bg-whitePrimary rounded-[20px] font-medium"
                onClick={openModalExitWallet}
              >
                <FontAwesomeIcon
                  icon={faCircleChevronDown}
                  className="text-bluePrimary text-2xl"
                />
                <p className="text-blackPrimary">Saída</p>
              </button>
              <button
                className="w-[144px] h-[40px] flex justify-center items-center gap-1 bg-whitePrimary rounded-[20px] font-medium"
                onClick={openModalSentWallet}
              >
                <FontAwesomeIcon
                  icon={faCircleArrowUp}
                  className="text-bluePrimary text-2xl"
                />
                <p className="text-blackPrimary">Entrada</p>
              </button>
            </div>
          </div>
        </div>
      ) : (
        // alterado agora ver se está funcionando tudo ok!
        <div className="w-full fixed inset-0 bg-white flex items-center justify-center z-50">
          <div className="flex flex-col items-center px-7">
            <p className="text-blackOpacity text-center">
              Seu plano está sendo criado,
            </p>
            <p className="text-blackOpacity text-center"> aguarde um pouco</p>
            <Lottie
              animationData={constructor}
              className="relative bottom-12"
            ></Lottie>
          </div>
          {/* ALTERAR ISSO URGENTE PARA LOADING COM LOTTIE*/}
        </div>
      )}
      {showModalSentValue && <ModalSentvalueWallet />}
      {showModalExitValue && (<ModalExitValueWallet/>)}
    </div>
  );
};

export default HeaderPlan;
