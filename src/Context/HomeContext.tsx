"use client";

import { db } from "@/services/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

export const HomeContext = createContext<any>(null);

export default function HomeContextProvider({ children }: any) {
  let userGoogle: any = "";
  if (typeof window !== "undefined") {
    userGoogle = localStorage.getItem("userGoogle");
  }

  const userCollectionRef = collection(db, "users");
  const userGoogleObj = userGoogle ? JSON.parse(userGoogle) : null;
  const userDocRef = userGoogleObj ? doc(userCollectionRef, userGoogleObj.uid) : null; // Selecionando conta do usuário
  const walletCollectionRef = userDocRef ? collection(userDocRef, "valueWallet"): null; // selecionando valueWallet no banco de dados

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
  }, [userGoogleObj?.uid]);

  // LINHA ABAIXO PARA ATUALIZAÇÃO DA WALLET PRINCIPAL DA HOME

  const [idWalletAtt, setIdWalletAtt] = useState<any>();
  useEffect(() => {
    const getValueWallet = async () => {
      if (walletCollectionRef) {
        const walletRefSnap = await getDocs(walletCollectionRef);
        const walletData = walletRefSnap.docs.map((doc) => doc.data());
        const walletDocId = walletRefSnap.docs[0];
        const walletDocIdref = walletDocId? doc(walletCollectionRef, walletDocId.id): null;
        setValueWallet(walletData);
        setIdWalletAtt(walletDocIdref);
      }
    };

    getValueWallet();
  }, [userGoogleObj?.uid]); // Use walletCollectionRef como dependência

  // LINHA ABAIXO PARA ATUALIZAÇÃO DOS PLANOS CRIADOS
  const [plansData, setPlansData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const plansCollect = userDocRef ? collection(db, "users", userGoogleObj.uid, "planos"): null;
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
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
