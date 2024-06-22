import { HomeContext } from "@/Context/HomeContext";
import Link from "next/link";
import { useContext } from "react";
import CardsPlans from "./CardsPlans";

export const Planos = () => {
  const { plansData } = useContext(HomeContext);

  return (
    <div className="pl-[28px] pt-[25px]">
      <div className="flex justify-between items-center">
        <p className="text-blackPrimary text-xl font-medium">Seus planos</p>
        <Link
          href="/Pages/NewPlan"
          className="text-bluePrimary font-medium pr-[28px]"
        >
          Novo plano
        </Link>
      </div>
      <div className="flex gap-3 pt-5">
        {plansData.length > 0 ? (
          <div>
            <p className="text-blackOpacity">Você ainda nao possui planos a serem exibidos</p>
          </div>
        ) : (
          plansData.map((plan: any) => (
            <div key={plan.id}>
              <CardsPlans />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
