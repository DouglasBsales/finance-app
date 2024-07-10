import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FunctionComponent } from "react";
import { formatarNumero } from "../PlanPage/HeaderPlan";

type CustosProps = {
  infoCustos: any;
};

export const CardsCustos: FunctionComponent<CustosProps> = ({ infoCustos }) => {
  return (
    <div>
      <div className=" w-[145px] rounded-md bg-white pl-3 pb-3">
        <div className="pt-4">
          <div className="w-9 h-9 flex justify-center items-center rounded-full bg-whitePrimary">
            <FontAwesomeIcon
              icon={faCreditCard}
              className="text-[#DAA520] text-xl"
            />
          </div>
        </div>
        <div className="pt-4">
          <p className="text-blackPrimary font-semibold">{infoCustos.name}</p>
          <div className="flex gap-1">
            <p className="text-xs font-medium text-blackPrimary">
              {formatarNumero(infoCustos.value)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
