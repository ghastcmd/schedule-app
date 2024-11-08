import Selector from './components/selector'

export default function Home() {
  return (
    <div className='h-screen'>
      <Selector />

      <h1 className='text-center leading-[50rem] h-full select-none text-[250px] text-gray-400 font-bold'>BEM VINDO!</h1>
    </div>
  );
}
