import React, { useContext } from "react";
import { getDoc, setDoc, updateDoc } from "firebase/firestore";
import { HomeContext } from "@/Context/HomeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowUp,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";

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
    currentTransationDb,
  } = useContext(HomeContext);

  const changeSentValueWallet = async () => {
    const transationsAtt = {
      id: nanoid(),
      data: transationsData,
    };
  
    // Atualiza o valor da carteira no Firestore
    await updateDoc(idWalletAtt, { valueWallet: newValueSentAtt });
  
    if (transationRefId) {
      // Recupera o documento de transações
      const transationDoc: any = await getDoc( transationRefId)
  
      if (transationDoc.exists()) {
        const existingTransacoes = transationDoc.data().transacoes || [];    // Recupera o array existente de transações
        const updatedTransacoes = [transationsAtt, ...existingTransacoes];   // Adiciona a nova transação ao início do array
        await updateDoc( transationRefId, { transacoes: updatedTransacoes });   // Atualiza o documento de transações com o novo array
      } else {
        await setDoc( transationRefId, { transacoes: [transationsAtt] });   // Adiciona a primeira transação ao documento de transações
      }
    }
  
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
                onChange={(e) => setValueSentWalletPlan(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-[11px]">
          <button className="border-2 rounded-md" onClick={closedModal}>
            <p className="py-[8px] px-4 text-blackOpacity">Cancelar</p>
          </button>
          <button
            className="bg-bluePrimary rounded-md"
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
