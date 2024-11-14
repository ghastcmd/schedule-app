"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import GridItem from "/app/components/gridItem";

import Check from "/public/Check.svg";
import Close from "/public/close.svg";
import Link from "next/link";

function SchedulingPatient({ data }: { data: Array }) {
  function renderSwitch(type: string, value: string, key: number) {
    return (
      <div className="h-full w-[8rem]" key={key}>
        <div
          className={`${
            type === "after"
              ? "bg-sky-400 h-[9.5rem] top-2"
              : "bg-cyan-300 h-[7.5rem] top-10 text-white"
          } w-[7rem] absolute rounded-t-xl mx-2`}
        >
          <div className="m-2 text-white font-bold">{value}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white h-[10rem] relative flex flex-row justify-end">
      {data.map((e, k) => renderSwitch(e.type, e.value, k))}

      <div className="h-full w-[8rem]">
        <div className="bg-sky-400 w-[7rem] h-[5rem] top-20 absolute rounded-t-xl mx-2">
          <div className="text-white font-bold flex justify-center items-center h-full text-4xl">
            +
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PatientCanvas({
  params,
}: {
  params: { patientId: string };
}) {
  const [id, setId] = useState(0);
  const [patient, setPatient] = useState({
    name: "name",
    phone: "(82) 99999-9999",
  });

  const [name, setName] = useState("name");
  const [phone, setPhone] = useState("(82) 99999-9999");
  const [followup, setFollowup] = useState("");

  const [schedule, setSchedule] = useState([
    { value: "Paciente", type: "previous" },
    { value: "Paciente 10/10/24", type: "after" },
  ]);

  const fetchPatient = async () => {
    const id = await params.then((param) => param.patientId);
    await setId(id);
    const data = await fetch(`http://localhost:3030/patients/${id}`);
    const _data = await data.json();
    setPatient({
      name: _data.name,
      phone: _data.phone,
      followup: _data.followup,
    });

    const todayDate = new Date().getTime();
    _data.schedules.forEach((value) => {
      const _date = new Date(value.date).getTime();
      if (_date < todayDate) {
        value.type = "previous";
      } else {
        value.type = "after";
      }
    });
    setSchedule(_data.schedules);
  };

  const sendUpdate = async () => {
    await fetch(`http://localhost:3030/patients/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        name: name,
        phone: phone,
        followup: followup,
      },
    });

    console.log("clicked send");
  };

  useEffect(() => {
    fetchPatient();
  }, []);

  const updateValues = async () => {
    setName(patient.name);
    setPhone(patient.phone);
    setFollowup(patient.followup !== null ? patient.followup : "");
  };

  useEffect(() => {
    updateValues();
  }, [patient]);

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updatePhone = (e) => {
    setPhone(e.target.value);
  };

  const updateFollowup = (e) => {
    setFollowup(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <h1 className="mt-10 text-3xl">Informações do paciente</h1>

      <GridItem nome={""} />

      <div className="flex flex-col w-[40rem] mt-10">
        <h1>Nome</h1>
        <input
          className="my-2 p-2"
          type="text"
          value={name}
          onChange={(e) => updateName(e)}
        />

        <h1>Telefone</h1>
        <input
          className="my-2 p-2"
          type="phone"
          value={phone}
          onChange={(e) => updatePhone(e)}
        />

        <h1 className="my-2">Acompanhamento</h1>

        <textarea
          className="h-[10rem]"
          name=""
          id=""
          value={followup}
          onChange={(e) => updateFollowup(e)}
        ></textarea>

        <h1 className="my-2">Agendamentos</h1>

        <SchedulingPatient data={schedule} />
      </div>

      <div
        onClick={() => sendUpdate()}
        className="rounded-full w-[100px] h-[100px] p-2 bg-green-400 flex items-center justify-center text-white text-7xl right-24 bottom-20 fixed"
      >
        <span className="select-none">
          <Image src={Check} alt="check" />
        </span>
      </div>

      <div className="fixed top-10 right-28">
        <Link href="/list-patients">
          <Image src={Close} alt="close" />
        </Link>
      </div>
    </div>
  );
}
