"use client";

import { createContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { nanoid } from "nanoid";

import { db } from "@/services/firebase";
import {collection,doc,getDoc,getDocs} from "firebase/firestore";


export const HomeContext = createContext<any>(null);

export type TransationsType = {
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
  const [isPage, setIsPage] = useState<string>("Home");

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

  const getValueWallet = async () => { // CAPTURAR O VALOR DA WALLET PRINCIPAL
    if (walletCollectionRef) {
      const walletRefSnap = await getDocs(walletCollectionRef);
      const walletData = walletRefSnap.docs.map((doc) => doc.data());
      const walletDocId = walletRefSnap.docs[0];
      const walletDocIdref = walletDocId? doc(walletCollectionRef, walletDocId.id) : null;
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
  const [isPlansOrCustos, setIsPlansOrCustos] = useState<string>("")

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

  // LINHA ABAIXO PARA ATUALIZAÇÃO DOS CUSTOS CRIADOS
  const custosCollect = userDocRef ? collection(db, "users", userGoogleObj.uid, "custos"): null;
  const [custosData, setCustosData] = useState<any>([]);
  const [custoSelected, setCustoSelected] = useState<any>(null);
  let custosArray: any = null;

  const [refDocCustos, setRefDocCusto] = useState<any>(null)

  const getCustos = async () => {
    if (custosCollect) {
      const plansDocs = await getDocs(custosCollect);
      custosArray = plansDocs.docs.map((doc) => doc.data());
      const custosRefId = plansDocs.docs[0].id
      const refDocCustos = doc (custosCollect, custosRefId)
      setRefDocCusto(refDocCustos)
    }
    return custosArray;
  };

  const {} = useQuery("custosData", getCustos, {
    onSuccess: (data) => setCustosData(data),
    enabled: !!plansCollect, // Enable query only if plansCollect is not null
    staleTime: 1000 * 60 * 10, // 10 minutos
    cacheTime: 1000 * 60 * 60, // 1 hora
  });
 
  // LINHA ABAIXO PARA AS TRANSACOES DINAMICAS DA CARTEIRA PRINCIPAL

  const transationsCollect = userDocRef? collection(db, "users", userGoogleObj.uid, "transacoes"): null;
  const [transations, setTransations] = useState<any>([]); // recebe os dados do fecth em cache
  const [transationRefId, setTransationsRefId] = useState<any>(); // recebe a referência do plano
  const [typeTransations, setSetTypeTransations] = useState<string>(""); // seta o tip da transacao da carteira principal ou planos
  const [valueSentWalletPlan, setValueSentWalletPlan] = useState<string>(""); // captuir o valor de adição do modal wallet principal
  const [valueExitWalletPlan, setValueExitWalletPlan] = useState<string>(""); // captuir o valor de subtração do modal wallet principal

  const numberWallet = valueWallet ? valueWallet.reduce( (acc: number, wallet: any) => acc + parseFloat(wallet.valueWallet), 0): null;

  const valueWalletSentPlan = parseFloat(valueSentWalletPlan);
  const newValueSentAtt = numberWallet + valueWalletSentPlan;

  const valueWallExitPlan = parseFloat(valueExitWalletPlan);
  const newValueExitAtt = numberWallet - valueWallExitPlan;

  const transationsData: TransationsType = {
    // tipo de dados a serem enviados para as transacoes na wallet principal
    id: nanoid(),
    name:
    typeTransations === "walletHomeSent" ? "Entrada de dinheiro carteira" : "Saida de dinheiro carteira",
    value: typeTransations === "walletHomeSent" ? valueWalletSentPlan : valueWallExitPlan,
    icon: typeTransations === "walletHomeSent" ? "/arrowUp.svg" : "/arrowDown.svg",
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
        setIsPage,
        isPage,
        dataUser,
        valueWallet,
        userGoogle,
        walletCollectionRef,
        idWalletAtt,
        plansData,
        plansCollect,
        isLoading,
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
        custosData,
        custosCollect,
        refDocCustos,
        custosArray,
        setIsPlansOrCustos,
        isPlansOrCustos,
        setCustoSelected,
        custoSelected
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
