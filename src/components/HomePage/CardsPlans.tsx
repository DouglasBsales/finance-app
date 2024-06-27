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
  const { plansData } = useContext(HomeContext);


  const selectPlan = (id: string): void => {
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
    <div className="rounded-md bg-white px-3 pb-3">
      <Link href="/Pages/Plan" onClick={() => selectPlan(planId)}>
        <div className="pt-4">
          <div className="w-9 h-9 flex justify-center items-center rounded-full bg-whitePrimary">
            <Image src={iconCategory} alt="fotoPlano" width={20} height={20} />
          </div>
        </div>
        <div className="pt-4">
          <p className="text-xs text-blackOpacity">{categorySelected}</p>
          <p className="text-blackPrimary font-semibold">{nameOfPlan}</p>
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
