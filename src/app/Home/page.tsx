"use client";

import { useContext, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { HomeContext } from "@/Context/HomeContext";
import { db } from "@/services/firebase";

export default function Home() {
  const { dataUser, setDataUsers} = useContext(HomeContext);

  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setDataUsers(data.docs.map((doc:any) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [setDataUsers, userCollectionRef]);


  return (
    <div className="w-full h-screen flex flex-col items-center bg-whitePrimary">
      <div className="flex flex-col">
        <p>Olá</p>
        {dataUser.map((users: any) => (
          <p key={users.id}>{users.name}</p>
        ))}
      </div>
    </div>
  );
}
