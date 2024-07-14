import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent, useContext } from "react";
import { formatarNumero } from "../PlanPage/HeaderPlan";
import Image from "next/image";
import Link from "next/link";
import { HomeContext } from "@/Context/HomeContext";

type CustosProps = {
  infoCustos: any;
};

export const CardsCustos: FunctionComponent<CustosProps> = ({ infoCustos }) => {
  const { custosData,  setIsPlansOrCustos } = useContext(HomeContext);

  const selectCustos = (id: string): void => {

    setIsPlansOrCustos("custos")

    const findCusto = custosData[0].custos.find((custo: any) => custo.id === id);
    if (typeof window !== "undefined") {
      localStorage.setItem("custosSelected", JSON.stringify(findCusto));
    }
  };

  return (
    <div>
      <div className=" w-[135px] rounded-md bg-white pl-3 pb-3">
        <Link href="/Pages/Custos" onClick={()=> selectCustos(infoCustos.id)}>
          <div className="pt-4">
            <div className="w-9 h-9 flex justify-center items-center rounded-full bg-whitePrimary">
              <Image
                src={infoCustos.categoryIcon}
                alt="iconeCusto"
                width={28}
                height={28}
              />
            </div>
          </div>
          <div className="pt-4">
            <p className="text-blackPrimary font-semibold">{infoCustos.name}</p>
            <div className="flex gap-1">
              <p className="text-xs font-medium text-blackPrimary">
                R$ {formatarNumero(infoCustos.value)}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
