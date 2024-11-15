"use client";

import Selector from "../components/selector";
import SearchBar from "../components/search";
import GridItem from "../components/gridItem";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ListPacients() {
  const [toggle, setToggle] = useState(false);
  const [patients, setPatientsState] = useState([]);

  const rerender = () => {
    setToggle(!toggle);
  };

  const fetchPatients = async (searchString: string) => {
    let query = "";
    if (searchString !== "")
      query = `http://localhost:3030/patients?name=${searchString}`;
    else {
      query = "http://localhost:3030/patients";
    }
    const data = await fetch(query);
    const _data = await data.json();
    await setPatientsState(_data);
  };

  useEffect(() => {
    fetchPatients("");
  }, []);

  useEffect(() => {}, [toggle]);

  const createUser = async () => {
    const data = await fetch("http://localhost:3030/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Nome do paciente",
        phone: "(00) 00000-0000",
        followup: "",
        schedules: [{}],
      }),
    });
    const _data = await data.json();

    window.location = `/list-patients/${_data.id}`;
  };

  return (
    <div className="relative">
      <Selector pageName="patients" />

      <SearchBar reset={rerender} fetchPatients={fetchPatients} />

      <div className="">
        <div className="grid gap-4 grid-cols-5 auto-rows-max mt-[2rem] mx-[10rem]">
          {patients.map((patient, index) => (
            <Link key={index} href={`/list-patients/${patient.id}`}>
              <GridItem nome={patient.name} id={patient.id} />
            </Link>
          ))}
        </div>
      </div>
      <div
        onClick={() => createUser()}
        className="cursor-pointer rounded-full w-[100px] h-[100px] p-2 bg-green-400 flex items-center justify-center text-white text-7xl right-24 bottom-20 fixed"
      >
        <span className="select-none">+</span>
      </div>
    </div>
  );
}
