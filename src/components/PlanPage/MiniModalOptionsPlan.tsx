import { HomeContext } from "@/Context/HomeContext";
import { arrayRemove, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { ModalPlanCreatedOrDeleted } from "../NewPlanPage/ModalPlanCreatedOrDeleted";

const MiniModalOptionsPlan = () => {
  const {
    planSelected,
    refDocPlan,
    setOptionPlan,
    isPlansOrCustos,
    custoSelected,
    refDocCustos,
  } = useContext(HomeContext);
  const [isModalPlanDelete, setIsModalPlanDelete] = useState<Boolean>(false);

  const deletPlanOrCustos = async () => {
    if (isPlansOrCustos === "planos") {
      setOptionPlan("delete");
      await updateDoc(refDocPlan, { planos: arrayRemove(planSelected) });
    }

    if (isPlansOrCustos === "custos") {
      await updateDoc(refDocCustos, { custos: arrayRemove(custoSelected) });
    }

    setIsModalPlanDelete(true);

    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.location.href = "/Pages/Home";
      }

      setIsModalPlanDelete(false);
    }, 1000);
  };

  return (
    <div className="absolute w-[120px] right-[-20px] bg-[#F0F0F0]">
      <div className="flex flex-col items-start px-[10px] py-[5px] text-blackPrimary ">
        <button>
          <p className="text-sm">Editar</p>
        </button>
        <button onClick={deletPlanOrCustos}>
          <p className="text-sm">
            {isPlansOrCustos === "planos" ? "Excluir plano" : "Excluir custo"}
          </p>
        </button>
      </div>
      {isModalPlanDelete && <ModalPlanCreatedOrDeleted />}
    </div>
  );
};

export default MiniModalOptionsPlan;
