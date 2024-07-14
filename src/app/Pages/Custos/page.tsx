"use client";

import { HeaderCustos } from "@/components/CustosPage/HeaderCustos";
import CardsTransacoesPlan from "@/components/PlanPage/CardsTransacoesPlan";
import { HomeContext } from "@/Context/HomeContext";
import { useContext, useEffect } from "react";

export default function Custos() {
  const { setIsPlansOrCustos, transations, custoSelected } =
    useContext(HomeContext);

  const hasTransations = Array.isArray(transations) && transations.length > 0;

  const allTransacoes = hasTransations
    ? transations.flatMap((transaction: any) => transaction.transacoes)
    : [];


  const custoName = custoSelected ? custoSelected.name : ""

  const filteredCustos = allTransacoes && allTransacoes.filter(
    (transacoes: any) => transacoes.data.nameCusto === custoName 
  );

  console.log(filteredCustos)

  const valueAllCustos = filteredCustos.reduce((acc: number, transacoes: any)=> acc + transacoes.data.value, 0)

  useEffect(() => {
    setIsPlansOrCustos("custos");
  });

  return (
    <div className="h-screen bg-bluePrimary">
      <HeaderCustos valueAllCustos={valueAllCustos}/>
      <div className="w-full flex flex-col items-center px-7 pb-[100px] bg-bluePrimary">
        <div className="w-[390px] flex flex-col px-7 ">
          <p className="text-white text-3xl font-medium pt-12">
            Custos adicionados
          </p>
          {filteredCustos.length > 0 ? (
            filteredCustos.map((transacao: any) => (
              <div key={transacao.id}>
                <CardsTransacoesPlan
                  infoCards={{
                    date: transacao.data.date,
                    icon: transacao.data.icon,
                    id: transacao.id,
                    nameCusto: transacao.data.nameCusto,
                    name: transacao.data.name,
                    value: transacao.data.value,
                  }}
                />
              </div>
            ))
          ) : (
            <p className="text-whitePrimary">Nenhum custo adicionado</p>
          )}
        </div>
      </div>
    </div>
  );
}
