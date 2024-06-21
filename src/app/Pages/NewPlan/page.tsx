"use client";

import { faAngleLeft, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

export default function NewPlan() {
  const [nameOfPlan, setNameOfPlan] = useState<string>("");
  const [valueOfPlan, setValueOfPlan] = useState<string>("");
  const [categorySelected, setCategorySelected] = useState<string>("");

  const [errorOfName, setErrorOfName] = useState<boolean>(false);
  const [errorValuePlan, setErrorValuePlan] = useState<boolean>(false);
  const [errorcategory, setErrorCategory] = useState<boolean>(false);

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

    if (categorySelected === "0") {
      alert("Insira uma categoria válida");
      setErrorCategory(true);
      return;
    }

    const data = {
      nameOfPlan,
      valueOfPlan: parseFloat(valueOfPlan),
      categorySelected,
    };

    alert(
      `Plano criado com sucesso. Nome:${data.nameOfPlan}, Meta:${data.valueOfPlan}, Categoria:${data.categorySelected}`
    );
    console.log(data)
  };

  return (
    <div className="w-full flex flex-col items-center bg-whitePrimary pb-[100px]">
      <div className="w-[390px] px-7 pb-[40px]">
        <Link href="/Pages/Home" className="flex gap-1 items-center pt-4 text-blackPrimary">
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
            <input
              type="number"
              className="w-full h-[35px] outline-none rounded-md pl-3"
              placeholder="Ex: 7000.00 "
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
              <option value="Lazer e entretenimento">
                Lazer e entretenimento{" "}
              </option>
              <option value="Saude">Saúde</option>
              <option value="Investimentos">Investimentos</option>
              <option value="Projetos pessoais">Projetos pessoais</option>
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
    </div>
  );
}
