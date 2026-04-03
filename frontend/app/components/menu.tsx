"use client";

import { useState } from "react";

export default function Menu() {
  const [clicked, setClicked] = useState(false);

  const toggleClicked = () => {
    setClicked(!clicked);
  };

  const [page, setPage] = useState(".");

  const changePage = async (e) => {
    const value: string = e.currentTarget.dataset.value;
    // setPage(value);

    console.log(value);

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

  return (
    <>
      <div className="bg-purple-400 p-2 flex flex-row items-center m-0">
        <div
          className={`rounded-full ${clicked ? "bg-black" : "bg-gray-700"} w-10 h-10 m-2`}
          onClick={toggleClicked}
        ></div>
      </div>

      <div
        className={`bg-white w-72 h-screen p-2 h-full absolute ${clicked ? "left-0" : "-left-72"} transition-all z-30`}
      >
        <div
          className={`rounded-full ${clicked ? "bg-black" : "bg-gray-700"} w-10 h-10 m-2`}
          onClick={toggleClicked}
        ></div>

        <div
          className="bg-black text-white p-2 m-1 mt-4"
          data-value="menu"
          onClick={changePage}
        >
          Menu
        </div>
        <div
          className="bg-black text-white p-2 m-1"
          data-value="patients"
          onClick={changePage}
        >
          Pacientes
        </div>
        <div
          className="bg-black text-white p-2 m-1"
          data-value="calendar"
          onClick={changePage}
        >
          Agenda Semanal
        </div>
      </div>
    </>
  );
}
