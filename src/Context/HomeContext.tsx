"use client";

import { db } from "@/services/firebase";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { nanoid } from "nanoid";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

export const HomeContext = createContext<any>(null);

type TransationsType = {
  // tipo de dados a serem encviados para o dataBase nas transações
  id: string;
  name: string;
  plano?: string;
  value: number;
  icon: string;
  date: string;
  sentValue: boolean;
};

export default function HomeContextProvider({ children }: any) {
  const [optionPlan, setOptionPlan] = useState<String>("");

  let userGoogle: any = "";
  if (typeof window !== "undefined") {
    userGoogle = localStorage.getItem("userGoogle");
  }

  const userCollectionRef = collection(db, "users");
  const userGoogleObj = userGoogle ? JSON.parse(userGoogle) : null;
  const userDocRef = userGoogleObj? doc(userCollectionRef, userGoogleObj.uid): null; // Selecionando conta do usuário
  const walletCollectionRef = userDocRef? collection(userDocRef, "valueWallet"): null; // selecionando valueWallet no banco de dados

  const [dataUser, setDataUser] = useState<any>({});
  const [valueWallet, setValueWallet] = useState<any>(0);

  // LINHA ACIMA OS STATES SETADOS DA HOME
  // LINHA ABAIXO PARA CAPTURAR OS DADOS ESPECÍFICOS DO USUARIO NA DATABASE DO FIREBASE

  const getDataUser = async () => {
    if (userGoogleObj?.uid) {
      const userDocRef = doc(userCollectionRef, userGoogleObj.uid);
      const dataUserSnap = await getDoc(userDocRef);
      return dataUserSnap.data();
    }
  };

  // Use useQuery to fetch data
  const { data: userData, error } = useQuery("dataUser", getDataUser, {
    onSuccess: (data) => setDataUser(data),
  });

  // LINHA ABAIXO PARA ATUALIZAÇÃO DA WALLET PRINCIPAL DA HOME

  const [idWalletAtt, setIdWalletAtt] = useState<any>();

  const getValueWallet = async () => {
    if (walletCollectionRef) {
      const walletRefSnap = await getDocs(walletCollectionRef);
      const walletData = walletRefSnap.docs.map((doc) => doc.data());
      const walletDocId = walletRefSnap.docs[0];
      const walletDocIdref = walletDocId
        ? doc(walletCollectionRef, walletDocId.id)
        : null;
      setIdWalletAtt(walletDocIdref);
      return walletData;
    }
  };

  const {} = useQuery("valueWalletHome", getValueWallet, {
    onSuccess: (data) => setValueWallet(data),
    enabled: !!walletCollectionRef, // Enable query only if walletCollectionRef is not null
    staleTime: 1000 * 60 * 10, // 10 minutos
    cacheTime: 1000 * 60 * 60, // 1 hora
  });

  // LINHA ABAIXO PARA ATUALIZAÇÃO DOS PLANOS CRIADOS
  const [plansData, setPlansData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const plansCollect = userDocRef ? collection(db, "users", userGoogleObj.uid, "planos") : null;

  let plansArray: any = null;
  const getPlans = async () => {
    setIsLoading(true);

    if (plansCollect) {
      const plansDocs = await getDocs(plansCollect);
      plansArray = plansDocs.docs.map((doc) => doc.data());
    }
    setIsLoading(false);
    return plansArray;
  };

  const {} = useQuery("plansData", getPlans, {
    onSuccess: (data) => setPlansData(data),
    enabled: !!plansCollect, // Enable query only if plansCollect is not null
    staleTime: 1000 * 60 * 10, // 10 minutos
    cacheTime: 1000 * 60 * 60, // 1 hora
  });

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

  const transationsDataPlan: TransationsType = {
    // tipo de dados a serem enviados para as transacoes na wallet do plano
    id: nanoid(),
    name:
    methodWallet === "entrada" ? "Entrada de dinheiro no plano" : "Saida de dinheiro no plano",
    plano: planSelected ? planSelected.data.nameOfPlan : null,
    value:  methodWallet === "entrada" ? valueParsedSent : valueParsedExit,
    icon: methodWallet === "entrada" ? "/arrowUp.svg" : "/arrowDown.svg",
    date: new Date().toLocaleDateString("pt-BR"),
    sentValue: methodWallet === "entrada" ? true : false,
  };

  const transationsAttPlan = {
    id: nanoid(),
    data: transationsDataPlan,
  };

  const updateValueWalletPlan = async () => {
    if (methodWallet === "saida" && valueParsedExit > valueWalletDb) {
      alert("Saldo insuficiente");
      return;
    }

    if (!refDocPlan || !planSelected) return;
      // Remove o plano atual
      await updateDoc(refDocPlan, {planos: arrayRemove(planSelected)});

      // Espera um pouco para garantir que o Firestore processe a remoção
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Busca os dados atualizados dos planos
      const updatedPlansSnap: any = await getDoc(refDocPlan);
      const updatedPlansData = updatedPlansSnap.data()?.planos || [];

      const newPlansArray = [planArray, ...updatedPlansData]; // Adiciona o novo plano na primeira posição do array
      await updateDoc(refDocPlan, {planos: newPlansArray });   // Atualiza o documento do plano com o novo array de planos

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

  // LINHA ABAIXO PARA AS TRANSACOES DINAMICAS DA CARTEIRA PRINCIPAL

  const transationsCollect = userDocRef
    ? collection(db, "users", userGoogleObj.uid, "transacoes")
    : null;
  const [transations, setTransations] = useState<any>([]); // recebe os dados do fecth em cache
  const [transationRefId, setTransationsRefId] = useState<any>(); // recebe a referência do plano
  const [typeTransations, setSetTypeTransations] = useState<string>(""); // seta o tip da transacao da carteira principal ou planos
  const [valueSentWalletPlan, setValueSentWalletPlan] = useState<string>(""); // captuir o valor de adição do modal wallet principal
  const [valueExitWalletPlan, setValueExitWalletPlan] = useState<string>(""); // captuir o valor de subtração do modal wallet principal

  const numberWallet = valueWallet
    ? valueWallet.reduce(
        (acc: number, wallet: any) => acc + parseFloat(wallet.valueWallet),
        0
      )
    : null;

  const valueWalletSentPlan = parseFloat(valueSentWalletPlan);
  const newValueSentAtt = numberWallet + valueWalletSentPlan;

  const valueWallExitPlan = parseFloat(valueExitWalletPlan);
  const newValueExitAtt = numberWallet - valueWallExitPlan;

  const transationsData: TransationsType = {
    // tipo de dados a serem enviados para as transacoes na wallet principal
    id: nanoid(),
    name:
      typeTransations === "walletHomeSent"
        ? "Entrada de dinheiro carteira"
        : "Saida de dinheiro carteira",
    value:
      typeTransations === "walletHomeSent"
        ? valueWalletSentPlan
        : valueWallExitPlan,
    icon:
      typeTransations === "walletHomeSent" ? "/arrowUp.svg" : "/arrowDown.svg",
    date: new Date().toLocaleDateString("pt-BR"),
    sentValue: typeTransations === "walletHomeSent" ? true : false,
  };

  const [currentTransationDb, setCurrentTransationDb] = useState<any>([]);
  const getTransations = async () => {
    let transationsArray = null;
    let transationsRefId = null;

    if (transationsCollect) {
      const transationsDocs = await getDocs(transationsCollect);
      transationsArray = transationsDocs.docs.map((doc) => doc.data());
      const transationId = transationsDocs.docs[0];

      const currentTransation = transationsDocs.docs
        .map((doc) => doc.data().transacoes)
        .flat();
      transationsRefId = transationId
        ? doc(transationsCollect, transationId.id)
        : null;
      setTransationsRefId(transationsRefId);
      setCurrentTransationDb(currentTransation);
    }

    return transationsArray;
  };

  const {} = useQuery("transationsData", getTransations, {
    onSuccess: (data) => setTransations(data),
    enabled: !!plansCollect, // Enable query only if plansCollect is not null
    staleTime: 1000 * 60 * 10, // 10 minutos
    cacheTime: 1000 * 60 * 60,
  });

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
        typeTransations,
        transationRefId,
        transationsData,
        setValueSentWalletPlan,
        newValueSentAtt,
        setValueExitWalletPlan,
        newValueExitAtt,
        numberWallet,
        valueWallExitPlan,
        currentTransationDb,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
