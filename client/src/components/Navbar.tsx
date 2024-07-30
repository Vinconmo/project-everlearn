import brandImage from '../assets/leapmind-high-resolution-logo-transparent.png'
import {FC, Dispatch, SetStateAction} from "react";
import {IconContext} from "react-icons";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {GoGoal} from "react-icons/go";
import {FaCircleUser} from "react-icons/fa6";
import {CgLogOut} from "react-icons/cg";

interface props {
  setIsAddGoal: Dispatch<SetStateAction<boolean>>,
}


const Navbar: FC<props> = ({setIsAddGoal}): JSX.Element => {
  function newGoalClick (): void {
    setIsAddGoal(true);
  }

  return (
    <>
      <div className="sticky flex flex-col top-0 left-0 h-screen pt-5 pl-5 pr-8 bg-[color:var(--highlight-dark-color)] w-2/12 min-w-44 max-w-60 border-box z-50 shadow-md shadow-neutral-500 text-sm">
        <div className="">
          <a href='/'><img src={brandImage} width={150}></img></a>
        </div>
        <hr className="my-5 border-[var(--highlight-light-color)] opacity-60"></hr>
        <div className='flex flex-col grow'>
          <section className="flex flex-col gap-y-3 pt-3">
            <a href='/' className="flex items-center gap-x-3 cursor-pointer">
              <IconContext.Provider value={{color: 'var(--highlight-light-color)', size: '1.5rem'}}>
                <MdOutlineSpaceDashboard />
              </IconContext.Provider>
              <nav>Dashboard</nav>
            </a>
            <a onClick={newGoalClick} className="flex items-center gap-x-3 cursor-pointer">
              <IconContext.Provider value={{color: 'var(--highlight-light-color)', size: '1.5rem'}}>
                <GoGoal />
              </IconContext.Provider>
              <nav>New Goal</nav>
            </a>
          </section>
          <section className="flex flex-col gap-y-3 pt-3 mt-auto mb-5">
            <hr className="mb-2 border-[var(--highlight-light-color)] opacity-60"></hr>
            <a href='/' className="flex items-center gap-x-3 cursor-pointer">
              <IconContext.Provider value={{color: 'rgba(255, 255, 255, 0.4)', size: '1.5rem'}}>
                <FaCircleUser />
              </IconContext.Provider>
              <nav>Profile</nav>
            </a>
            <a onClick={newGoalClick} className="flex items-center gap-x-3 cursor-pointer">
              <IconContext.Provider value={{color: 'rgba(255, 255, 255, 0.4)', size: '1.5rem'}}>
                <CgLogOut />
              </IconContext.Provider>
              <nav>Logout</nav>
            </a>
          </section>
        </div>
      </div>
    </>
  );
}

export default Navbar
