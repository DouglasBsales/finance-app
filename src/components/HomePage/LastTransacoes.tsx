import { HomeContext } from "@/Context/HomeContext";
import { useContext } from "react";
import CardsTransacoesPlan from "../PlanPage/CardsTransacoesPlan";

const LastTransacoes = () => {
  const { transations } = useContext(HomeContext);

  const hasTransations: any =
    Array.isArray(transations) &&
    transations.length > 0 &&
    Array.isArray(transations[0].planos) &&
    transations[0].planos.length > 0;

  return (
    <div className="pl-[28px] pt-[25px]">
      <div className="flex justify-between items-center">
        <p className="text-blackPrimary text-xl font-medium">
          Ultimas transações
        </p>
        <button className="text-bluePrimary font-medium pr-[28px]">
          Ver todas
        </button>
      </div>
      {hasTransations ? (
        transations.map((transation: any) =>
          transation.transacoesslice(0 , 5).map((allTransations: any) => (
            <div key={allTransations.id}>
              <CardsTransacoesPlan infoCards={{ ...allTransations }} />
            </div>
          ))
        )
      ) : hasTransations === "null" ? (
        <p className="pt-7 text-blackOpacity">
          Você ainda não realizou transações
        </p>
      ) : (
        <p className="pt-7 text-blackOpacity">Carregando suas transações ...</p>
      )}
    </div>
  );
};

export default LastTransacoes;
