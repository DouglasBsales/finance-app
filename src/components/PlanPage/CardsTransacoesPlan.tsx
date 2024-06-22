import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardsTransacoesPlan = () => {
  return (
    <div className="pt-7">
      <div className="w-[337px] flex items-center px-4 bg-white rounded-md">
        <div className="flex justify-between pt-[22px] pb-3">
          <div className="w-[42px] h-[42px] flex justfiy-center items-center bg-whitePrimary rounded-full">
            <FontAwesomeIcon
              icon={faCircleChevronDown}
              className="text-[#46E068] text-[38px]"
            />
          </div>
          <div className="pl-3">
            <p className="font-medium text-blackPrimary ">
              Entrada de dinheiro carteira
            </p>
            <p className="text-sm text-blackOpacity">Plano: House</p>
          </div>
          <div>
            <p className="text-sm text-blackOpacity relative top-[3px]">
              15/05/2024
            </p>
            <p className="text-[#46E068]"> + 100,00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsTransacoesPlan;
