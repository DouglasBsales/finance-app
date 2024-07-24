"use client";

import { Custos } from "@/components/HomePage/Custos";
import { Header } from "@/components/HomePage/Header";
import LastTransacoes from "@/components/HomePage/LastTransacoes";
import { Planos } from "@/components/HomePage/Planos";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center bg-whitePrimary">
      <Header />
      <div className="w-[390px] overflow-x-hidden pb-[100px]">
      <Planos />
      <Custos/>
      <LastTransacoes/>
      </div>
    </div>
  );
}
