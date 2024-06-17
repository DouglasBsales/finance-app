"use client";

import { createContext } from "react";
import { useState } from "react";

export const HomeContext = createContext({} as any);

export default function HomeContextProvider({ children }: any) {
  const [dataUserGoogle, setDataUserGoogle] = useState(null);

  return (
    <HomeContext.Provider
      value={{
        dataUserGoogle,
        setDataUserGoogle,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
