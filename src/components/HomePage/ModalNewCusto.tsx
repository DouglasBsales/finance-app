import { HomeContext } from "@/Context/HomeContext";
import { faMoneyCheckDollar, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayUnion, updateDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

type ModalNewCustoProps = {
  setModalNewCusto: any;
};

type CustosData = {
  id: string;
  nameCusto: string;
  valueCusto: number;
  categoryCusto: string;
  categoryIcon: string;
};

enum CategoryIcon {
  Contas_gerais = "/contasGerais.svg",
  Educacao = "/educacao1.svg",
  Moradia = "/House.svg",
  Transporte = "/transporte.svg",
  Tecnologia = "/tecnology.svg",
  Moda = "/moda.svg",
  FestasEeventos = "/eventos.svg",
  Caridade = "/caridade.svg",
  Investimentos = "/investimentos.svg",
  Segurança = "/saude.svg",
  Emergências = "/emergencia.svg",
}

export const ModalNewCusto: React.FC<ModalNewCustoProps> = ({
  setModalNewCusto,
}) => {
  const { refDocCustos } = useContext(HomeContext);

  const queryClient = useQueryClient();

  const [nameCusto, setNameCusto] = useState<string>("");
  const [categoryOfCusto, setCategoryOfCusto] = useState<string>("");

  const addedNewCusto = async () => {
    const newCusto: CustosData = {
      id: nanoid(),
      nameCusto: nameCusto,
      valueCusto: 0,
      categoryCusto: categoryOfCusto,
      categoryIcon: CategoryIcon[categoryOfCusto as keyof typeof CategoryIcon],
    };

    await updateDoc(refDocCustos, { custos: arrayUnion(newCusto) });
    queryClient.invalidateQueries("custosData");
    setModalNewCusto(false);
  };

  return (
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
              onChange={(e) => setNameCusto(e.target.value)}
              maxLength= {11}
            />
          </div>
        </div>
        <div className="pt-[10px]">
          <select
            className="bg-transparent outline-none"
            onChange={(e) => setCategoryOfCusto(e.target.value)}
          >
            <option value="0">Selecione uma categoria</option>
            <option value="Contas_gerais">Contas gerais</option>
            <option value="Educacao">Educação</option>
            <option value="Moradia">Moradia</option>
            <option value="Transporte">Transporte</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Moda">Moda </option>
            <option value="FestasEeventos">Festas e Eventos</option>
            <option value="Caridade">Caridade</option>
            <option value="Investimentos">Investimentos</option>
            <option value="Segurança">Segurança</option>
            <option value="Emergencias">Emergências</option>
          </select>
        </div>
        <div className="flex gap-[11px] pt-11 pb-5">
          <button className="border-2 rounded-md">
            <p
              className="py-[8px] px-4 text-blackOpacity"
              onClick={() => setModalNewCusto(false)}
            >
              Cancelar
            </p>
          </button>
          <button className="bg-bluePrimary rounded-md" onClick={addedNewCusto}>
            <p className="py-[8px] px-4 text-white">Confirmar</p>
          </button>
        </div>
      </div>
    </div>
  );
};
