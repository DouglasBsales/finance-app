"use client";

import ButtonEntrarAccount from "../components/CreateAccount/ButtonEntrarAccount";
import CreateAccountButton from "../components/CreateAccount/CreateAccountButton";
import FormCreateAccount from "../components/CreateAccount/FormCreateAccount";
import { ButtonCreateAccount } from "../components/Login/ButtonCreateAccount";

export default function CreateAccount() {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-whitePrimary">
      <ButtonEntrarAccount />
      <FormCreateAccount />
      <CreateAccountButton />
    </div>
  );
}
