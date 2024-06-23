import {
  faCircleArrowUp,
  faCircleChevronDown,
  faEllipsis,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import MiniModalOptionsPlan from "./MiniModalOptionsPlan";
import { HomeContext } from "@/Context/HomeContext";
import Image from "next/image";

const HeaderPlan = () => {
  const [showOptionsPlan, setShowOptionsPlan] = useState(false);

  const { PlanSelectIfId } = useContext(HomeContext);

  const planSelected = PlanSelectIfId !== "undefined" ? PlanSelectIfId : null;

  return (
    <div className="w-full flex flex-col items-center h-[357px] bg-white rounded-b-[30px] overflow-x-hidden">
      <div className="w-[390px] px-[28px]">
        <div className="pt-11 ">
          <div className="w-full flex gap-5 justify-between">
            <div className="w-[92px] h-[92px] flex justify-center items-center bg-whitePrimary rounded-full">
              {planSelected && planSelected.data.iconCategory ? (
                <Image
                  src={planSelected.data.iconCategory}
                  alt="Imagem do plano"
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
                {planSelected ? (
                  planSelected.data.categorySelected
                ) : (
                  "Não foi possível selecionar a categoria"
                )}
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
              R$ 31.400,00{" "}
            </p>
          </div>
          <div>
            <p className="text-blackPrimary font-medium">Meta a ser atingida</p>
            <p className="text-xl text-blackOpacity font-medium">
              {planSelected ? planSelected.data.valueOfPlan : "Meta não definida"}
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
