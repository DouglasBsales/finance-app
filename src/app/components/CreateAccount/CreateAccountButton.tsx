import React from "react";

const CreateAccountButton = () => {
  return (
    <div className="w-full flex justify-center pt-[36px]">
      <div>
        <button className="bg-bluePrimary rounded-md outline-none">
          <p className="px-[112px] py-[10px] font-semibold text-[20px] text-white ">
            Criar conta
          </p>
        </button>
      </div>
    </div>
  );
};

export default CreateAccountButton;
