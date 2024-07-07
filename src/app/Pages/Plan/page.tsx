"use client";

import CardsTransacoesPlan from "@/components/PlanPage/CardsTransacoesPlan";
import HeaderPlan from "@/components/PlanPage/HeaderPlan";
import { HomeContext } from "@/Context/HomeContext";
import { useContext } from "react";

export default function Plan() {
  const { transations, planSelected } = useContext(HomeContext);

  const planName = planSelected ? planSelected.data.nameOfPlan: null

  const hasTransations = Array.isArray(transations) && transations.length > 0;

  const allTransacoes = hasTransations ? transations.flatMap((transaction: any) => transaction.transacoes) : [];

  const filteredTransacoes = allTransacoes.filter((transacao: any) => transacao.data.plano === planName);

  return (
    <div className="w-full h-screen flex flex-col items-center bg-bluePrimary">
      <div className="w-full">
        <HeaderPlan />
      </div>
      <div className="w-full flex flex-col items-center px-7 pb-[100px] bg-bluePrimary">
        <div className="w-[390px] flex flex-col px-7 ">
          <p className="text-white text-3xl font-medium pt-12">
            Ultimas transações
          </p>
          <div className="flex flex-col items-center">
            {filteredTransacoes.length > 0 ? (
              filteredTransacoes.map((transacao: any) => (
                <div key={transacao.id}>
                  <CardsTransacoesPlan
                    infoCards={{
                      date: transacao.data.date,
                      plano: transacao.data.plano,
                      icon: transacao.data.icon,
                      id: transacao.id,
                      name: transacao.data.name,
                      value: transacao.data.value,
                      sentValue: transacao.data.sentValue,
                    }}
                  />
                </div>
              ))
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
