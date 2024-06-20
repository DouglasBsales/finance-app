"use client";

import { Header } from "@/components/HomePage/Header";
import { Planos } from "@/components/HomePage/Planos";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center bg-whitePrimary pb-[100px]">
      <Header />
      <div className="w-[360px] ">
      <Planos />
      </div>
    </div>
  );
}
