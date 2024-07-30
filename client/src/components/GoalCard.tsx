import {FC, MouseEvent, Dispatch, SetStateAction} from "react";
import {Goal, Todo} from "../Types";
import {BsThreeDots} from "react-icons/bs";
import {MdDeleteOutline} from "react-icons/md";
import {IconContext} from "react-icons";
import {formatDate} from "../utils/utils";
import {useNavigate} from "react-router-dom";
import {deleteGoal} from "../ApiServices";
import {Card, CardContent} from '@mui/material';

interface props {
  goal: Goal
  setGoals: Dispatch<SetStateAction<Goal[]>>,
}

const GoalCard: FC<props> = ({goal, setGoals}): JSX.Element => {
  const navigate = useNavigate();

  async function handleDelete (e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    const res = await deleteGoal(goal)
    setGoals((prev: Goal[]) => {
      const filteredGoals = prev.filter((item: Goal) => item.id !== res.id)
      return [...filteredGoals]
    })
  }

  const completedTodos = goal.Todos.filter((todo: Todo) => todo.isCompletedTodo)
  const openTodos = goal.Todos.filter((todo: Todo) => !todo.isCompletedTodo)
  const sortedTodos = openTodos.sort((a: Todo, b: Todo) => Date.parse(a.dueDateTodo.toString()) - Date.parse(b.dueDateTodo.toString()))
  const todosNum = goal.Todos.length;
  const progress = completedTodos.length / (todosNum || 1)


  return (
    <>
      {
        goal.isCompleted &&
        <a onClick={() => navigate(`/goal/${goal.id}`)} className="cursor-pointer min-w-80">
            <Card classes={{root: "relative px-2 text-left opacity-70"}}>
            <CardContent>
                <h3 className="font-semibold text-gray-500">
                <span className="text-gray-400 text-xs font-medium">Goal</span><br />
                {goal.title}
              </h3>
              <p className="relative top-2.5 text-gray-400 text-xs">{`${completedTodos.length} / ${todosNum}`}</p>
              <progress value={progress} max="1" className="w-full my-3"></progress>
                <div className="flex flex-col text-left text-xs font-medium text-gray-500 gap-y-3">
                <p>
                  <span className="text-gray-400 text-xs">Completed</span><br />
                  {formatDate(goal.updatedAt)}
                </p>
              </div>
              <button onClick={(event) => handleDelete(event)} className="absolute top-2 right-2.5 z-10">
                <IconContext.Provider value={{color: 'grey', size: '1em'}}>
                  <MdDeleteOutline />
                </IconContext.Provider>
              </button>
            </CardContent>
          </Card>
        </a>
      }
      {
        !goal.isCompleted &&
        <a onClick={() => navigate(`/goal/${goal.id}`)} className="cursor-pointer min-w-80 w-[45%]">
          <Card classes={{root: "relative px-2 text-left h-full"}}>
            <CardContent>
                <h3 className="font-semibold">
                <span className="text-gray-400 text-xs font-medium">Goal</span><br />
                {goal.title}
              </h3>
              <p className="relative top-2.5 text-gray-400 text-xs">{`${completedTodos.length} / ${todosNum}`}</p>
              <progress value={progress} max="1" className="w-full my-3"></progress>
              <div className="flex flex-col text-left text-xs font-medium gap-y-3">
                <p>
                  <span className="text-gray-400 text-xs">Due</span><br />
                  {formatDate(goal.dueDate)}
                </p>
                {openTodos.length > 0 &&
                  <div>
                    <span className="text-gray-400 text-xs">Next Todo</span><br />
                    <div className="flex justify-between gap-x-5">
                      <span>{sortedTodos[0].titleTodo}</span>
                      <span className="ml-auto text-right w-24">{formatDate(sortedTodos[0].dueDateTodo)}</span>
                    </div>
                  </div>
                }
              </div>
              <button onClick={handleDelete} className="absolute top-2 right-2.5">
                <IconContext.Provider value={{color: 'var(--highlight-light-color)'}}>
                  <BsThreeDots />
                </IconContext.Provider>
              </button>
            </CardContent>
          </Card>
        </a>
      }
    </>
  );
}

export default GoalCard


// <div className="flex items-center">
// < div className = "flex flex-col px-5 py-3 bg-white rounded-md text-black mr-5 grow" >
//           <div className="flex relative">
//             <p>{goal.title}</p>
//             <button onClick={handleDelete} className="ml-auto absolute -top-1.5 -right-1">
//               <IconContext.Provider value={{color: 'var(--highlight-light-color)'}}>
//                 <BsThreeDots />
//               </IconContext.Provider>
//             </button>
//           </div>
//           <div className="flex flex-col items-start">
//             <p>{formatDate(goal.dueDate)}</p>
//           </div>
//         </div >
// <button onClick={() => navigate(`/goal/${goal.id}`)} className="p2 w-9 h-9 rounded-full bg-[color:var(--highlight-dark-color)]">{'>'}</button>
//       </div >
