import { useContext, useState } from "react";
import { HomeContext } from "@/Context/HomeContext";
import { useQueryClient } from "react-query";
import { nanoid } from "nanoid";

import { getDoc, setDoc, updateDoc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowUp,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";

type ModalSentValueProps = {
  setOpenModalSentValue: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalSentValue: React.FC<ModalSentValueProps> = ({
  setOpenModalSentValue,
}) => {
  const {
    idWalletAtt,
    transationRefId,
    transationsData,
    setValueSentWalletPlan,
    newValueSentAtt,
  } = useContext(HomeContext);

  const [error, setError] = useState(false)

  const queryClient = useQueryClient();
  const changeSentValueWallet = async () => {


    if(isNaN(newValueSentAtt)){
      setError(true)
      return;
    }

    const transationsAtt = {
      id: nanoid(),
      data: transationsData,
    };

    // Atualiza o valor da carteira no Firestore
    await updateDoc(idWalletAtt, { valueWallet: newValueSentAtt });
    queryClient.invalidateQueries("valueWalletHome");

    if (transationRefId) {
      // Recupera o documento de transações
      const transationDoc: any = await getDoc(transationRefId);

      if (transationDoc.exists()) {
        const existingTransacoes = transationDoc.data().transacoes || []; // Recupera o array existente de transações
        const updatedTransacoes = [transationsAtt, ...existingTransacoes]; // Adiciona a nova transação ao início do array
        await updateDoc(transationRefId, { transacoes: updatedTransacoes }); // Atualiza o documento de transações com o novo array
      } else {
        await setDoc(transationRefId, { transacoes: [transationsAtt] }); // Adiciona a primeira transação ao documento de transações
      }
    }

    queryClient.invalidateQueries("transationsData");

    setOpenModalSentValue(false);
  };

  const closedModal = () => {
    setOpenModalSentValue(false);
  };

  return (
    <div className="w-full fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[263px] bg-whitePrimary px-4 rounded-[20px] pb-4">
        <div className="pt-4">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faCircleArrowUp}
              className="text-5xl text-[#46E068]"
            />
            <p className="text-blackPrimary text-xl">Entrada</p>
          </div>
          <div className="pt-4">
            <p className="text-blackPrimary">Valor: </p>
          </div>
          <div className="pt-1 pb-[54px]">
            <input
              type="text"
              className="w-full h-[40px] rounded-md outline-none pl-[9px] text-blackPrimary border border-[#b8b8b865] focus:border-[#202020]"
              placeholder="ex: 100"
              onChange={(e) => setValueSentWalletPlan(e.target.value)}
            />
            {error && <p className="text-redPrimary text-sm pt-1">Insira um número</p>}
          </div>
        </div>
        <div className="flex gap-[11px]">
          <button className="bg-[#F5F5F7] rounded-[20px]" onClick={closedModal}>
            <p className="py-[8px] px-4 text-[#B8B8B8]">Cancelar</p>
          </button>
          <button
            className="bg-[#2E2E2E] rounded-[20px]"
            onClick={changeSentValueWallet}
          >
            <p className="py-[8px] px-4 text-white">Confirmar</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSentValue;
