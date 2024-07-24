import Image from "next/image";
import { FunctionComponent } from "react";
import { formatarNumero } from "../PlanPage/HeaderPlan";

type CardsProps = {
  infoCards?: {
    date: string;
    icon: string;
    id: string;
    plano?: string,
    name: string;
    nameCusto?: string;
    value: number;
    sentValue?: boolean;
  };
};

const CardsTransacoesPlan: FunctionComponent<CardsProps> = ({ infoCards }) => {
  return (
    <div className="pt-3">
      {infoCards ? (
        <div className="w-[337px] flex items-center pl-2 bg-white rounded-md" style={{boxShadow: "0px 2px 4px 1px #0000000D"}}>
          <div className="w-full flex items-center py-3">
            <Image src={infoCards.icon} alt="" width={35} height={35} />
            <div>
              <div className="w-[210px] flex flex-col pl-2 relative top-[2px]">
                <p className=" text-[#202020]">
                  {infoCards.name}
                </p>
                <p className="text-[#62636C] text-xs font-light relative bottom-1">
                  {infoCards.date}
                </p>
                {infoCards.plano && (
                  <p className="text-sm text-[#62636C] font-light">
                    Plano: {infoCards.plano}
                  </p>
                )}
                {infoCards.nameCusto && (
                  <p className="text-xs text-[#62636C] font-light relative bottom-1">Custo: {infoCards.nameCusto}</p>
                )}
              </div>
            </div>
            <div className="flex flex-grow items-center justify-end pr-[10px]">
              <p
                className={`font-medium ${infoCards.sentValue ? "text-[#46E068]" : "text-[#FF0000]"} text-right`}
              >
                {infoCards.sentValue ? "+" : "-"}
                {formatarNumero(infoCards.value)}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CardsTransacoesPlan;
