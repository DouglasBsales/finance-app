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
        <div className="w-[337px] flex items-center pl-4 bg-white rounded-md">
          <div className="w-full flex justify-between items-center py-3">
            <Image src={infoCards.icon} alt="" width={38} height={38} />
            <div className="">
              <div className="w-[180px] flex flex-col">
                <p className="text-blackOpacity text-sm font-light">
                  {infoCards.date}
                </p>
                <p className="font-medium text-blackPrimary ">
                  {infoCards.name}
                </p>
                {infoCards.plano && (
                  <p className="text-sm text-blackOpacity font-light">
                    Plano: {infoCards.plano}
                  </p>
                )}
                {infoCards.nameCusto && (
                  <p className="text-sm text-blackOpacity font-light">Custo: {infoCards.nameCusto}</p>
                )}
              </div>
            </div>
            <div className="flex items-center pr-3">
              <p
                className={`${
                  infoCards.sentValue ? "text-[#46E068]" : "text-[#FF0000]"
                }`}
              >
                {infoCards.sentValue ? "+" : "-"}{" "}
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
