"use client";

import { createContext } from "react";

import { useState } from "react";
import { collection } from "firebase/firestore";
import { db } from "@/services/firebase";

export const HomeContext = createContext({} as any);

export default function HomeContextProvider({ children }: any) {
  const [dataUser, setDataUsers] = useState<any>([]);
  const [dataUserGoogle, setDataUserGoogle] = useState<[]>([]);

  return (
    <HomeContext.Provider
      value={{
        dataUser,
        setDataUsers,
        dataUserGoogle,
        setDataUserGoogle,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
