"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import MiniModalOptionsPlan from "../PlanPage/MiniModalOptionsPlan";
import { formatarNumero } from "../PlanPage/HeaderPlan";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { HomeContext } from "@/Context/HomeContext";

export const HeaderCustos = () => {

  const {custoSelected, setCustoSelected} = useContext(HomeContext)
  const [isModalOptions, setIsModalOptions] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getStorage = localStorage.getItem("custosSelected");
      if (getStorage) {
        const parseData = JSON.parse(getStorage);
        setCustoSelected(parseData);
      }
    }
  }, []);

  const parseValue:number = custoSelected ? parseFloat(custoSelected.valueCusto): 0;

  return (
    <div className="w-full flex flex-col items-center bg-white rounded-b-[30px] pb-5 overflow-x-hidden">
      {custoSelected ? (
        <div className="w-[390px] px-[28px]">
          <Link href="/Pages/Home" passHref>
            <div className="flex gap-1 items-center pt-4 text-blackPrimary">
              <FontAwesomeIcon icon={faAngleLeft} />
              <p>Voltar para a home</p>
            </div>
          </Link>
          <div className="pt-11">
            <div className="w-full flex gap-5 justify-between">
              <div>
                <div className="w-[92px] h-[92px] flex justify-center items-center bg-whitePrimary rounded-full">
                  <Image
                    src={custoSelected.categoryIcon}
                    alt="Imagem do plano"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[28px] text-blackPrimary font-medium">
                  {custoSelected.nameCusto}
                </p>
                <p className="text-blackPrimary">Categoria:</p>
                <p className="text-blackOpacity relative">
                  {custoSelected.categoryCusto}
                </p>
              </div>
              <div className="relative">
                <button className="outline-none" onClick={()=> setIsModalOptions(!isModalOptions)}>
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    className="text-blackOpacity text-4xl"
                  />
                </button>
                {isModalOptions && <MiniModalOptionsPlan />}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[5px] pt-6">
            <div>
              <p className="font-medium text-blackPrimary">Valor atual</p>
              <p className="text-xl text-bluePrimary font-medium">
                {formatarNumero(parseValue)}
              </p>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex gap-[37px]">
              <button className="bg-bluePrimary rounded-[20px] px-3 py-[10px]">
                <p className="text-white font-semibold">Adicionar custo</p>
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
