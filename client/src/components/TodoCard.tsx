import {FC, Dispatch, SetStateAction} from "react";
import {Goal, Todo} from "../Types";
import {BsThreeDots} from "react-icons/bs";
import {MdDone} from "react-icons/md";
import {AiOutlineRedo} from "react-icons/ai";
import {IconContext} from "react-icons";
import { formatDate } from "../utils/utils";
import {updateTodo} from "../ApiServices";

interface props {
  todo: Todo,
  goal: Goal,
  onDelete: (todo: Todo) => void, // ^more elegant way?
  setGoal: Dispatch<SetStateAction<Goal>>,
  completed: boolean,
}

const TodoCard: FC<props> = ({todo, onDelete, setGoal, goal, completed}): JSX.Element => {

  async function handleCompleteTodo (todo: Todo) {
    const isCompletedTodo = !todo.isCompletedTodo;
    const updatedTodo = {...todo, isCompletedTodo};
    await updateTodo(updatedTodo)
    const filteredTodos = goal.Todos.filter((todoEl: Todo) => todoEl.id !== todo.id)
    setGoal((prev: Goal) => ({...prev, Todos: [...filteredTodos, updatedTodo]}))
  }
  console.log(todo)

  return (
    <>
      {
        completed &&
          <div className="flex items-center">
            <div className="flex flex-col px-5 py-3 bg-white/60 rounded-md text-gray-400 mr-5 grow">
              <div className="flex relative">
                <p>{todo.titleTodo}</p>
                <button onClick={() => onDelete(todo)} className="ml-auto absolute -top-1.5 -right-1">
                  <IconContext.Provider value={{color: 'grey'}}>
                    <BsThreeDots />
                  </IconContext.Provider>
                </button>
              </div>
              <div className="flex flex-col items-start">
                <p>{formatDate(todo.dueDateTodo)}</p>
              </div>
            </div>
            <button onClick={() => handleCompleteTodo(todo)} className="p2 w-9 h-9 rounded-full bg-white/60">
              <IconContext.Provider value={{color: 'grey'}}>
                <AiOutlineRedo className="m-auto"/>
              </IconContext.Provider>
            </button>
          </div>
      }
      {
        !completed &&
          <div className="flex items-center">
            <div className="flex flex-col px-5 py-3 bg-white rounded-md text-black mr-5 grow">
              <div className="flex relative">
                <p>{todo.titleTodo}</p>
                <button onClick={() => onDelete(todo)} className="ml-auto absolute -top-1.5 -right-1">
                  <IconContext.Provider value={{color: 'var(--highlight-light-color)'}}>
                    <BsThreeDots />
                  </IconContext.Provider>
                </button>
              </div>
              <div className="flex flex-col items-start">
                <p>{formatDate(todo.dueDateTodo)}</p>
              </div>
            </div>
            <button onClick={() => handleCompleteTodo(todo)} className="p2 w-9 h-9 rounded-full bg-[color:var(--highlight-dark-color)]">
              <MdDone className="m-auto" />
            </button>
          </div>
      }

    </>
  );
}

  export default TodoCard
