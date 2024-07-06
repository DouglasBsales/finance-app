"use client";

import CardsTransacoesPlan from "@/components/PlanPage/CardsTransacoesPlan";
import HeaderPlan from "@/components/PlanPage/HeaderPlan";
import { HomeContext } from "@/Context/HomeContext";
import { useContext } from "react";

export default function Plan() {
  const { transations } = useContext(HomeContext);

  const hasTransations: any =
    Array.isArray(transations) &&
    transations.length > 0 &&
    Array.isArray(transations[0].planos) &&
    transations[0].planos.length > 0;

  return (
    <div className="w-full h-screen flex flex-col items-center bg-bluePrimary">
      <div className="w-full">
        <HeaderPlan />
      </div>
      <div className="w-full px-7 pb-[100px] bg-bluePrimary">
        <div className="flex flex-col">
        <p className="text-white text-3xl font-medium pt-12">
          Ultimas transações
        </p>
          <div className="flex flex-col items-center">
            {hasTransations ? (
              transations.map((cards: any) =>
                cards.transacoes.map((transacao: any) => (
                  <div key={transacao.id}>
                    <CardsTransacoesPlan infoCards={{ ...transacao }} />
                  </div>
                ))
              )
            ) : (
              <p className="text-whitePrimary">
                Você ainda não possui transações neste plano
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
