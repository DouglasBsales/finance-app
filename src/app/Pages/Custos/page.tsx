"use client";

import { HeaderCustos } from "@/components/CustosPage/HeaderCustos";
import { HomeContext } from "@/Context/HomeContext";
import { useContext, useEffect } from "react";

export default function Custos() {
  const { setIsPlansOrCustos } = useContext(HomeContext);

  useEffect(() => {
    setIsPlansOrCustos("custos");
  });

  return (
    <div className="h-screen bg-bluePrimary">
      <HeaderCustos />
    </div>
  );
}
