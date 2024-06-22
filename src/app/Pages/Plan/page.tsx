"use client";

import CardsTransacoesPlan from "@/components/PlanPage/CardsTransacoesPlan";
import HeaderPlan from "@/components/PlanPage/HeaderPlan";

export default function Plan() {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-bluePrimary pb-[100px]">
      <HeaderPlan />
      <div className="w-[390px] px-7 pb-[40px]">
        <div className="pt-12">
          <p className="text-white text-3xl font-medium">Ultimas transações</p>
          <CardsTransacoesPlan />
        </div>
      </div>
    </div>
  );
}
