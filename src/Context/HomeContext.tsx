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
  const [valueWallet, setValueWallet] = useState<any>([]); // Inicializando como array

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
  }, [userGoogleObj?.uid]); // Adicione uma dependência para o useEffect

  useEffect(() => {
    const getValueWallet = async () => {
      if (walletCollectionRef) {
        const walletRefSnap = await getDocs(walletCollectionRef); // Retorno dos dados do valueWallet
        const walletData = walletRefSnap.docs.map((doc) => doc.data());
        setValueWallet(walletData);
      }
    };

    getValueWallet();
  }, [walletCollectionRef]); // Use walletCollectionRef como dependência

  return (
    <HomeContext.Provider value={{ dataUser, valueWallet }}>
      {children}
    </HomeContext.Provider>
  );
}
