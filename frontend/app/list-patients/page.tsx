"use client";

import Selector from "../components/selector";
import SearchBar from "../components/search";
import GridItem from "../components/gridItem";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ListPacients() {
  const [patients, setPatientsState] = useState([{ name: "Nome do paciente" }]);

  const fetchPatients = async () => {
    try {
      const data = await fetch("http://localhost:3030/patients");
      const _data = await data.json();
      await setPatientsState(_data);
      console.log(_data);
    } catch {
      console.log("couldn't fetch data");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="relative">
      <Selector pageName="patients" />

      <SearchBar />

      <div className="">
        <div className="grid gap-4 grid-cols-5 auto-rows-max mt-[2rem] mx-[10rem]">
          {patients.map((patient, index) => (
            <Link key={index} href={`/list-patients/${patient.id}`}>
              <GridItem nome={patient.name} id={patient.id} />
            </Link>
          ))}
        </div>
      </div>
      <div className="rounded-full w-[100px] h-[100px] p-2 bg-green-400 flex items-center justify-center text-white text-7xl right-24 bottom-20 fixed">
        <span className="select-none">+</span>
      </div>
    </div>
  );
}
