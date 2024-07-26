import brandImage from '../assets/leapmind-high-resolution-logo-transparent.png'
import {FC, Dispatch, SetStateAction} from "react";

interface props {
  setIsAddGoal: Dispatch<SetStateAction<boolean>>,
}


const Navbar: FC<props> = ({setIsAddGoal}): JSX.Element => {
  function newGoalClick (): void {
    setIsAddGoal(true);
  }

  return (
    <>
      <div className="h-screen block pt-5 pl-5 pr-8 bg-[color:var(--highlight-dark-color)]">
        <div className="">
          <a href='/'><img src={brandImage} width={150}></img></a>
        </div>
        <hr className="my-5"></hr>
        <section className="flex flex-col gap-y-3 pt-3">
          <a href='/' className="flex items-center gap-x-3">
            <svg width="25px" data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path>
            </svg>
            <nav>Dashboard</nav>
          </a>
          <a onClick={newGoalClick} className="flex items-center gap-x-3 cursor-pointer">
            <svg width="25px" data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path>
            </svg>
            <nav>New Goal</nav>
          </a>
        </section>
      </div>
    </>
  );
}

export default Navbar
