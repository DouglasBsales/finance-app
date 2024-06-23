"use client";

import {
  faClockRotateLeft,
  faHouse,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";

const Menu = () => {
  const [isPage, setIsPage] = useState<string>("Home");

  const isPageHome = () => {
    setIsPage("Home");
  };

  const isPageTransacao = () => {
    setIsPage("pageTransacao");
  };

  const isPageSearchTransition = () => {
    setIsPage("searchTransition");
  };

  const isPageConfigUser = () => {
    setIsPage("pageConfigUser");
  };

  return (
    <div className="w-full h-[70px] flex justify-center items-center bg-white fixed bottom-0">
      <div className="flex w-[310px] items-center gap-[62px]">
      <Link href="/Pages/Home" onClick={isPageHome}>
          <FontAwesomeIcon
            icon={faHouse}
            className={`${
              isPage === "Home"
                ? "text-bluePrimary "
                : "text-blackOpacity "
            } text-4xl`}
          />
          <div
            className={`border ${
              isPage === "Home"
                ? "border-bluePrimary"
                : " border-white"
            } mt-[8px]`}
          ></div>
        </Link>
        <button onClick={isPageTransacao}>
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            className={`${
              isPage === "pageTransacao"
                ? "text-bluePrimary "
                : "text-blackOpacity "
            } text-4xl`}
          />
          <div
            className={`border ${
              isPage === "pageTransacao"
                ? "border-bluePrimary"
                : " border-white"
            } mt-[8px]`}
          ></div>
        </button>
        <Link href="/Pages/SearchTransacoes" onClick={ isPageSearchTransition}>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={`${
              isPage === "searchTransition"
                ? "text-bluePrimary "
                : "text-blackOpacity "
            } text-4xl`}
          />
          <div
            className={`border ${
              isPage === "searchTransition"
                ? "border-bluePrimary"
                : " border-white"
            } mt-[8px]`}
          ></div>
        </Link>
        <button onClick={isPageConfigUser}>
          <FontAwesomeIcon
            icon={faUser}
            className={`${
              isPage === "pageConfigUser"
                ? "text-bluePrimary "
                : "text-blackOpacity "
            } text-4xl`}
          />
          <div
            className={`border ${
              isPage === "pageConfigUser"
                ? "border-bluePrimary"
                : " border-white"
            } mt-[8px]`}
          ></div>
        </button>
      </div>
    </div>
  );
};

export default Menu;
