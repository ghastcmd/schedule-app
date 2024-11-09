import Image from "next/image";

import searchIcon from '/public/search.svg';

export default function SearchBar() {
  return (
    <div className='flex justify-center mt-5 w-full'>
      <div className='w-[30rem] relative'>
        <input 
          className='w-full py-2 px-5'
          type="text"
          placeholder='Digite o nome do paciente...'
        />
        <Image 
          src={searchIcon}
          className='absolute right-1.5 top-1.5'
          alt="search icon"
          width={30} height={30}
        />
      </div>
    </div>
  );
}