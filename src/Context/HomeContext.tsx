"use client";

import { db } from "@/services/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const HomeContext = createContext({} as any);

export default function HomeContextProvider({ children }: any) {
  let userGoogle = null;
  if (typeof window !== "undefined") {
    userGoogle = localStorage.getItem("userGoogle");
  }

  const userCollectionRef = collection(db, "users");
  const userGoogleObj = userGoogle ? JSON.parse(userGoogle) : null;
  const userDocRef = doc(userCollectionRef, userGoogleObj.uid); // selecionando conta do usuario
  const walletCollectionRef = collection(userDocRef, "valueWallet"); // jogar para o escopo global ( usando a colecao do valueWallet )

  const [dataUser, setDataUser] = useState<any>({});
  const [valueWallet, setValueWallet] = useState<any>([]); // Inicializando como array

  useEffect(() => {
    const getDataUser = async () => {
      // funcao para capturar os dados específicos do usuário no banco
      if (userGoogleObj?.uid) {
        const userDocRef = doc(userCollectionRef, userGoogleObj.uid);
        const dataUserSnap = await getDoc(userDocRef);
        setDataUser(dataUserSnap.data());
      }
    };

    getDataUser();
  }, []);

  useEffect(() => {
    const getValueWallet = async () => {
      if (userGoogleObj?.uid) {
        const walletRefSnap = await getDocs(walletCollectionRef); // retorno dos dados do valueWallet
        const walletData = walletRefSnap.docs.map((doc) => doc.data());
        setValueWallet(walletData);
      }
    };
    getValueWallet();
  }, [valueWallet]);

  return (
    <HomeContext.Provider value={{ dataUser, valueWallet }}>
      {children}
    </HomeContext.Provider>
  );
}
