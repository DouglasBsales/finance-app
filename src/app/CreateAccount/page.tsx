"use client";

import ButtonEntrarAccount from "@/components/CreateAccount/ButtonEntrarAccount";
import CreateAccountButton from "@/components/CreateAccount/CreateAccountButton";
import FormCreateAccount from "@/components/CreateAccount/FormCreateAccount";

export default function CreateAccount() {
  return (
    <div className="w-full px-[28px] flex flex-col items-center bg-whitePrimary pb-[80px]">
      <ButtonEntrarAccount />
      <FormCreateAccount />
      <CreateAccountButton />
    </div>
  );
}
