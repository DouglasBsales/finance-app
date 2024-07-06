import { useContext } from "react";
import { HomeContext } from "@/Context/HomeContext";

import { arrayUnion, updateDoc } from "firebase/firestore";
import { nanoid } from "nanoid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";

type ModalSentValueProps = {
  setOpenModalSentValue: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalExitValue: React.FC<ModalSentValueProps> = ({ setOpenModalSentValue }) => {

  const {idWalletAtt, setValueExitWalletPlan, newValueExitAtt, numberWallet, valueWallExitPlan, transationsData, transationRefId, currentTransationDb} = useContext(HomeContext);

  const exitValueWallet = async () => {
    if (numberWallet === 0 || valueWallExitPlan > numberWallet) {
      return;
    }

    const transationsAtt = {
      id: nanoid(),
      data: transationsData,
    };

    const updatedTransacoes = [transationsAtt, ...currentTransationDb];
    await updateDoc(idWalletAtt, { valueWallet: newValueExitAtt });
    await updateDoc(transationRefId, { transacoes: updatedTransacoes });

    setOpenModalSentValue(false);
  };


  return (
    <div className="w-full fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[263px] bg-whitePrimary px-4 rounded-[20px] pb-4">
        <div className="pt-4">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faCircleArrowDown}
              className="text-5xl text-bluePrimary"
            />
            <p className="text-blackPrimary text-xl font-medium">Saída</p>
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
                onChange={(e) =>setValueExitWalletPlan(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-[11px]">
          <button className="border-2 rounded-md" onClick={() => setOpenModalSentValue(false)}>
            <p className="py-[8px] px-4 text-blackOpacity">Cancelar</p>
          </button>
          <button className="bg-bluePrimary rounded-md" onClick={exitValueWallet}>
            <p className="py-[8px] px-4 text-white">Confirmar</p>
          </button>
        </div>
      </div>
    </div>
  );
};
