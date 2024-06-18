import Image from "next/image";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { useState } from "react";
import { setDoc, doc, collection } from "firebase/firestore";

type UserGoogleType = {
  uId: string;
  name: string;
  email: string;
  photoURL: string;
  creationTime: string;
  lastLoginTime: string;
};

const LoginWithGoogle = () => {
  const [showAuth, setShowAuth] = useState(false);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setShowAuth(true);
    const user = result.user; // armazena os dados do usuario do google em uma variável global do context
    const userGoogle: UserGoogleType = {
      // objeto criado com seu tipo para enviar os dados pro banco
      uId: user.uid,
      name: user.displayName!,
      email: user.email!,
      photoURL: user.photoURL!,
      creationTime: user.metadata.creationTime!,
      lastLoginTime: user.metadata.lastSignInTime!,
    };
    // Usando a referência de documento específica para o usuário
    const userCollectionRef = collection(db, "users");
    const userDocRef = doc(userCollectionRef, user.uid);
    await setDoc(userDocRef, userGoogle, { merge: true });
    if (typeof window !== "undefined") {
      localStorage.setItem("userGoogle", JSON.stringify(user));
      window.location.href = "/Home";
    }
    setShowAuth(false);
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
          <p className="text-blackOpacity">Entrar com Google</p>
        </button>
      </div>
      {showAuth && (
        <div className="w-full fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-full bg-bluePrimary rounded-md fixed top-[210px] left-0">
            <div className=" flex justify-center pr-5">
              <Image src="/loading.gif" alt="loading" width={40} height={40} />
              <p className="py-2 text-white font-semibold ">
                Autenticação concluída
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginWithGoogle;
