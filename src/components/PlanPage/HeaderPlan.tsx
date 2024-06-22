import { faCircleArrowUp, faCircleChevronDown, faEllipsis, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import MiniModalOptionsPlan from "./MiniModalOptionsPlan";

const HeaderPlan = () => {

  const [showOptionsPlan, setShowOptionsPlan] = useState(false);


  return (
    <div className="w-full flex flex-col items-center h-[357px] bg-white rounded-b-[30px] overflow-x-hidden overflow-y-hidden">
      <div className="w-[390px] px-[28px]">
        <div className="pt-11 ">
          <div className="w-full flex gap-5 justify-between">
            <div className="w-[92px] h-[92px] flex justify-center items-center bg-whitePrimary rounded-full">
              <FontAwesomeIcon
                icon={faHouse}
                className="text-bluePrimary text-5xl"
              />
            </div>
            <div className="flex flex-col justify-center pr-7">
              <p className="text-[28px] text-blackPrimary font-medium">House</p>
              <p className="text-blackOpacity">Projetos pessoais</p>
            </div>
            <div>
              <button onClick={() => setShowOptionsPlan(!showOptionsPlan)}>
                <FontAwesomeIcon
                  icon={faEllipsis}
                  className="text-blackOpacity text-4xl"
                />
              </button>
              {showOptionsPlan && <MiniModalOptionsPlan/>}
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
              R$ 200.000,00
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
