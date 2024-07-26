import {FC} from "react";
import {Todo} from "../Types";
import {BsThreeDots} from "react-icons/bs";
import {RiDeleteBinLine} from "react-icons/ri";
import {IconContext} from "react-icons";
import { formatDate } from "../utils/utils";

interface props {
  todo: Todo
  onDelete: (todo: Todo) => void, // ^more elegant way?
}

const TodoCard: FC<props> = ({todo, onDelete}): JSX.Element => {

  return (
    <>
      <div className="flex items-center">
        <div className="flex flex-col px-5 py-3 bg-white rounded-md text-black mr-5 grow">
          <div className="flex relative">
            <p>{todo.titleTodo}</p>
            <button className="ml-auto absolute -top-1.5 -right-1">
              <IconContext.Provider value= {{color: 'var(--highlight-light-color)'}}>
                <BsThreeDots />
              </IconContext.Provider>
            </button>
          </div>
          <div className="flex flex-col items-start">
            <p>{formatDate(todo.dueDateTodo)}</p>
          </div>
        </div>
        <button onClick={() => onDelete(todo)} className="p2 w-9 h-9 rounded-full bg-[color:var(--highlight-dark-color)]">
          <RiDeleteBinLine className="m-auto"/>
        </button>
      </div>
    </>
  );
}

export default TodoCard
