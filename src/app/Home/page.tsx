"use client";

import { Header } from "@/components/HomePage/Header";
import { Planos } from "@/components/HomePage/Planos";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col  bg-whitePrimary ">
      <Header />
      <Planos />
    </div>
  );
}
