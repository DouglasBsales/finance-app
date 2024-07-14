import { faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CategoryIcon, CustosData } from "../HomePage/ModalNewCusto";
import { nanoid } from "nanoid";
import { FunctionComponent, useContext, useState } from "react";
import { HomeContext } from "@/Context/HomeContext";
import { getDoc, updateDoc } from "firebase/firestore";
import { useQueryClient } from "react-query";

type ModalCustoAddedprops = {
    setIsModalCustoAdded: any
    valueAllCustos:number
}

export const ModalCustoAdded: FunctionComponent<ModalCustoAddedprops> = ({setIsModalCustoAdded, valueAllCustos}) => {
  const { custoSelected, transationRefId } = useContext(HomeContext);

  const queryClient = useQueryClient()

  const [custoName, setCustoName] = useState<string>("");
  const [custoValue, setCustovalue] = useState<string>("");
  const [custoCategory, setCustoCategory] = useState<string>("");

  const nameCusto = custoSelected?.name;
  const valueParsed = parseFloat(custoValue);

  const addedCusto = async () => {

    if (!nameCusto || !custoName || isNaN(valueParsed) || !custoCategory) {
      alert("Todos os campos devem ser preenchidos corretamente.");
      return;
    }

    const newCusto: CustosData = {
      id: nanoid(),
      nameCusto: nameCusto,
      name: custoName,
      value: valueParsed,
      icon: CategoryIcon[custoCategory as keyof typeof CategoryIcon],
      date: new Date().toLocaleDateString("pt-BR"),
    };

    const custoAtt = {
        id: nanoid(),
        data: newCusto
    }

      const transationDoc: any = await getDoc(transationRefId);
      
      const existingTransacoes = transationDoc.data()?.transacoes || [];
      const updatedTransacoes = [custoAtt, ...existingTransacoes];
      
      await updateDoc(transationRefId, { transacoes: updatedTransacoes });
      queryClient.invalidateQueries("transationsData");
      setIsModalCustoAdded(false)
  };

  return (
    <div>
      <div className="w-full fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-[283px] bg-whitePrimary px-5 rounded-[20px]">
          <div className="flex items-center pt-6">
            <FontAwesomeIcon
              icon={faTags}
              className="text-bluePrimary text-[44px]"
            />
            <p className="text-blackPrimary font-medium pl-1">Novo custo</p>
          </div>
          <div className="pt-4">
            <p>Nome do custo</p>
            <div className="flex items-center bg-white rounded-md">
              <input
                type="text"
                className="w-full h-[30px] bg-white rounded-md outline-none pl-[10px] text-blackPrimary"
                onChange={(e) => setCustoName(e.target.value)}
              />
            </div>
          </div>
          <div className="pt-4">
            <p>Valor do custo</p>
            <div className="flex items-center bg-white rounded-md">
              <input
                type="text"
                className="w-full h-[30px] bg-white rounded-md outline-none pl-[10px] text-blackPrimary"
                onChange={(e) => setCustovalue(e.target.value)}
              />
            </div>
          </div>
          <div className="pt-[10px]">
            <select
              className="bg-transparent outline-none"
              onChange={(e) => setCustoCategory(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              <option value="Contas_gerais">Contas gerais</option>
              <option value="Musica">Música</option>
              <option value="Entretenimento">Filmes ou séries</option>
              <option value="Educacao">Educação</option>
              <option value="Moradia">Moradia</option>
              <option value="Transporte">Transporte</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Moda">Moda</option>
              <option value="FestasEeventos">Festas e Eventos</option>
              <option value="Caridade">Caridade</option>
              <option value="Investimentos">Investimentos</option>
              <option value="Segurança">Segurança</option>
              <option value="Emergencias">Emergências</option>
            </select>
          </div>
          <div className="flex gap-[11px] pt-11 pb-5">
            <button className="border-2 rounded-md" onClick={()=> setIsModalCustoAdded(false)}>
              <p className="py-[8px] px-4 text-blackOpacity">Cancelar</p>
            </button>
            <button className="bg-bluePrimary rounded-md" onClick={addedCusto}>
              <p className="py-[8px] px-4 text-white">Confirmar</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
