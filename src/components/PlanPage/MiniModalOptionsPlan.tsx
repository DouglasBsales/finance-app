import { HomeContext } from "@/Context/HomeContext";
import { arrayRemove, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { ModalPlanCreatedOrDeleted } from "../NewPlanPage/ModalPlanCreatedOrDeleted";

const MiniModalOptionsPlan = () => {
  const { planSelected, refDocPlan, setOptionPlan } = useContext(HomeContext);
  const [isModalPlanDelete, setIsModalPlanDelete] = useState<Boolean>(false);

  const deletPlan = async () => {
    setOptionPlan("delete");

    await updateDoc(refDocPlan, {planos: arrayRemove(planSelected)});

    setIsModalPlanDelete(true);

    if (typeof window !== "undefined") {
      window.location.href = "/Pages/Home";
    }

    setIsModalPlanDelete(false);
  };

  return (
    <div className="absolute w-[120px] right-[-20px] bg-[#F0F0F0]">
      <div className="flex flex-col items-start px-[10px] py-[5px] text-blackPrimary ">
        <button>
          <p className="text-sm">Editar</p>
        </button>
        <button onClick={deletPlan}>
          <p className="text-sm">Excluir plano</p>
        </button>
      </div>
      {isModalPlanDelete && <ModalPlanCreatedOrDeleted />}
    </div>
  );
};

export default MiniModalOptionsPlan;
