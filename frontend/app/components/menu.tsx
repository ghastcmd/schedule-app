"use client";

import { useState } from "react";
import { useContext } from "react";
import { MenuContext } from "../context/menuContext";

export default function Menu() {
  const openContext = useContext(MenuContext);
  const [clicked, setClicked] = useState(openContext.openState);

  const toggleClicked = () => {
    openContext.setOpenState(!clicked);
    setClicked(!clicked);
  };

  const changePage = async (e) => {
    const value: string = e.currentTarget.dataset.value;

    switch (value) {
      case "menu":
        window.location = "/";
        break;
      case "patients":
        window.location = "/list-patients";
        break;
      case "calendar":
        window.location = "/schedules";
        break;
    }
  };

  const buttonStyle =
    "bg-blue-500 text-white p-2 m-1 mt-4 hover:bg-blue-700 border-solid border-2 border-transparent cursor-pointer hover:border-blue-500 hover:bg-slate-100 hover:text-black";

  const MenuLogo = () => {
    return (
      <div>
        <div className="relative cursor-pointer" onClick={toggleClicked}>
          <div className={`rounded-full bg-blue-600 w-10 h-10 m-2`}></div>
          <div className={`absolute w-12 h-1 top-4 bg-white`}></div>
          <div className={`absolute top-0 left-6 w-1 h-12 bg-white`}></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white p-2 flex flex-row items-center m-0 mb-4 border-solid border-b-2 border-blue-400">
        <MenuLogo />
      </div>

      <div
        className={`bg-white w-72 h-screen p-2 h-full absolute ${clicked ? "left-0" : "-left-72"} border-r-2 border-blue-400 border-solid transition-all z-30`}
      >
        <MenuLogo />

        <div
          className={`${buttonStyle}`}
          data-value="menu"
          onClick={changePage}
        >
          Menu
        </div>
        <div
          className={`${buttonStyle}`}
          data-value="patients"
          onClick={changePage}
        >
          Pacientes
        </div>
        <div
          className={`${buttonStyle}`}
          data-value="calendar"
          onClick={changePage}
        >
          Agenda Semanal
        </div>
      </div>
    </>
  );
}
