import Image from "next/image";
import { FunctionComponent } from "react";
import { formatarNumero } from "../PlanPage/HeaderPlan";

type CardsProps = {
  infoCards: any;
};

const CardsTransacoesPlan: FunctionComponent<CardsProps> = ({ infoCards }) => {
  return (
    <div className="pt-7">
      <div className="w-[337px] flex items-center pl-4 bg-white rounded-md">
        <div className="w-full flex justify-between items-center py-3">
          <div className="flex justfiy-center items-center">
            <Image src={infoCards.icon} alt="" width={38} height={38} />
            <div className="w-[180px] flex flex-col pl-3">
              <p className="text-blackOpacity text-sm font-light">
                {infoCards.date}
              </p>
              <p className="font-medium text-blackPrimary ">{infoCards.name}</p>
              <p className="text-sm text-blackOpacity font-medium">
                {infoCards.plano}
              </p>
            </div>
            <div className="flex items-center pl-5">  {/* arrumar o padding left para que fique fixo independente do tamanho do texto */}
              <p
                className={`${
                  infoCards.sentValue ? "text-[#46E068]" : "text-[#FF0000]"
                }`}
              >
                {infoCards.sentValue ? "+" : "-"} {formatarNumero(infoCards.value)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsTransacoesPlan;
