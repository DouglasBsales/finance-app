import { HomeContext } from "@/Context/HomeContext";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useContext } from "react";

export const ModalPlanCreatedOrDeleted = () => {
  const { optionPlan, isPlansOrCustos } = useContext(HomeContext);

  const selectText = () => {
    if (isPlansOrCustos === "custos") {
      return "Custo excluido com sucesso";
    }

    if (optionPlan === "created") {
      return "Plano criado com sucesso";
    } else {
      return "Plano excluido com sucesso";
    }
  };

  return (
    <div className="w-full fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[263px] flex flex-col items-center bg-white rounded-md pb-5">
        <div className="pt-[10px]">
          <div className="w-[59px] h-[59px] flex items-center justify-center bg-bluePrimary rounded-full">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-white text-[47px]"
            />
          </div>
        </div>
        <div className="flex flex-col items-center pt-[5px]">
          <p className="font-bold text-bluePrimary">{selectText()}</p>
          <div className="flex items-center pt-3 gap-1">
            {optionPlan === "created" ? (
              <Image src="/loading2.gif" alt="loading" width={35} height={35} />
            ) : (
              ""
            )}
            <p className="text-sm text-blackOpacity text-center">
              {optionPlan === "created"
                ? "Carregando novo plano"
                : "Você será redirecionado para a página home"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
