import Image from "next/image";

import Elipse from "/public/Ellipse 1.svg";
import User from "/public/User.svg";

export default function GridItem({ nome, id }: { nome: string; id: number }) {
  const handleClick = (id) => {
    console.log("clicked on patient " + id);
  };

  return (
    <div
      className="relative flex justify-center mt-10 cursor-pointer"
      onClick={() => handleClick(id)}
    >
      <div className="relative">
        <Image
          className="z-0"
          src={Elipse}
          width={180}
          height={180}
          alt="ellipse icon"
        />
        <Image
          className="absolute top-7 left-10 z-10"
          src={User}
          width={100}
          height={100}
          alt="user icon"
        />
        {nome !== "" ? (
          <h1 className="absolute float-end text-center bottom-2 bg-white border border-blue-400 rounded-lg px-2 py-1 bottom-3 w-full select-none">
            {nome}
          </h1>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
