import Link from "next/link";
import React from "react";

const CreateAccountButton = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-5">
      <div>
        <button className="bg-bluePrimary rounded-md outline-none">
          <p className="w-[333px] py-[10px] font-semibold text-[20px] text-white ">
            Criar conta
          </p>
        </button>
      </div>
      <div className="flex gap-1 justify-center pt-4">
        <p className="text-xs text-blackSecondary">Já possui uma conta?</p>
        <Link href="/Login" className="text-xs text-bluePrimary">Entrar</Link>
      </div>
    </div>
  );
};

export default CreateAccountButton;
