import Image from "next/image";

import searchIcon from "/public/search.svg";
import { useState } from "react";

export default function SearchBar({
  reset,
  fetchPatients,
}: {
  reset: () => void;
  fetchPatients: (string) => void;
}) {
  const [value, setValue] = useState("");

  const handleInput = async (e?) => {
    const searchString = e.target.value;
    setValue(searchString);
    fetchPatients(searchString);
    reset();
  };

  return (
    <div className="flex justify-center mt-5 w-full">
      <div className="w-[40rem] relative">
        <input
          className="w-full py-3 px-7 rounded-xl"
          type="text"
          value={value}
          onChange={handleInput}
          placeholder="Digite o nome do paciente..."
        />
        <Image
          src={searchIcon}
          onClick={handleInput}
          className="absolute right-2.5 top-2.5 cursor-pointer"
          alt="search icon"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
}
