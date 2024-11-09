import Selector from "../components/selector";
import SearchBar from "../components/search";
import GridItem from "../components/gridItem";

export default function ListPacients() {
  return (
    <div>
      <Selector />

      <SearchBar />

      <div className=''>
        <div className='grid gap-4 grid-cols-5 auto-rows-max mt-[2rem] mx-[10rem]'>
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
        </div>
      </div>
    </div>
  );
}