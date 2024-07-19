import Image from "next/image";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { useState } from "react";
import { setDoc, doc, collection, getDoc } from "firebase/firestore";
import Link from "next/link";

type UserGoogleType = {
  uId: string;
  name: string;
  email: string;
  photoURL: string;
  creationTime: string;
  lastLoginTime: string;
};

const addedUserWithGoogle = (user: any) => {
  const planosCollectionRef = collection(db, "users", user.uid, "planos");
  const planoDocRef = doc(planosCollectionRef); // Cria um novo documento com ID gerado automaticamente
  setDoc(planoDocRef, { planos: [] });

  const valueWalletCollectionRef = collection(
    db,
    "users",
    user.uid,
    "valueWallet"
  );
  const valueWalletDocRef = doc(valueWalletCollectionRef); // Cria um novo documento com ID gerado automaticamente
  setDoc(valueWalletDocRef, { valueWallet: 0 });

  const custosCollectionRef = collection(db, "users", user.uid, "custos");
  const custosDocRef = doc(custosCollectionRef); // Cria um novo documento com ID gerado automaticamente
  setDoc(custosDocRef, { custos: [] });

  const transacoesCollectionRef = collection(
    db,
    "users",
    user.uid,
    "transacoes"
  );
  const transacoesDocRef = doc(transacoesCollectionRef); // Cria um novo documento com ID gerado automaticamente
  setDoc(transacoesDocRef, { transacoes: [] });
};

const LoginWithGoogle = () => {
  const [showAuth, setShowAuth] = useState(false);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    setShowAuth(true);
    const user = result.user;

    // Verificar se o usuário já existe no banco de dados
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      // Criar dados do usuário se ainda não existir
      const userGoogle: UserGoogleType = {
        uId: user.uid,
        name: user.displayName!,
        email: user.email!,
        photoURL: user.photoURL!,
        creationTime: user.metadata.creationTime!,
        lastLoginTime: user.metadata.lastSignInTime!,
      };

      await setDoc(userDocRef, userGoogle, { merge: true });
      addedUserWithGoogle(user);
    }

    // Armazenar dados do usuário na localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("userGoogle", JSON.stringify(user));
      window.location.href = "/Pages/Home";
      setShowAuth(false);
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center items-center pt-[30px]">
        <div className="w-[149px] h-[1px] border mr-[8px]"></div>
        <p className="text-[#D9D9D9]">Ou</p>
        <div className="w-[149px] h-[1px] border ml-[8px]"></div>
      </div>
      <div className="w-full flex justify-center pt-[30px]">
        <button
          className="w-[333px] py-[16px] flex items-center justify-center gap-1 rounded-[30px] bg-white shadow-md shadow-[#E7E8EC] "
          onClick={googleLogin}
        >
          <Image src="/google.png" alt="" width={20} height={20} />
          <p className=" pl-[10px] text-bluePrimary">
            Entrar com sua conta Google
          </p>
        </button>
      </div>
      <div className="flex gap-1 justify-center pt-8">
        <p className="text-xs text-blackSecondary">Não tem uma conta ?</p>
        <Link href="/CreateAccount" className="text-xs text-bluePrimary">
          Cadastre-se aqui
        </Link>
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
