import Image from "next/image";
import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth } from "../../services/firebase";
import {  useState } from "react";

const LoginWhithGoogle = () => {
  const [user, setUser] = useState<User | null>(null);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setUser(result.user); 
    console.log(result.user);
    if(typeof window !== "undefined"){
      window.location.href="/Home"
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center pt-[30px]">
        <div className="w-[141px] h-[1px] border mr-[16px]"></div>
        <p>or</p>
        <div className="w-[141px] h-[1px] border ml-[16px]"></div>
      </div>
      <div className="w-full flex justify-center pt-[30px]">
        <button
          className="w-[333px] py-[16px] flex items-center justify-center gap-1 border-2 rounded-md rounded-6"
          onClick={googleLogin}
        >
          <Image src="/Google.png" alt="" width={12} height={12} />
          <p className="text-blackOpacity ">Entrar com Google</p>
        </button>
      </div>
    </div>
  );
};

export default LoginWhithGoogle;
