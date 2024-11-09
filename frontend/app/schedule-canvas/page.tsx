'use client';

import Image from "next/image";

import GridItem from "../components/gridItem";

import Check from '/public/Check.svg';
import Close from '/public/close.svg';

export default function PatientCanvas() {
  return (
    <div className='flex flex-col items-center justify-center relative'>
      <h1 className='mt-10 text-3xl'>Informações do agendamento</h1>
      
      <GridItem />

      <div className='flex flex-col w-[40rem] mt-10'>
        <h1 className='my-2 p-2 my-2' >Nome do paciente</h1>
        <h1 className='my-2 p-2 my-2'> +55 (82) 99999-9999 </h1>

        <div className='justify-between flex flex-row w-[40rem] my-2'>
          <h1 className='my-2 p-2'>Data</h1>
          <input className='p-2 w-[10rem]' type="date" />
        </div>
        <div className='justify-between flex flex-row w-[40rem] my-2'>
          <h1 className='my-2 p-2'>Hora</h1>
          <input className='p-2 w-[10rem]' type="time" />
        </div>

        <h1 className='my-2'>Notas</h1>

        <textarea className='h-[10rem]' name="" id=""></textarea>

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