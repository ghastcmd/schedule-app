"use client";

import { useState } from "react";
import Menu from "/app/components/menu";

export default function Home() {
  return (
    <div className="h-screen flex flex-col m-0">
      <Menu />
      <h1 className="text-center leading-[45rem] h-full select-none text-[250px] text-gray-400 font-bold">
        BEM VINDO!
      </h1>
    </div>
  );
}
