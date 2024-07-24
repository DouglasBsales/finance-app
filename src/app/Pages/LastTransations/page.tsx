"use client";

import CardsTransacoesPlan from "@/components/PlanPage/CardsTransacoesPlan";
import { HomeContext } from "@/Context/HomeContext";
import Image from "next/image";
import { useContext } from "react";

export default function LastTransations() {
  const { transations } = useContext(HomeContext);

  const hasTransations = Array.isArray(transations) && transations.length > 0;

  // Coletar todas as transações em uma única array
  const allTransacoes = hasTransations
    ? transations.flatMap((transaction: any) => transaction.transacoes)
    : [];

  return (
    <div className="w-full flex flex-col items-center bg-whitePrimary">
      <div className="w-[390px] overflow-x-hidden pb-[100px] px-6">
        <p className=" text-blackPrimary text-xl pt-5">
          Ultimas movimentações
        </p>
        {allTransacoes.length > 0 ? (
          allTransacoes.map((transacao: any) => (
            <div key={transacao.id}>
              <CardsTransacoesPlan
                infoCards={{
                  date: transacao.data.date,
                  icon: transacao.data.icon,
                  id: transacao.data.id,
                  plano: transacao.data.plano,
                  name: transacao.data.name,
                  value: transacao.data.value,
                  sentValue: transacao.data.sentValue,
                  nameCusto: transacao.data.nameCusto
                }}
              />
            </div>
          ))
        ) : (
          <div>
            <p>Você ainda não possui transações</p>
          </div>
        )}
      </div>
    </div>
  );
}
