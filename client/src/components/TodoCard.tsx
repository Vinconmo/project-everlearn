import {FC} from "react";
import {Todo} from "../Types";
import {BsThreeDots} from "react-icons/bs";
import {MdDone} from "react-icons/md";
import {AiOutlineRedo} from "react-icons/ai";
import {IconContext} from "react-icons";
import { formatDate } from "../utils/utils";

interface props {
  todo: Todo,
  onDelete: (todo: Todo) => void,
  todoCompleted: boolean,
  handleTodoComplete: (todo: Todo) => void
}

const TodoCard: FC<props> = ({todo, onDelete, todoCompleted, handleTodoComplete}): JSX.Element => {


  return (
    <>
      {
        todoCompleted &&
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
            <button onClick={() => handleTodoComplete(todo)} className="p2 w-9 h-9 rounded-full bg-white/60">
              <IconContext.Provider value={{color: 'grey'}}>
                <AiOutlineRedo className="m-auto"/>
              </IconContext.Provider>
            </button>
          </div>
      }
      {
        !todoCompleted &&
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
            <button onClick={() => handleTodoComplete(todo)} className="p2 w-9 h-9 rounded-full bg-[color:var(--highlight-dark-color)]">
              <MdDone className="m-auto" />
            </button>
          </div>
      }

    </>
  );
}

  export default TodoCard
