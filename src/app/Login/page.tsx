"use client";

import { ButtonCreateAccount } from "@/components/Login/ButtonCreateAccount";
import FormLogin from "@/components/Login/FormLogin";
import ButtonEntrar from "@/components/Login/ButtonEntrar";
import LoginWhithGoogle from "@/components/Login/LoginWhithGoogle";

export default function Login() {
  return (
    <div className="w-full px-[28px] flex flex-col items-center bg-whitePrimary pb-[80px]">
      <ButtonCreateAccount />
      <FormLogin />
      <ButtonEntrar />
      <LoginWhithGoogle/>
    </div>
  );
}
