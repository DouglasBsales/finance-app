"use client";

import ButtonEntrarAccount from "@/components/CreateAccount/ButtonEntrarAccount";
import CreateAccountButton from "@/components/CreateAccount/CreateAccountButton";
import FormCreateAccount from "@/components/CreateAccount/FormCreateAccount";

export default function CreateAccount() {
  return (
    <div className="w-full flex flex-col items-center bg-whitePrimary">
      <div className="w-[390px] px-[28px] pb-5">
        <ButtonEntrarAccount />
        <FormCreateAccount />
        <CreateAccountButton />
      </div>
    </div>
  );
}
