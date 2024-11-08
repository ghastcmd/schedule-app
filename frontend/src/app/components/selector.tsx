export default function Selector() {
  return (
    <div className='ml-10 mt-10'>
      <select className='border-solid border-2 border-gray-300 px py-1 pl-2 text-[1.3rem]' name="menu" id="menu">
        <option value="menu">Menu</option>
        <option value="pacients">Pacientes</option>
        <option value="calendar">Agenda Mensal</option>
      </select>
    </div>
  );
}