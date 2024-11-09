'use client';

import Selector from "/app/components/selector";

import { useState, useEffect } from "react";

function Column({ dayNum, values }: { dayNum: number, values: Array }) {
  return (
    <div className='m-2'>
      <h1 className=''>{dayNum}</h1>

      {values.map((v, k) => 
        <h1 key={k} className='bg-blue-200'>{v}</h1>
      )}
    </div>
  );
}

export default function Schedule() {
  const changeDate = (e) => {
    console.log('changed date');
    console.log(e);
    const weekDates = dates(e);
    setWeek(weekDates);
  }

  const dates = (current) => {
    const week = []; 
    // Starting Monday not Sunday
    current = new Date(current);
    current.setDate((current.getDate() - current.getDay()));
    for (let i = 0; i < 7; i++) {
        week.push(
            current.getDate()
        ); 
        current.setDate(current.getDate() +1);
    }
    return week;
  }

  const [ weekState, setWeek ] = useState([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    console.log('fetching');
  }, [weekState])

  return (
    <div>
      <Selector />

      <div className='flex justify-center items-center'>
        <input
          className='p-2 px-6 border-slate-300'
          type="date"
          onChange={(e) => changeDate(e.target.value)}
        />
      </div>

      <div className='flex justify-center'>
        <div className='grid gap-2 grid-cols-7 mt-[2rem] w-11/12 h-[40rem] bg-white'>
          <Column dayNum={weekState[0]} values={['paciente', 'paciente 2\n10:30']}/>
          <Column dayNum={weekState[1]} values={['paciente', 'paciente 2\n10:30']}/>
          <Column dayNum={weekState[2]} values={['paciente', 'paciente 2\n10:30']}/>
          <Column dayNum={weekState[3]} values={['paciente', 'paciente 2\n10:30']}/>
          <Column dayNum={weekState[4]} values={['paciente', 'paciente 2\n10:30']}/>
          <Column dayNum={weekState[5]} values={['paciente', 'paciente 2\n10:30']}/>
          <Column dayNum={weekState[6]} values={['paciente', 'paciente 2\n10:30']}/>
        </div>
      </div>

    </div>
  );
}