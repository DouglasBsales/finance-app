"use client";

import { FunctionComponent, useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import MiniModalOptionsPlan from "../PlanPage/MiniModalOptionsPlan";
import { formatarNumero } from "../PlanPage/HeaderPlan";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { HomeContext } from "@/Context/HomeContext";
import { ModalCustoAdded } from "./ModalCustoAdded";
import { arrayRemove, getDoc, updateDoc } from "firebase/firestore";
import { useQueryClient } from "react-query";

type HeaderCustosProps = {
  valueAllCustos: number;
};

export const HeaderCustos: FunctionComponent<HeaderCustosProps> = ({
  valueAllCustos,
}) => {
  const queryClient = useQueryClient();

  const { custoSelected, setCustoSelected, refDocCustos } =
    useContext(HomeContext);
  const [isModalOptions, setIsModalOptions] = useState<boolean>(false);
  const [isModalCustoAdded, setIsModalCustoAdded] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getStorage = localStorage.getItem("custosSelected");
      if (getStorage) {
        const parseData = JSON.parse(getStorage);
        setCustoSelected(parseData);
      }
    }
  }, []);

  const updateCustos = async () => {
    if (!custoSelected || !refDocCustos) return;

    // Remove o custo selecionado do Firestore

    if (valueAllCustos !== custoSelected.value) {
      await updateDoc(refDocCustos, {
        custos: arrayRemove({
          id: custoSelected.id,
          name: custoSelected.name,
          icon: custoSelected.icon,
          categoryCusto: custoSelected.categoryCusto,
          value: custoSelected.value,
        }),
      });

      // ADIÇÃO DE NOVO CUSTO
      const docSnap: any = await getDoc(refDocCustos);
      const existingCustos = docSnap.data()?.custos || [];

      const custoAtt = {
        id: custoSelected.id,
        name: custoSelected.name,
        icon: custoSelected.icon,
        categoryCusto: custoSelected.categoryCusto,
        value: valueAllCustos,
      };

      const attCustos = [custoAtt, ...existingCustos];
      await updateDoc(refDocCustos, { custos: attCustos });
      queryClient.invalidateQueries("custosData");

      if (typeof window !== "undefined") {
        localStorage.setItem("custosSelected", JSON.stringify(custoAtt));
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-white rounded-b-[30px] pb-5 overflow-x-hidden">
      {custoSelected ? (
        <div className="w-[390px] px-[28px]">
          <Link href="/Pages/Home">
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
                    src={custoSelected.icon}
                    alt="Imagem do plano"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[28px] text-blackPrimary font-medium">
                  {custoSelected.name}
                </p>
                <p className="text-blackPrimary">Categoria:</p>
                <p className="text-blackOpacity relative">
                  {custoSelected.categoryCusto}
                </p>
              </div>
              <div className="relative">
                <button
                  className="outline-none"
                  onClick={() => setIsModalOptions(!isModalOptions)}
                >
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
                R$ {formatarNumero(valueAllCustos)}
              </p>
            </div>
          </div>
          <div className="pt-6">
            <div className="flex gap-[37px]">
              <button
                className="bg-bluePrimary rounded-[20px] px-3 py-[10px]"
                onClick={() => setIsModalCustoAdded(true)}
              >
                <p className="text-white font-semibold">Adicionar custo</p>
              </button>
            </div>
          </div>
          {isModalCustoAdded && (
            <ModalCustoAdded
              setIsModalCustoAdded={setIsModalCustoAdded}
              updateCustos={updateCustos}
              valueAllCustos={valueAllCustos}
            />
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
