import { HomeContext } from "@/Context/HomeContext";
import { useContext } from "react";
import CardsTransacoesPlan from "../PlanPage/CardsTransacoesPlan";
import Link from "next/link";

const LastTransacoes = () => {
  const { transations } = useContext(HomeContext);

  // Verifica se transations existe e se é um array com elementos
  const hasTransations = Array.isArray(transations) && transations.length > 0;

  // Coletar todas as transações em uma única array
  const allTransacoes = hasTransations ? transations.flatMap((transaction: any) => transaction.transacoes) : [];

  // Selecionar as últimas 5 transações
  const latestTransacoes = allTransacoes.slice(0, 5);

  return (
    <div className="pl-[28px] pt-[25px]">
      <div className="flex justify-between items-center">
        <p className="text-blackPrimary text-xl font-medium">
          Últimas movimentações
        </p>
        <Link href="/Pages/LastTransations"className="text-bluePrimary text-xs font-medium pr-[28px]">
          Ver todas
        </Link>
      </div>
      {latestTransacoes.length > 0 ? (
        latestTransacoes.map((transacao: any) => (
          <div key={transacao.id}>
            <CardsTransacoesPlan
              infoCards={{
                date: transacao.data.date,
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
        <p className="pt-7 text-blackOpacity">
          Você ainda não realizou transações.
        </p>
      )}
    </div>
  );
};

export default LastTransacoes;
