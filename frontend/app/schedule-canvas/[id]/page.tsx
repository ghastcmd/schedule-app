"use client";

import Image from "next/image";

import GridItem from "/app/components/gridItem";

import Check from "/public/Check.svg";
import Close from "/public/close.svg";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ScheduleCanvas({ params }: { params: { id: string } }) {
  const [name, setName] = useState("Nome do paciente");
  const [phone, setPhone] = useState("(82) 99999-9999");
  const [date, setDate] = useState("2024-01-01");
  const [time, setTime] = useState("13:30");
  const [note, setNote] = useState("");
  const [id, setId] = useState(0);

  const updateDate = (e) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };

  const updateTime = (e) => {
    setTime(e.target.value);
  };

  const updateNote = (e) => {
    setNote(e.target.value);
  };

  const fetchSchedule = async () => {
    const id = await params.then((e) => e.id);
    const data = await fetch(`http://localhost:3030/schedules/s/${id}`);
    let _data = await data.json();
    _data = _data[0];
    console.log(_data.date);
    setDate(_data.date);
    setTime(_data.time);
    setNote(_data.notes !== null ? _data.notes : "");
    setName(_data.patient.name);
    setPhone(_data.patient.phone);
    setId(_data.patient.id);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const sendUpdate = async () => {
    const scheduleId = await params.then((e) => e.id);
    await fetch(`http://localhost:3030/schedules/${scheduleId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date,
        time: time,
        notes: note,
      }),
    });

    console.log("clicked send");
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <h1 className="mt-10 text-3xl">Informações do agendamento</h1>

      <GridItem nome={""} />

      <div className="flex flex-col w-[40rem] mt-10">
        <h1 className="my-2 p-2 my-2">{name}</h1>
        <h1 className="my-2 p-2 my-2">{phone}</h1>

        <div className="justify-between flex flex-row w-[40rem] my-2">
          <h1 className="my-2 p-2">Data</h1>
          <input
            value={date}
            onChange={(e) => updateDate(e)}
            className="p-2 w-[10rem]"
            type="date"
          />
        </div>
        <div className="justify-between flex flex-row w-[40rem] my-2">
          <h1 className="my-2 p-2">Hora</h1>
          <input
            value={time}
            onChange={(e) => updateTime(e)}
            className="p-2 w-[10rem]"
            type="time"
          />
        </div>

        <h1 className="my-2">Notas</h1>

        <textarea
          value={note}
          onChange={(e) => updateNote(e)}
          className="h-[10rem]"
          name=""
          id=""
        ></textarea>
      </div>

      <div
        onClick={() => sendUpdate()}
        className="rounded-full w-[100px] h-[100px] p-2 bg-green-400 flex items-center justify-center text-white text-7xl right-24 bottom-20 fixed"
      >
        <span className="select-none cursor-pointer">
          <Image src={Check} alt="check" />
        </span>
      </div>

      <div className="fixed top-10 right-28">
        <Link href={`/list-patients/${id}`}>
          <Image src={Close} alt="close" />
        </Link>
      </div>
    </div>
  );
}
