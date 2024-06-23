"use client";

import { HomeContext } from "@/Context/HomeContext";
import { Custos } from "@/components/HomePage/Custos";
import { Header } from "@/components/HomePage/Header";
import LastTransacoes from "@/components/HomePage/LastTransacoes";
import { Planos } from "@/components/HomePage/Planos";
import { useContext } from "react";

export default function Home() {

  return (
    <div className="w-full flex flex-col items-center bg-whitePrimary ">
      <Header />
      <div className="w-[390px] h-screen ">
      <Planos />
      <Custos/>
      <LastTransacoes/>
      </div>
    </div>
  );
}
