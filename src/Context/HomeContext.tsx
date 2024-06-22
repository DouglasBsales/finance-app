"use client";

import { db } from "@/services/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

export const HomeContext = createContext({} as any);

export default function HomeContextProvider({ children }: any) {
  let userGoogle: any = "";
  if (typeof window !== "undefined") {
    userGoogle = localStorage.getItem("userGoogle");
  }

  const userCollectionRef = collection(db, "users");
  const userGoogleObj = userGoogle ? JSON.parse(userGoogle) : null;
  const userDocRef = userGoogleObj ? doc(userCollectionRef, userGoogleObj.uid) : null; // Selecionando conta do usuário
  const walletCollectionRef = userDocRef ? collection(userDocRef, "valueWallet") : null; // selecionando valueWallet no banco de dados 

  const [dataUser, setDataUser] = useState<any>({});
  const [valueWallet, setValueWallet] = useState<any>(0); // Inicializando como array

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

  const [idWalletAtt, setIdWalletAtt] = useState<any>()
  useEffect(() => {
    const getValueWallet = async () => {
      if (walletCollectionRef) {
        const walletRefSnap = await getDocs(walletCollectionRef);
        const walletData = walletRefSnap.docs.map((doc) => doc.data());
        const walletDocRef = await getDocs(walletCollectionRef)
        const walletDocId = walletDocRef.docs[0];
        const walletDocIdref = doc(walletCollectionRef, walletDocId.id) || null;
        setValueWallet(walletData);
        setIdWalletAtt(walletDocIdref)
      }
    };

    getValueWallet();
  }, [walletCollectionRef]); // Use walletCollectionRef como dependência


  const [plansData, setPlansData] = useState<any>()
  useEffect(() => {
    const getPlans = async () => {
      const plansCollect = collection(db, "users", userGoogleObj.uid, "planos")
      const plansDocs = await getDocs(plansCollect)
      const plansArray = plansDocs.docs.map((doc)=> doc.data())
      setPlansData(plansArray)
      console.log(plansData)
    }

    getPlans()
  }, [])


  return (
    <HomeContext.Provider value={{ dataUser, valueWallet, userGoogle, walletCollectionRef, idWalletAtt, plansData }}>
      {children}
    </HomeContext.Provider>
  );
}
