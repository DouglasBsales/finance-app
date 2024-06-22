"use client";

import { HomeContext } from "@/Context/HomeContext";
import { Custos } from "@/components/HomePage/Custos";
import { Header } from "@/components/HomePage/Header";
import LastTransacoes from "@/components/HomePage/LastTransacoes";
import { Planos } from "@/components/HomePage/Planos";
import { useContext } from "react";

export default function Home() {

  const {plansData} = useContext(HomeContext)

  console.log(plansData)

  return (
    <div className="w-full flex flex-col items-center bg-whitePrimary pb-[100px]">
      <Header />
      <div className="w-[390px]">
      <Planos />
      <Custos/>
      <LastTransacoes/>
      </div>
    </div>
  );
}
