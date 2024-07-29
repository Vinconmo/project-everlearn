import {FC} from "react";
import {Goal} from "../Types";
import { BsThreeDots } from "react-icons/bs";
import {IconContext} from "react-icons";
import { formatDate } from "../utils/utils";
import {useNavigate} from "react-router-dom";
import {deleteGoal} from "../ApiServices";

interface props {
  goal: Goal
}

const GoalCard: FC<props> = ({goal}): JSX.Element => {
  const navigate = useNavigate();

  async function handleDelete () {
    await deleteGoal(goal)
  }


  return (
    <>
      {
        goal.isCompleted &&
          <div className="flex items-center">
            <div className="flex flex-col px-5 py-3 bg-white/60 rounded-md text-gray-400 mr-5 grow">
              <div className="flex relative">
                <p>{goal.title}</p>
                <button onClick={handleDelete} className="ml-auto absolute -top-1.5 -right-1">
                  <IconContext.Provider value={{color: 'grey'}}>
                    <BsThreeDots />
                  </IconContext.Provider>
                </button>
              </div>
              <div className="flex flex-col items-start">
                <p>{formatDate(goal.dueDate)}</p>
              </div>
            </div>
            <button onClick={() => navigate(`/goal/${goal.id}`)} className="p2 w-9 h-9 rounded-full bg-white/60 text-gray-400">{'>'}</button>
          </div>
      }
      {
        !goal.isCompleted &&
        <div className="flex items-center">
          <div className="flex flex-col px-5 py-3 bg-white rounded-md text-black mr-5 grow">
            <div className="flex relative">
              <p>{goal.title}</p>
              <button onClick={handleDelete} className="ml-auto absolute -top-1.5 -right-1">
                <IconContext.Provider value={{color: 'var(--highlight-light-color)'}}>
                  <BsThreeDots />
                </IconContext.Provider>
              </button>
            </div>
            <div className="flex flex-col items-start">
              <p>{formatDate(goal.dueDate)}</p>
            </div>
          </div>
          <button onClick={() => navigate(`/goal/${goal.id}`)} className="p2 w-9 h-9 rounded-full bg-[color:var(--highlight-dark-color)]">{'>'}</button>
        </div>
      }
    </>
  );
}

export default GoalCard
