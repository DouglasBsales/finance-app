"use client";

import FormLogin from "@/components/Login/FormLogin";
import ButtonEntrar from "@/components/Login/ButtonEntrar";
import LoginWhithGoogle from "@/components/Login/LoginWhithGoogle";

export default function Login() {
  return (
    <div className="w-full flex flex-col items-center bg-whitePrimary">
      <div className="w-[390px] px-[28px] ">
        <FormLogin />
        <ButtonEntrar />
        <LoginWhithGoogle/>
      </div>
    </div>
  );
}
