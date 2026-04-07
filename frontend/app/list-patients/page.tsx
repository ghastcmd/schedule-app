"use client";

import Selector from "../components/selector";
import SearchBar from "../components/search";
import GridItem from "../components/gridItem";
import { useEffect, useState } from "react";
import Link from "next/link";
import Menu from "../components/menu";
import User from "/public/User.svg";
import Image from "next/image";

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

  console.log(patients);

  return (
    <div className="h-screen flex flex-col m-0">
      <SearchBar reset={rerender} fetchPatients={fetchPatients} />

      {/*  */}

      <div className="w-4/5 items-center justify-center">
        <table className="mt-[2rem] mx-[10rem] w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase w-10">
                Foto
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Nome do Paciente
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Contato
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Ação
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-slate-100">
                <td className="px-6 py-4 h-full flex justify-center items-center">
                  <Image
                    className="z-0"
                    src={User}
                    width={40}
                    height={40}
                    alt="ellipse icon"
                  />
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {patient.name}
                    </p>
                    <p className="text-xs text-gray-500">{patient.insurance}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <p className="text-gray-900">{patient.phone}</p>
                    <p className="text-gray-500">{patient.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/list-patients/${patient.id}`}>
                    <button
                      // onClick={() => setSelectedPatient(patientDetails)}
                      className="text-white hover:bg-sky-500 bg-sky-600 px-4 py-2 rounded-full text-sm font-medium"
                    >
                      Ver
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
