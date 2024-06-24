import { faCircleCheck, faSpinner, faTruckLoading } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ModalPlanCreated = () => {
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
          <p className="font-bold text-bluePrimary">Plano criado com sucesso</p>
          <div className="flex items-center pt-3 gap-2">
          <FontAwesomeIcon
              icon={faSpinner} className="text-bluePrimary text-xl"/>
              <p className="text-sm text-blackOpacity">Carregando novo plano</p>
          </div>
        </div>
      </div>
    </div>
  );
};
