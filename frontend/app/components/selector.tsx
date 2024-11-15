"use client";

import { useState } from "react";

export default function Selector({ pageName }: { pageName: string }) {
  const [page, setPage] = useState(pageName);

  const changePage = async (e) => {
    const value: string = e.target.value;
    setPage(value);

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
    <div className="ml-10 mt-10">
      <select
        className="border-solid border-2 border-gray-300 px py-1 pl-2 text-[1.3rem]"
        name="menu"
        id="menu"
        value={page}
        onChange={(e) => changePage(e)}
      >
        <option value="menu">Menu</option>
        <option value="patients">Pacientes</option>
        <option value="calendar">Agenda Mensal</option>
      </select>
    </div>
  );
}
