"use client";

import CardsTransacoesPlan from "@/components/PlanPage/CardsTransacoesPlan";
import { HomeContext } from "@/Context/HomeContext";
import { useContext } from "react";

export default function LastTransations() {
  const { transations, planSelected } = useContext(HomeContext);

  const hasTransations = Array.isArray(transations) && transations.length > 0;

  // Coletar todas as transações em uma única array
  const allTransacoes = hasTransations
    ? transations.flatMap((transaction: any) => transaction.transacoes)
    : [];

    const filteredTransacoes = allTransacoes.filter((transacao: any) => transacao.data.name === planSelected.nameOfPlan)

  return (
    <div className="w-full flex flex-col items-center bg-whitePrimary">
      <div className="w-[390px] overflow-x-hidden pb-[100px] px-7">
        <p className=" text-blackPrimary font-medium text-xl pt-[66px]">Ulitmas movimentações</p>
        {allTransacoes
          ?filteredTransacoes.map((transacao: any) => (
              <div key={transacao.id}>
                <CardsTransacoesPlan 
                 infoCards={{
                  date: transacao.data.date,
                  icon: transacao.data.icon,
                  id: transacao.id,
                  name: transacao.data.name,
                  value: transacao.data.value,
                  sentValue: transacao.data.sentValue,
                }}/>
              </div>
            ))
          : <p>Você ainda não possui transações</p>}
      </div>
    </div>
  );
}
