"use client";

import { db } from "@/services/firebase";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

export const HomeContext = createContext<any>(null);

export default function HomeContextProvider({ children }: any) {
  const [optionPlan, setOptionPlan] = useState<String>("");

  let userGoogle: any = "";
  if (typeof window !== "undefined") {
    userGoogle = localStorage.getItem("userGoogle");
  }

  const userCollectionRef = collection(db, "users");
  const userGoogleObj = userGoogle ? JSON.parse(userGoogle) : null;
  const userDocRef = userGoogleObj
    ? doc(userCollectionRef, userGoogleObj.uid)
    : null; // Selecionando conta do usuário
  const walletCollectionRef = userDocRef
    ? collection(userDocRef, "valueWallet")
    : null; // selecionando valueWallet no banco de dados

  const [dataUser, setDataUser] = useState<any>({});
  const [valueWallet, setValueWallet] = useState<any>(0);

  // LINHA ACIMA OS STATES SETADOS DA HOME
  // LINHA ABAIXO PARA CAPTURAR OS DADOS ESPECÍFICOS DO USUARIO NA DATABASE DO FIREBASE

  useEffect(() => {
    const getDataUser = async () => {
      // Função para capturar os dados específicos do usuário no banco
      if (userGoogleObj?.uid) {
        const userDocRef = doc(userCollectionRef, userGoogleObj.uid);
        const dataUserSnap = await getDoc(userDocRef);
        setDataUser(dataUserSnap.data());
      }
    };

    getDataUser();
  }, [userGoogleObj?.uid, userCollectionRef]);

  // LINHA ABAIXO PARA ATUALIZAÇÃO DA WALLET PRINCIPAL DA HOME

  const [idWalletAtt, setIdWalletAtt] = useState<any>();
  useEffect(() => {
    const getValueWallet = async () => {
      if (walletCollectionRef) {
        const walletRefSnap = await getDocs(walletCollectionRef);
        const walletData = walletRefSnap.docs.map((doc) => doc.data());
        const walletDocId = walletRefSnap.docs[0];
        const walletDocIdref = walletDocId
          ? doc(walletCollectionRef, walletDocId.id)
          : null;
        setValueWallet(walletData);
        setIdWalletAtt(walletDocIdref);
      }
    };

    getValueWallet();
  }, [userGoogleObj?.uid, walletCollectionRef]); // Use walletCollectionRef como dependência

  // LINHA ABAIXO PARA ATUALIZAÇÃO DOS PLANOS CRIADOS
  const [plansData, setPlansData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const plansCollect = userDocRef? collection(db, "users", userGoogleObj.uid, "planos"): null;
  useEffect(() => {
    const getPlans = async () => {
      setIsLoading(true);
      if (plansCollect) {
        const plansDocs = await getDocs(plansCollect);
        const plansArray = plansDocs.docs.map((doc) => doc.data());
        setPlansData(plansArray);
      }
      setIsLoading(false);
    };

    getPlans();
  }, [plansCollect]);

  // LINHA ABAIXO PARA ATUALIZAÇÃO DA WALLET DOS PLANOS DE MANEIRA DINÂMICA

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
  const valueAttSent: number = planSelected
    ? valueParsedSent + valueWalletDb
    : null;

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

  const updateValueWalletPlan = async () => {
    if (methodWallet === "saida" && valueParsedExit > valueWalletDb) {
      alert("Saldo insuficiente");
      return;
    }

    // Remove o plano selecionado do array no Firestore
    await updateDoc(refDocPlan, {
      planos: arrayRemove(planSelected),
    });

    // Adiciona o novo plano atualizado ao array no Firestore
    await updateDoc(refDocPlan, {
      planos: arrayUnion(planArray),
    });

    if (typeof window !== "undefined") {
      const updatedPlan = {
        ...planSelected,
        data: { ...planSelected.data, valuePlanWallet: selectOptionWallet },
      };

      localStorage.setItem("planSelected", JSON.stringify(updatedPlan));
      const planSelectIfIdStorage: any = localStorage.getItem("planSelected");
      const convertedPlanSelectIfIdStorage: any = JSON.parse(
        planSelectIfIdStorage
      );
      setPlanSelected(convertedPlanSelectIfIdStorage);
    }
    methodWallet === "entrada"
      ? setShowModalSentValue(false)
      : setShowModalExitValue(false);
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

  const transationsCollect = userDocRef? collection(db, "users", userGoogleObj.uid, "transacoes"): null;
  const [transations, setTransations] = useState<any>([])
  const [typeTransations, setSetTypeTransations] = useState<string>("")
  useEffect(() => {
    const getTransations = async () => {
      if (transationsCollect) {
        const transationsDocs = await getDocs(transationsCollect);
        const transationsArray = transationsDocs.docs.map((doc) => doc.data());
        setTransations(transationsArray)
      }
    };

    getTransations();
  }, [transationsCollect]);

  return (
    <HomeContext.Provider
      value={{
        dataUser,
        valueWallet,
        userGoogle,
        walletCollectionRef,
        idWalletAtt,
        plansData,
        plansCollect,
        isLoading,
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
        setOptionPlan,
        optionPlan,
        transations,
        setSetTypeTransations,
        typeTransations
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
