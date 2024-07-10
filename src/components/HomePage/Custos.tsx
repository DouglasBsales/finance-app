import { HomeContext } from "@/Context/HomeContext";
import { useContext } from "react";
import { CardsCustos } from "./CardsCustos";

export const Custos = () => {
  const { custosData } = useContext(HomeContext);

  // Verifica se custosData não é undefined ou null antes de fazer o map
  const hasCustos = custosData?.flatMap((custosData: any) => custosData.custos) || [];

  // Verifica se algum dos arrays dentro de hasCustos não está vazio
  const hasNonEmptyCustos = hasCustos.length > 0;

  return (
    <div className="pl-[28px] pt-[25px]">
      <div className="flex justify-between items-center">
        <p className="text-blackPrimary text-xl font-medium">Seus custos</p>
        <button className="text-bluePrimary text-xs font-medium pr-[28px]">
          Novo custo
        </button>
      </div>
      <div className="flex gap-3 pt-5">
        {hasNonEmptyCustos ? (
          hasCustos.map((custos: any) => (
            <CardsCustos
              key={custos.custoId}
              infoCustos={{
                name: custos.custoName,
                value: custos.custoValue,
              }}
            />
          ))
        ) : (
          <p>Sem custos</p>
        )}
      </div>
    </div>
  );
};
