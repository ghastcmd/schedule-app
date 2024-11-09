import Selector from "../components/selector";
import SearchBar from "../components/search";
import GridItem from "../components/gridItem";

export default function ListPacients() {
  return (
    <div className='relative'>
      <Selector />

      <SearchBar />

      <div className=''>
        <div className='grid gap-4 grid-cols-5 auto-rows-max mt-[2rem] mx-[10rem]'>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
          <GridItem name={'Nome do paciente'}/>
        </div>
      </div>
      <div className='rounded-full w-[100px] h-[100px] p-2 bg-green-400 flex items-center justify-center text-white text-7xl right-24 bottom-20 fixed'>
          <span className='select-none'>+</span>
      </div>     

    </div>
  );
}