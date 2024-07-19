"use client";

import { arrayRemove, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { createContext } from "react";
import { HomeContext } from "./HomeContext";
import {TransationsType} from "./HomeContext";

export const ContextPlan = createContext<any>(null)


export default function ContextPlanProvider({ children }: any) {
  const queryClient = useQueryClient();

  const {transationRefId, plansCollect} = useContext(HomeContext)

  type DataType = {
    nameOfPlan: string;
    valueOfPlan: number;
    valuePlanWallet: any;
    categorySelected: string;
    iconCategory: any;
  };

  const [methodWallet, setMethodWallet] = useState<string>(""); // state utilizado para selecionar entre entrada e saida
  const [planSelected, setPlanSelected] = useState<any>();
  const [valueSentWallet, setValueSentWallet] = useState<any>(); // method para capturar o valor enviado
  const [valueExitWallet, setValueExitWallet] = useState<any>(); // method para capturar o valor de saída

  const valueWalletDb = planSelected ? planSelected.data.valuePlanWallet : null;

  const valueParsedSent: number = parseFloat(valueSentWallet);
  const valueAttSent: number = planSelected? valueParsedSent + valueWalletDb : null;

  const valueParsedExit: number = parseFloat(valueExitWallet);
  const valueAttExit = valueWalletDb - valueParsedExit;

  const selectOptionWallet =
    methodWallet === "entrada" ? valueAttSent : valueAttExit;

  const data: DataType = {
    nameOfPlan: planSelected ? planSelected.data.nameOfPlan : null,
    valueOfPlan: planSelected ? planSelected.data.valueOfPlan : null,
    valuePlanWallet: selectOptionWallet,
    categorySelected: planSelected ? planSelected.data.categorySelected : null,
    iconCategory: planSelected ? planSelected.data.iconCategory : null,
  };

  const planArray = {
    id: planSelected ? planSelected.id : null,
    data: data,
  };

  const [showModalSentValue, setShowModalSentValue] = useState<boolean>(false);
  const [showModalExitValue, setShowModalExitValue] = useState<boolean>(false);

  const transationsDataPlan: TransationsType = {  // tipo de dados a serem enviados para as transacoes na wallet do plano
   
    id: nanoid(),
    name:
    methodWallet === "entrada" ? "Entrada de dinheiro no plano" : "Saida de dinheiro no plano",
    plano: planSelected ? planSelected.data.nameOfPlan : null,
    value: methodWallet === "entrada" ? valueParsedSent : valueParsedExit,
    icon: methodWallet === "entrada" ? "/arrowUp.svg" : "/arrowDown.svg",
    date: new Date().toLocaleDateString("pt-BR"),
    sentValue: methodWallet === "entrada" ? true : false,
  };

  const transationsAttPlan = {
    id: nanoid(),
    data: transationsDataPlan,
  };

  const [isLoadingUpdatePlan, SetIsLoadingUpdatePlan] = useState<Boolean>(false);
  const updateValueWalletPlan = async () => {
    if (methodWallet === "saida" && valueParsedExit > valueWalletDb) {
      alert("Saldo insuficiente");
      return;
    }

    if (!refDocPlan || !planSelected) return;

    SetIsLoadingUpdatePlan(true);
    // Remove o plano atual
    await updateDoc(refDocPlan, { planos: arrayRemove(planSelected) });

    // Espera um pouco para garantir que o Firestore processe a remoção
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Busca os dados atualizados dos planos
    const updatedPlansSnap: any = await getDoc(refDocPlan);
    const updatedPlansData = updatedPlansSnap.data()?.planos || [];

    const newPlansArray = [planArray, ...updatedPlansData]; // Adiciona o novo plano na primeira posição do array
    await updateDoc(refDocPlan, { planos: newPlansArray }); // Atualiza o documento do plano com o novo array de planos
    queryClient.invalidateQueries("plansData");

    if (transationRefId) {
      // Recupera o documento de transações
      const transationDoc: any = await getDoc(transationRefId);

      if (transationDoc.exists()) {
        const existingTransacoes = transationDoc.data().transacoes || []; // Recupera o array existente de transações
        const updatedTransacoes = [transationsAttPlan, ...existingTransacoes]; // Adiciona a nova transação ao início do array
        await updateDoc(transationRefId, { transacoes: updatedTransacoes }); // Atualiza o documento de transações com o novo array
      } else {
        await setDoc(transationRefId, { transacoes: [transationsAttPlan] }); // Adiciona a primeira transação ao documento de transações
        // VERIFICAR SE REALMENTE PRECISA DESSE ELSE
      }
    }

    if (typeof window !== "undefined") {
      const updatedPlan = {
        ...planSelected,
        data: { ...planSelected.data, valuePlanWallet: selectOptionWallet },
      };

      localStorage.setItem("planSelected", JSON.stringify(updatedPlan));
      const planSelectIfIdStorage: any = localStorage.getItem("planSelected");
      const convertedPlanSelectIfIdStorage: any = JSON.parse( planSelectIfIdStorage);
      setPlanSelected(convertedPlanSelectIfIdStorage);
    }

    methodWallet === "entrada"? setShowModalSentValue(false): setShowModalExitValue(false);

    queryClient.invalidateQueries("transationsData");
    SetIsLoadingUpdatePlan(false);
  };

  // LINHA ABAIXO PARA ATUALIZAÇÃO DA WALLET DOS PLANOS

  const [refDocPlan, setRefDocPlan] = useState<any>();
  useEffect(() => {
    const updateValueWallet = async () => {
      if (plansCollect) {
        const docsPlan = await getDocs(plansCollect);
        const docPlanId = docsPlan.docs[0];
        const refDocPlan = docPlanId ? doc(plansCollect, docPlanId.id) : null;
        setRefDocPlan(refDocPlan);
      }
    };

    updateValueWallet();
  }, [plansCollect]);

  return (
    <ContextPlan.Provider
      value={{
        refDocPlan,
        planSelected,
        setPlanSelected,
        valueSentWallet,
        setValueSentWallet,
        setValueExitWallet,
        planArray,
        showModalSentValue,
        setShowModalSentValue,
        showModalExitValue,
        setShowModalExitValue,
        setMethodWallet,
        methodWallet,
        updateValueWalletPlan,
        isLoadingUpdatePlan
      }}
    >
      {children}
    </ContextPlan.Provider>
  );
}
