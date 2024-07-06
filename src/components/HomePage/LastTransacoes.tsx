import { HomeContext } from "@/Context/HomeContext";
import { useContext } from "react";
import CardsTransacoesPlan from "../PlanPage/CardsTransacoesPlan";

const LastTransacoes = () => {
  const { transations } = useContext(HomeContext);

  // Verifica se transations existe e se é um array com elementos
  const hasTransations = Array.isArray(transations) && transations.length > 0;

  return (
    <div className="pl-[28px] pt-[25px]">
      <div className="flex justify-between items-center">
        <p className="text-blackPrimary text-xl font-medium">
          Últimas transações
        </p>
        <button className="text-bluePrimary font-medium pr-[28px]">
          Ver todas
        </button>
      </div>
      {hasTransations ? (
        transations.slice(0, 5).map((transaction: any) =>
          transaction.transacoes.map((transacao: any) => (
            <div key={transaction.id}>
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
        )
      ) : transations === null ? (
        <p className="pt-7 text-blackOpacity">Carregando suas transações ...</p>
      ) : (
        <p className="pt-7 text-blackOpacity">
          Você ainda não realizou transações.
        </p>
      )}
    </div>
  );
};

export default LastTransacoes;
