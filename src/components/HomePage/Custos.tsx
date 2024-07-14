import { HomeContext } from "@/Context/HomeContext";
import { useContext, useState } from "react";
import { CardsCustos } from "./CardsCustos";
import { ModalNewCusto } from "./ModalNewCusto";

export const Custos = () => {
  const { custosData } = useContext(HomeContext);

  // Verifica se custosData não é undefined ou null antes de fazer o map
  const hasCustos = custosData?.flatMap((custosData: any) => custosData.custos) || [];

  // Verifica se algum dos arrays dentro de hasCustos não está vazio
  const hasNonEmptyCustos = hasCustos.length > 0;

  const [isModalNewCusto, setModalNewCusto] = useState<boolean>(false)

  return (
    <div className="pl-[28px] pt-[25px]">
      <div className="w-full flex justify-between items-center">
        <p className="text-blackPrimary text-xl font-medium">Seus custos</p>
        <button className="text-bluePrimary text-xs font-medium pr-[28px]" onClick={()=> setModalNewCusto(true)}>
          Novo custo
        </button>
      </div>
      <div className="flex gap-3 pt-5 overflow-x-scroll  pr-7"
       style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}>
        {hasNonEmptyCustos ? (
          hasCustos.map((custos: any) => (
            <CardsCustos
              key={custos.custoId}
              infoCustos={{
                id: custos.id,
                name: custos.name,
                value: custos.value,
                category: custos.categoryCusto,
                categoryIcon: custos.icon
              }}
            />
          ))
        ) : (
          <p>Você ainda não possui custos adicionados</p>
        )}
      </div>
      {isModalNewCusto && <ModalNewCusto setModalNewCusto={setModalNewCusto}/>}
    </div>
  );
};
