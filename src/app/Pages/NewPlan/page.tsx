"use client";

import Link from "next/link";

import { HomeContext } from "@/Context/HomeContext";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { arrayUnion, doc, getDocs, updateDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useContext, useState } from "react";
import { ModalPlanCreatedOrDeleted } from "@/components/NewPlanPage/ModalPlanCreatedOrDeleted";

export default function NewPlan() {
  const { plansCollect, setOptionPlan } = useContext(HomeContext);

  const [nameOfPlan, setNameOfPlan] = useState<string>("");
  const [valueOfPlan, setValueOfPlan] = useState<string>("");
  const [categorySelected, setCategorySelected] = useState<string>("");

  const [errorOfName, setErrorOfName] = useState<boolean>(false);
  const [errorValuePlan, setErrorValuePlan] = useState<boolean>(false);
  const [errorcategory, setErrorCategory] = useState<boolean>(false);

  const [showModalPlanCreated, setShowModalPlanCreated] = useState<Boolean>(false);

  type DataType = {
    nameOfPlan: string;
    valueOfPlan: number;
    valuePlanWallet: number;
    categorySelected: string;
    iconCategory: any;
  };

  const iconsOfCatgeory: any = {
    Viagem: "/viagem.svg",
    Compras: "/store.svg",
    Moda: "/moda.svg",
    Eletrodomesticos: "/eletrodomesticos.svg",
    Transporte: "/transporte.svg",
    Lazer: "/lazer.svg",
    Saude: "/saude.svg",
    Investimentos: "/investimentos.svg",
    ProjetosPessoais: "/projetosPessoais.svg",
    Emergencia: "/emergencia.svg",
    Educacao: "/educacao1.svg",
  };

  const createNewPlan = async () => {
    if (!nameOfPlan && !valueOfPlan && !categorySelected) {
      alert("Todos os campos devem ser preenchidos");
      setErrorOfName(true);
      setErrorValuePlan(true);
      setErrorCategory(true);
      return;
    }

    if (nameOfPlan.trim() === "") {
      alert("Insira um nome para o plano");
      setErrorOfName(true);
      return;
    }

    const regex = /[.,]/;
    if (regex.test(valueOfPlan)) {
      alert("Insira um valor inteiro, sem pontos ou virgulas");
      setErrorValuePlan(true);
      return;
    }

    if (categorySelected === "0") {
      alert("Insira uma categoria válida");
      setErrorCategory(true);
      return;
    }

    const data: DataType = {
      nameOfPlan,
      valueOfPlan: parseFloat(valueOfPlan),
      valuePlanWallet: 0,
      categorySelected,
      iconCategory: iconsOfCatgeory[categorySelected],
    };

    const docsPlan = await getDocs(plansCollect);
    const docPlanId = docsPlan.docs[0].id;
    const refDocPlan = doc(plansCollect, docPlanId);

    const planArray = {
      id: nanoid(),
      data: data,
    };

    await updateDoc(refDocPlan, { planos: arrayUnion(planArray) }); // atualiazndo o array com os valores antigos e novos
    setOptionPlan("created")
    if (typeof window !== "undefined") {
      localStorage.setItem("planSelected", JSON.stringify(planArray));
    }

    window.location.href = "/Pages/Plan";
    setShowModalPlanCreated(true);
  };

  return (
    <div className="w-full flex flex-col items-center bg-whitePrimary pb-[100px]">
      <div className="w-[390px] px-7 pb-[40px]">
        <Link
          href="/Pages/Home"
          className="flex gap-1 items-center pt-4 text-blackPrimary"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
          <p>Voltar para a home</p>
        </Link>
        <div>
          <p className="text-bluePrimary font-bold text-[42px] pt-16">
            Novo plano
          </p>
        </div>
        <div className="flex flex-col gap-3 pt-[52px]">
          <div>
            <p
              className={`text-xl ${
                errorOfName ? "text-[red] font-bold" : "text-blackPrimary"
              }`}
            >
              Nome do plano
            </p>
            <input
              type="text"
              className="w-full h-[35px] outline-none rounded-md pl-3"
              placeholder="Ex: Viagem "
              onChange={(e) => setNameOfPlan(e.target.value)}
              maxLength={15}
              required
            />
          </div>
          <div>
            <p
              className={`text-xl ${
                errorValuePlan ? "text-[red] font-bold" : "text-blackPrimary"
              }`}
            >
              Meta do plano
            </p>
            <p className="text-xs text-blackOpacity">
              Coloque o número sem virgulas ou ponto
            </p>
            <input
              type="number"
              className="w-full h-[35px] outline-none rounded-md pl-3"
              placeholder="Ex: 7000"
              onChange={(e) => setValueOfPlan(e.target.value)}
              required
            />
          </div>
          <div>
            <p
              className={`bg-transparent outline-none ${
                errorcategory ? "text-[red] font-bold" : "text-blackPrimary"
              }`}
            >
              Escolha a categoria do plano
            </p>
            <select
              className="bg-transparent outline-none text-blackPrimary"
              onChange={(e) => setCategorySelected(e.target.value)}
              required
            >
              <option value="0">Selecione uma categoria</option>
              <option value="Viagem">Viagem</option>
              <option value="Compras">Compras</option>
              <option value="Moda">Moda</option>
              <option value="Eletrodomesticos">Eletrodomesticos</option>
              <option value="Transporte">Transporte</option>
              <option value="Lazer">Lazer e entretenimento</option>
              <option value="Saude">Saúde</option>
              <option value="Investimentos">Investimentos</option>
              <option value="ProjetosPessoais">Projetos pessoais</option>
              <option value="Emergencia">Emergencia </option>
              <option value="Educacao">Educação </option>
            </select>
          </div>
        </div>
        <div className="w-full flex justify-center items-center pt-16">
          <button
            className="w-full bg-bluePrimary rounded-md"
            onClick={createNewPlan}
          >
            <p className="text-white font-bold py-4">Criar plano</p>
          </button>
        </div>
      </div>
      {showModalPlanCreated && <ModalPlanCreatedOrDeleted />}
    </div>
  );
}
