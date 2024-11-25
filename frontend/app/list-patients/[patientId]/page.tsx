"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import GridItem from "/app/components/gridItem";

import Check from "/public/Check.svg";
import Close from "/public/close.svg";
import Trash from "/public/Trash.svg";
import Link from "next/link";

function renderSwitch(
  type: string,
  value: string,
  key: number,
  toggle: () => void
) {
  const deleteClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await fetch(`http://localhost:3030/schedules/${value.id}`, {
      method: "DELETE",
    });
    toggle();
  };

  return (
    <div className="h-full w-[8rem]" key={key}>
      <Link href={`/schedule-canvas/${value.id}`}>
        <div
          className={`${
            type === "after"
              ? "bg-sky-400 h-[9.5rem] top-2"
              : "bg-cyan-300 h-[7.5rem] top-10 text-white"
          } w-[7rem] absolute rounded-t-xl mx-2`}
        >
          <div className="m-2 text-white font-bold">
            <h1>{value.date}</h1>
            <h1>{value.time}</h1>
            <h1>{value.notes}</h1>
          </div>
          {type === "after" ? (
            <div
              onClick={(e) => deleteClick(e)}
              className="flex justify-center items-center z-10"
            >
              <Image src={Trash} alt="delete" className="absolute bottom-2" />
            </div>
          ) : (
            <></>
          )}
        </div>
      </Link>
    </div>
  );
}

function SchedulingPatient({
  data,
  patientId,
  toggleUpdate,
  setToggleUpdate,
}: {
  data: Array;
  patientId: number;
  toggleUpdate: bool;
  setToggleUpdate: (bool) => void;
}) {
  const addSchedule = async () => {
    const toAddDate = new Date();
    toAddDate.setFullYear(toAddDate.getFullYear() + 2);

    await fetch("http://localhost:3030/schedules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: `${toAddDate.getFullYear()}-01-01`,
        time: "00:00",
        notes: "Novo",
        patient: patientId,
      }),
    });

    setToggleUpdate(!toggleUpdate);
  };

  return (
    <div className="bg-white h-[10rem] relative flex flex-row justify-end">
      {data.map((e, k) =>
        renderSwitch(e.type, e, k, () => setToggleUpdate(!toggleUpdate))
      )}

      <div className="h-full w-[8rem]">
        <div
          onClick={() => addSchedule()}
          className="bg-sky-400 w-[7rem] h-[5rem] top-20 absolute rounded-t-xl mx-2 cursor-pointer"
        >
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
  const [toggleUpdate, setToggleUpdate] = useState(false);
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
    _data.schedules.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);
      return aDate - bDate;
    });
    setSchedule(_data.schedules);
  };

  const sendUpdate = async () => {
    await fetch(`http://localhost:3030/patients/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        followup: followup,
      }),
    });
  };

  const deletePatient = async () => {
    await fetch(`http://localhost:3030/patients/${id}`, {
      method: "DELETE",
    });
    window.location = "/list-patients";
  };

  useEffect(() => {
    fetchPatient();
  }, [toggleUpdate]);

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

        <SchedulingPatient
          data={schedule}
          patientId={id}
          toggleUpdate={toggleUpdate}
          setToggleUpdate={setToggleUpdate}
        />
      </div>

      <div className="flex flex-cols right-24 bottom-20 fixed">
        <div
          onClick={() => deletePatient()}
          className="cursor-pointer rounded-full w-[100px] h-[100px] mr-10 p-2 bg-red-500 flex items-center justify-center text-white text-7xl"
        >
          <span className="select-none cursor-pointer">
            <Image src={Trash} alt="check" />
          </span>
        </div>
        <div
          onClick={() => sendUpdate()}
          className="cursor-pointer rounded-full w-[100px] h-[100px] p-2 bg-green-400 flex items-center justify-center text-white text-7xl"
        >
          <span className="select-none">
            <Image src={Check} alt="check" />
          </span>
        </div>
      </div>

      <div className="fixed top-10 right-28">
        <Link href="/list-patients">
          <Image src={Close} alt="close" />
        </Link>
      </div>
    </div>
  );
}
