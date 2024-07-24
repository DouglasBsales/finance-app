"use client";

import { HomeContext } from "@/Context/HomeContext";
import Image from "next/image";
import { useContext } from "react";

export const HeaderGlobal = () => {
  const { dataUser } = useContext(HomeContext);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[390px] flex items-center py-5 pl-[24px] border-b border-[#EFF0F3]">
        <div>
          <Image
            src={dataUser.photoURL}
            alt="foto do usuário"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
        <div className="pl-2">
          <p className="text-bluePrimary font-semibold">{dataUser.name}</p>
          <p className="text-bluePrimary relative bottom-1">{dataUser.email}</p>
        </div>
      </div>
    </div>
  );
};
