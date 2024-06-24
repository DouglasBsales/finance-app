import {
  faAngleLeft,
  faCircleArrowUp,
  faCircleChevronDown,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import MiniModalOptionsPlan from "./MiniModalOptionsPlan";
import Image from "next/image";
import Link from "next/link";

const HeaderPlan = () => {
  const [showOptionsPlan, setShowOptionsPlan] = useState(false);
  const [planSelected, setPlanSelected] = useState<any>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      let PlanSelectIfIdStorage: any = localStorage.getItem("planSelected");
      let convertedPlanSelectIfIdStorage: any = JSON.parse(
        PlanSelectIfIdStorage
      );
      if (convertedPlanSelectIfIdStorage) {
        setPlanSelected(convertedPlanSelectIfIdStorage);
      }
    }
  }, [planSelected]);

  return (
    <div className="w-full flex flex-col items-center h-[357px] bg-white rounded-b-[30px] overflow-x-hidden">
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
            <div className="flex flex-col justify-center pr-7">
              <p className="text-[28px] text-blackPrimary font-medium">
                {planSelected ? planSelected.data.nameOfPlan : "Nome do Plano"}
              </p>
              <p className="text-blackOpacity">
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
            <p className="text-xl text-bluePrimary font-medium">R$ 0,00</p>
          </div>
          <div>
            <p className="text-blackPrimary font-medium">Meta a ser atingida</p>
            <p className="text-xl text-blackOpacity font-medium">
              {planSelected ? (
                <p>
                  R${" "}
                  {planSelected.data.valueOfPlan.toFixed(2).replace(".", ",")}
                </p>
              ) : (
                "Meta não definida"
              )}
            </p>
          </div>
        </div>
        <div className="pt-6">
          <div className="flex gap-[37px]">
            <button className=" w-[144px] h-[40px] flex justify-center items-center gap-1 bg-whitePrimary rounded-[20px] font-medium">
              <FontAwesomeIcon
                icon={faCircleChevronDown}
                className="text-bluePrimary text-2xl"
              />
              <p className="text-blackPrimary">Saída</p>
            </button>
            <button className="w-[144px] h-[40px] flex justify-center items-center gap-1 bg-whitePrimary rounded-[20px] font-medium">
              <FontAwesomeIcon
                icon={faCircleArrowUp}
                className="text-bluePrimary text-2xl"
              />
              <p className="text-blackPrimary">Entrada</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderPlan;
