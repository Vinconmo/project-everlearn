import {FC, Dispatch, SetStateAction} from "react";
import {Goal} from "../Types";
import GoalCard from "./GoalCard";
import AddGoal from "./AddGoal";


interface props {
  goals: Goal[], // ^not used atm
  setIsAddGoal: Dispatch<SetStateAction<boolean>>,
  isAddGoal: boolean,
  setGoals: Dispatch<SetStateAction<Goal[]>>,
  completedGoals: Goal[],
  openGoals: Goal[],
}

const Dashboard: FC<props> = ({isAddGoal, setIsAddGoal, openGoals, completedGoals, setGoals}): JSX.Element => {

  // list factory for both goal list types
  function createGoalList (goals: Goal[]): JSX.Element[] {
    // sort goal list by date
    const sortedGoals = goals.sort((a: Goal, b: Goal) => Date.parse(a.dueDate.toString()) - Date.parse(b.dueDate.toString()))
    // create goal list for rendering goal cards
    return sortedGoals.map((goal: Goal): JSX.Element => {
      return (
        <GoalCard key={goal.id} goal={goal} setGoals={setGoals} />
      )
    })
  }

  function handleBtnClick () {
    setIsAddGoal(true);
  }

  return (
    <>
      <div className="flex flex-col pt-16 px-10 w-10/12 justify-items-stretch border-box grow">
        <div className="flex mb-5 px-10 items-end">
          <h1>Welcome back, Vincent! 👋</h1>
          <button onClick={handleBtnClick} className="ml-auto bg-[color:var(--highlight-light-color)] px-4 py-0.5 rounded-md"><span className="font-semibold mr-3">+</span>New</button>
        </div>

        <div className={`flex flex-col flex-wrap items-start px-10 ${openGoals.length > 0 ? 'gap-y-8' : 'gap-y-0'}`}>
          {
            openGoals.length > 0 &&
            <div className="flex flex-col flex-wrap">
                <h2 className="text-left">Active goals 🎯</h2>
                <div className="flex items-stretch gap-5 my-5 flex-wrap">
                  {
                    createGoalList(openGoals)
                  }
                </div>
            </div>
          }
          {
            completedGoals.length > 0 &&
            <div className="flex flex-col">
                <h2 className="text-left">Completed goals 💪</h2>
                <div className="flex items-stretch gap-5 my-5 flex-wrap">
                {
                  createGoalList(completedGoals)
                }
              </div>
            </div>
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
