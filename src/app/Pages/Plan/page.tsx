"use client";

import CardsTransacoesPlan from "@/components/PlanPage/CardsTransacoesPlan";
import HeaderPlan from "@/components/PlanPage/HeaderPlan";

export default function Plan() {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-bluePrimary">
      <div className="w-full">
        <HeaderPlan />
      </div>
      <div className="w-full px-7 pb-[100px] bg-bluePrimary">
        <div className="flex flex-col items-center pt-12 px-7">
          <div>
            <p className="text-white text-3xl font-medium">Ultimas transações</p>
            <CardsTransacoesPlan />
          </div>
        </div>
      </div>
    </div>
  );
}
