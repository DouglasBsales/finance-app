import { FunctionComponent, useContext } from "react";

import Link from "next/link";
import { HomeContext } from "@/Context/HomeContext";
import Image from "next/image";

import { formatarNumero } from "../PlanPage/HeaderPlan";

type CardPlansProps = {
  nameOfPlan: string;
  valueOfPlan: number;
  valuePlanWallet: number;
  planId: string;
  iconCategory: any;
  categorySelected: string;
};

const CardsPlans: FunctionComponent<CardPlansProps> = ({
  nameOfPlan,
  valueOfPlan,
  valuePlanWallet,
  planId,
  iconCategory,
  categorySelected,
}) => {
  const { plansData,  setIsPlansOrCustos } = useContext(HomeContext);


  const selectPlan = (id: string): void => {

    setIsPlansOrCustos("planos")

    const planData = plansData.find((plan: any) =>
      plan.planos.some((plano: any) => plano.id === id)
    );

    if (planData) {
      const planSelected = planData.planos.find(
        (plano: any) => plano.id === id
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("planSelected", JSON.stringify(planSelected));
      }
    }
  };

  return (
    <div className=" rounded-md bg-white px-3 pb-3" style={{boxShadow: "0px 2px 4px 1px #0000000D"}}>
      <Link href="/Pages/Plan" onClick={() => selectPlan(planId)}>
        <div className="pt-4">
          <div className="w-11 h-11 flex justify-center items-center rounded-full bg-whitePrimary">
            <Image src={iconCategory} alt="fotoPlano" width={28} height={28} />
          </div>
        </div>
        <div className="w-[130px] pt-4">
          <p className="text-xs text-blackOpacity">{categorySelected}</p>
          <p className="text-[#62636C] font-semibold">{nameOfPlan}</p>
          <div className="flex gap-1">
            <p className="text-xs font-medium text-blackPrimary">
              R$ {formatarNumero(valuePlanWallet)}
            </p>
            <p className="text-xs font-medium text-blackOpacity">
              /R$ {valueOfPlan}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardsPlans;
