import { HomeContext } from "@/Context/HomeContext";
import Link from "next/link";
import { useContext } from "react";
import CardsPlans from "./CardsPlans";

export const Planos = () => {
  const { plansData } = useContext(HomeContext);

  const hasPlans: any =
    Array.isArray(plansData) &&
    plansData.length > 0 &&
    Array.isArray(plansData[0].planos) &&
    plansData[0].planos.length > 0;

  return (
    <div className="pl-[28px] pt-[25px]">
      <div className="flex justify-between items-center">
        <p className="text-blackPrimary text-xl font-medium">Seus planos</p>
        <Link
          href="/Pages/NewPlan"
          className="text-bluePrimary text-xs font-medium pr-[28px]"
        >
          Novo plano
        </Link>
      </div>
      <div
        className="w-full flex gap-3 pt-5 overflow-x-scroll pr-7"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {hasPlans ? (
          plansData.map((plan: any) =>
            plan.planos.map((plano: any) => (
              <div key={plano.id}>
                <CardsPlans
                  planId={plano.id}
                  nameOfPlan={plano.data.nameOfPlan}
                  valueOfPlan={plano.data.valueOfPlan}
                  valuePlanWallet={plano.data.valuePlanWallet}
                  iconCategory={plano.data.iconCategory}
                  categorySelected={plano.data.categorySelected}
                />
              </div>
            ))
          )
        ) : (
          <div>
            <p className="text-blackOpacity">Você ainda não possui planos a serem exibidos</p>
          </div>
        )}
      </div>
    </div>
  );
};
