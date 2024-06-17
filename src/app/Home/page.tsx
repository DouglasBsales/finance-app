"use client";

import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";
import Image from "next/image";

export default function Home() {
  const userCollectionRef = collection(db, "users"); 

  let userGoogle = null;
  if (typeof window !== "undefined") {
    userGoogle = localStorage.getItem("userGoogle");
  }
  const userGoogleObj = userGoogle ? JSON.parse(userGoogle) : null;

  const [dataUser, setDataUser] = useState<any>({});
  const [valueWallet, setValueWallet] = useState<any>([]); // Inicializando como array

  useEffect(() => { // funcao para capturar os dados específicos do usuário no banco 
    const getDataUser = async () => {
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
        const userDocRef = doc(userCollectionRef, userGoogleObj.uid); // jogar para o escopo global ( ref da conta do usuario ) 
        const walletCollectionRef = collection(userDocRef, "valueWallet"); // jogar para o escopo global ( usando a colecao do valueWallet ) 
        const walletRefSnap = await getDocs(walletCollectionRef); // retorno dos dados do valueWallet
        const walletData = walletRefSnap.docs.map((doc) => doc.data());
        setValueWallet(walletData);
      }
    };
    getValueWallet();
  }, []);

  console.log(valueWallet);

  // TRANSFORMAR O JSX EM COMPONENTS 

  return (
    <div className="w-full h-screen flex flex-col items-center bg-whitePrimary">
      <div className="w-full fixed flex flex-col h-[357px] bg-bluePrimary rounded-b-[30px] px-[28px]"> 
        <div className="flex pt-[41px] items-center">
          <div>
            <Image
              src={dataUser.photoURL || "/default-avatar.png"} // Default image if photoURL is undefined
              alt=""
              width={60}
              height={60}
              className="rounded-full"
            />
          </div>
          <div className="flex-col justify-center items-center text-center pl-[37px]">
            <p className="text-white">Bem vindo de volta</p>
            <p className="text-white font-semibold text-xl ">{dataUser.name}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center pt-[71px]">
          <p className="text-white">Seu saldo</p>
          {valueWallet.length > 0 ? (
            valueWallet.map((wallet: any, index: number) => (
              <input
                key={index}
                type="text"
                value={`R$ ${wallet.valueWallet.toFixed(2).replace(".", ",")}`}
                readOnly
                className="text-center outline-none bg-transparent text-4xl font-semibold text-white"
              />
            ))
          ) : (
            <p className="text-white">Carregando saldo...</p>
          )}
        </div>
      </div>
    </div>
  );
}
