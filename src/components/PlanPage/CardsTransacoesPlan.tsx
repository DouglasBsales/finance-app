import { HomeContext } from "@/Context/HomeContext";
import {
  faCircleArrowDown,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useContext } from "react";

type CardsProps = {
  infoCards: Object;
};

const CardsTransacoesPlan: FunctionComponent<CardsProps> = ({infoCards}) => {
  const { typeTransations } = useContext(HomeContext);

  return (
    <div className="pt-7">
      <div className="w-[337px] flex items-center pl-4 bg-white rounded-md">
        <div className="w-full flex justify-between items-center py-3">
          <div className="flex justfiy-center items-center">
            {typeTransations === "walletHomeSent" ? (
              <FontAwesomeIcon
                icon={faCircleChevronDown}
                className="text-[#46E068] text-[38px]"
              />
            ) : (
              <FontAwesomeIcon
                icon={faCircleArrowDown}
                className="text-[#E8270E] text-[38px]"
              />
            )}
            <div className="w-[180px] flex flex-col pl-3">
              <p className="text-blackOpacity text-sm font-light">15/06/2024</p>
              <p className="font-medium text-blackPrimary ">
                {typeTransations === "walletHomeSent"
                  ? "Entrada de dinheiro carteira"
                  : "Saída de dinheiro carteira"}
              </p>
              <p className="text-sm text-blackOpacity font-medium">
                Plano: House
              </p>
            </div>
            <div className="flex items-center pl-5">
              <p className="text-[#46E068]">+ 100,00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsTransacoesPlan;
