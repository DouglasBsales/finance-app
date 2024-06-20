import { faCreditCard, faHouse, faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Custos = () => {
  return (
    <div className="pl-[28px] pt-[25px]">
      <div className="flex justify-between items-center">
        <p className="text-blackPrimary text-xl font-medium">Seus custos</p>
        <button className="text-bluePrimary font-medium pr-[28px]">
          Seus custos
        </button>
      </div>
      <div className="flex gap-3 pt-5">
        <div className=" w-[130px] rounded-md bg-white pl-3 pb-3">
          <div className="pt-4">
            <div className="w-9 h-9 flex justify-center items-center rounded-full bg-whitePrimary">
              <FontAwesomeIcon
                icon={faCreditCard}
                className="text-[#DAA520] text-xl"
              />
            </div>
          </div>
          <div className="pt-4">
            <p className="text-blackPrimary font-semibold">Cartão itaú</p>
            <div className="flex gap-1">
              <p className="text-xs font-medium text-blackPrimary">R$ 500,35</p>
            </div>
          </div>
        </div>
        <div className=" w-[130px] rounded-md bg-white pl-3">
          <div className="pt-4">
            <div className="w-9 h-9 flex justify-center items-center rounded-full bg-whitePrimary">
              <FontAwesomeIcon
                icon={faCreditCard}
                className="text-[#DAA520] text-xl"
              />
            </div>
          </div>
          <div className="pt-4">
            <p className="text-blackPrimary font-semibold">Nubank</p>
            <div className="flex gap-1">
              <p className="text-xs font-medium text-blackPrimary">R$ 230,00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
