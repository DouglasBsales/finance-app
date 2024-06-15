import Image from "next/image";

const LoginWhithGoogle = () => {
  return (
    <div>
      <div className="w-full flex justify-center items-center pt-[52px]">
        <div className="w-[141px] h-[1px] border mr-[16px]"></div>
        <p>or</p>
        <div className="w-[141px] h-[1px] border ml-[16px]"></div>
      </div>
      <div className="w-full flex justify-center pt-[53px]">
        <button className="w-[333px] py-[16px] flex items-center justify-center gap-1 border-2  rounded-md rounded-6">
          <Image src="/Google.png" alt="" width={12} height={12} />
          <p className="text-blackOpacity ">Entrar com Google</p>
        </button>
      </div>
    </div>
  );
};

export default LoginWhithGoogle;
