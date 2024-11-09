'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

import GridItem from "../components/gridItem";

import Check from '/public/Check.svg';
import Close from '/public/close.svg';

function SchedulingPatient({ data }: { data: Array }) {
  
  function renderSwitch(type: string, value: string, key: number) {
    return (
      <div className='h-full w-[8rem]' key={key}>
        <div className={`${type === 'after' ? 'bg-sky-400 h-[9.5rem] top-2' : 'bg-cyan-300 h-[7.5rem] top-10 text-white'} w-[7rem] absolute rounded-t-xl mx-2`}>
          <div className='m-2 text-white font-bold'>{value}</div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white h-[10rem] relative flex flex-row justify-end'>

      {data.map((e, k) => renderSwitch(e.type, e.value, k))}
      
      <div className='h-full w-[8rem]'>
        <div className='bg-sky-400 w-[7rem] h-[5rem] top-20 absolute rounded-t-xl mx-2'>
          <div className='text-white font-bold flex justify-center items-center h-full text-4xl'>+</div>
        </div>
      </div>
    </div>
  );
}

export default function PatientCanvas() {
  const [ schedule, setSchedule ] = useState([{value: 'Paciente', type: 'previous'}, {value: 'Paciente 10/10/24', type: 'after'}])

  useEffect(() => {
    console.log('setting schedule');
    setSchedule(schedule);
  });

  return (
    <div className='flex flex-col items-center justify-center relative'>
      <h1 className='mt-10 text-3xl'>Informações do paciente</h1>
      
      <GridItem />

      <div className='flex flex-col w-[40rem] mt-10'>
        <input className='my-2 p-2' type="text" />
        <input className='my-2 p-2' type="phone" />

        <h1 className='my-2'>Acompanhamento</h1>

        <textarea className='h-[10rem]' name="" id=""></textarea>

        <h1 className='my-2'>Agendamentos</h1>
        
        <SchedulingPatient data={schedule}/>
      </div>

      <div className='rounded-full w-[100px] h-[100px] p-2 bg-green-400 flex items-center justify-center text-white text-7xl right-24 bottom-20 fixed'>
          <span className='select-none'>
            <Image src={Check} alt='check'/>
          </span>
      </div>

      <div className='fixed top-10 right-28'>
        <Image src={Close} alt='close'/>
      </div>

    </div>
  );
}