"use client";

import Selector from "/app/components/selector";

import { useState, useEffect } from "react";

function Column({
  weekNum,
  dayNum,
  schedules,
}: {
  weekNum: number;
  dayNum: number;
  schedules: Array;
}) {
  function renderSwitch(weekNum: number) {
    switch (weekNum) {
      case 0:
        return "DOMINGO";
        break;
      case 1:
        return "SEGUNDA";
        break;
      case 2:
        return "TERÇA";
        break;
      case 3:
        return "QUARTA";
        break;
      case 4:
        return "QUINTA";
        break;
      case 5:
        return "SEXTA";
        break;
      case 6:
        return "SÁBADO";
        break;
    }
  }

  return (
    <div className="border relative flex flex-col overflow-y-auto">
      <h1 className="text-slate-400 text-lg m-2">{renderSwitch(weekNum)}</h1>

      <hr />

      <h1 className="m-2 text-slate-400 text-lg">{dayNum}</h1>
      <div className="grow"></div>
      <div className="flex flex-col m-2 overflow-y-auto">
        {schedules.map((v, k) => (
          <h1 key={k} className="m-1 px-1 text-sky-500 rounded-md bg-sky-100">
            {v !== null ? (
              <>
                {v.patient !== null ? <p>{v.patient.name}</p> : <></>}
                <p>{v.time}</p>
                <p>{v.notes}</p>
              </>
            ) : (
              <></>
            )}
          </h1>
        ))}
      </div>
    </div>
  );
}

function defaultSchedule() {
  return {
    time: "13:30",
    notes: "Note",
    patient: {
      name: "Nome do paciente",
    },
  };
}

export default function Schedule() {
  const [weekState, setWeek] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [day, setDay] = useState("2000-01-01");
  const [weekSchedules, setWeekSchedules] = useState([
    [defaultSchedule()],
    [defaultSchedule()],
    [defaultSchedule()],
    [defaultSchedule()],
    [defaultSchedule()],
    [defaultSchedule()],
    [defaultSchedule()],
  ]);

  const changeDate = (e) => {
    console.log("changed date");
    console.log(e);
    const weekDates = dates(e);
    if (e !== "") setWeek(weekDates);
  };

  const dates = (current) => {
    setDay(current);
    const week = [];
    // Starting Monday not Sunday
    current = new Date(current);
    current.setDate(current.getDate() - current.getDay());
    for (let i = 0; i < 7; i++) {
      week.push(current.getDate());
      current.setDate(current.getDate() + 1);
    }
    return week;
  };

  const fetchWeekDays = async () => {
    const data = await fetch(`http://localhost:3030/schedules/d/${day}`);
    const _data = await data.json();

    setWeekSchedules(_data);

    console.log(_data);
  };

  useEffect(() => {
    console.log("fetching");
    fetchWeekDays();
  }, [weekState]);

  return (
    <div>
      <Selector pageName="calendar" />

      <div className="flex justify-center items-center">
        <input
          className="p-2 px-6 border-slate-300"
          type="date"
          onChange={(e) => changeDate(e.target.value)}
        />
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-7 mt-[2rem] w-11/12 h-[40rem] bg-white">
          <Column
            weekNum={0}
            dayNum={weekState[0]}
            schedules={weekSchedules[0]}
            another={["another"]}
          />
          <Column
            weekNum={1}
            dayNum={weekState[1]}
            values={["paciente", "paciente 2\n10:30"]}
            schedules={weekSchedules[1]}
          />
          <Column
            weekNum={2}
            dayNum={weekState[2]}
            values={["paciente", "paciente 2\n10:30"]}
            schedules={weekSchedules[2]}
          />
          <Column
            weekNum={3}
            dayNum={weekState[3]}
            values={["paciente", "paciente 2\n10:30"]}
            schedules={weekSchedules[3]}
          />
          <Column
            weekNum={4}
            dayNum={weekState[4]}
            values={["paciente", "paciente 2\n10:30"]}
            schedules={weekSchedules[4]}
          />
          <Column
            weekNum={5}
            dayNum={weekState[5]}
            values={["paciente", "paciente 2\n10:30"]}
            schedules={weekSchedules[5]}
          />
          <Column
            weekNum={6}
            dayNum={weekState[6]}
            values={["paciente", "paciente 2\n10:30"]}
            schedules={weekSchedules[6]}
          />
        </div>
      </div>
    </div>
  );
}
