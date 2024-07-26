import {FC, Dispatch, SetStateAction} from "react";
import {Goal} from "../Types";
import GoalCard from "./GoalCard";
import AddGoal from "./AddGoal";

interface props {
  goals: Goal[]
  setIsAddGoal: Dispatch<SetStateAction<boolean>>,
  isAddGoal: boolean,
}

const Dashboard: FC<props> = ({goals, isAddGoal, setIsAddGoal}): JSX.Element => {
  const goalList = goals.map(goal => {
    return (
      <GoalCard key={goal.id} goal={goal}/>
    )
  })

  function handleBtnClick () {
    setIsAddGoal(true);
  }

  return (
    <>
      <div className="flex flex-col pt-16 px-10 w-full">
        <div className="flex mb-5 w-400 items-end">
          <h1>Welcome back, Vincent! 👋</h1>
          <button onClick={handleBtnClick} className="ml-auto bg-[color:var(--highlight-light-color)] px-4 py-0.5 rounded-md"><span className="font-semibold mr-3">+</span>New</button>
        </div>
        <div className="flex flex-col gap-y-5">
          {
            goalList
          }
        </div>
      </div>
      {
        isAddGoal && <AddGoal setIsAddGoal={setIsAddGoal} />
      }

    </>
  );
}

export default Dashboard
