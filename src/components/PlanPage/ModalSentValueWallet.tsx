import { HomeContext } from "@/Context/HomeContext";
import {
  faCircleArrowUp,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDocs, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { FunctionComponent } from "react";

type ModalTypeProps = {
  setShowModalSentValue: any;
  planSelected: any;
};

const ModalSentvalueWallet: FunctionComponent<ModalTypeProps> = ({
  setShowModalSentValue,
  planSelected,
}) => {
  const { refDocPlan } = useContext(HomeContext);

  const [valueSentWallet, setValueSentWallet] = useState<string>();

  const updateValueWalletPlan = async () => {
    const planAtt = [...planSelected, { valueWallet: Number(valueSentWallet) }];
    await updateDoc(refDocPlan, { planos: planAtt });
    setShowModalSentValue(false);
  };

  return (
    <div>
      <div className="w-full fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="w-[263px] bg-whitePrimary px-4 rounded-[20px] pb-4">
          <div className="pt-4">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faCircleArrowUp}
                className="text-5xl text-bluePrimary"
              />
              <p className="text-blackPrimary text-xl font-medium">Entrada</p>
            </div>
            <div className="pt-4">
              <p className="text-blackPrimary text-xl">Valor: </p>
            </div>
            <div className="w-[223px] pt-1 pb-[54px]">
              <div className="flex items-center bg-white rounded-md pl-[9px]">
                <FontAwesomeIcon
                  icon={faMoneyCheckDollar}
                  className="text-blackOpacity text-sm"
                />
                <input
                  type="text"
                  className="h-[40px] rounded-md outline-none pl-[9px] text-blackPrimary"
                  placeholder="ex: 100"
                  onChange={(e) => setValueSentWallet(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-[11px]">
            <button
              className="border-2 rounded-md"
              onClick={() => setShowModalSentValue(false)}
            >
              <p className="py-[8px] px-4 text-blackOpacity">Cancelar</p>
            </button>
            <button className="bg-bluePrimary rounded-md"onClick={updateValueWalletPlan}>
              <p className="py-[8px] px-4 text-white">Confirmar</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSentvalueWallet;
