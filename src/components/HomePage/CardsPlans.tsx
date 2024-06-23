import { FunctionComponent, useContext } from "react";

import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { HomeContext } from "@/Context/HomeContext";

type CardPlansProps = {
  nameOfPlan: string;
  valueOfPlan: number;
  planId: string;
};

const CardsPlans: FunctionComponent<CardPlansProps> = ({
  nameOfPlan,
  valueOfPlan,
  planId,
}) => {
  const { plansData, setPlanSelectIfId } = useContext(HomeContext);

  const selectPlan = (id: string): void => {
    const planSelected = plansData.map((plan: any) =>
      plan.planos.find((plano: any) => plano.id === id)
    );
    setPlanSelectIfId(planSelected);
  };

  return (
    <div className=" rounded-md bg-white px-3 pb-3">
      <Link href="/Pages/Plan" onClick={() => selectPlan(planId)}>
        <div className="pt-4">
          <div className="w-9 h-9 flex justify-center items-center rounded-full bg-whitePrimary">
            <FontAwesomeIcon
              icon={faHouse}
              className="text-bluePrimary text-xl"
            />
          </div>
        </div>
        <div className="pt-4">
          <p className="text-blackPrimary font-semibold">{nameOfPlan}</p>
          <div className="flex gap-1">
            <p className="text-xs font-medium text-blackPrimary">R$ 0,00</p>
            <p className="text-xs font-medium text-blackOpacity">
              /R$ {valueOfPlan}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardsPlans;
