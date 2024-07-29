import {FC} from "react";
import {Todo} from "../Types";
import {BsThreeDots} from "react-icons/bs";
import {MdDone} from "react-icons/md";
import {AiOutlineRedo} from "react-icons/ai";
import {IconContext} from "react-icons";
import {formatDate} from "../utils/utils";
import {Card, CardContent} from '@mui/material';


interface props {
  todo: Todo,
  onDelete: (todo: Todo) => void,
  todoCompleted: boolean,
  handleTodoComplete: (todo: Todo) => void
  handleTodoRecover: (todo: Todo) => void
}

const TodoCard: FC<props> = ({todo, onDelete, todoCompleted, handleTodoComplete, handleTodoRecover}): JSX.Element => {


  return (
    <>
      {
        todoCompleted &&
        <div className="flex items-center ">
          <Card classes={{root: "relative mr-5 px-2 text-left cursor-pointer grow 1 min-w-80"}}>
            <CardContent>
              <h3 className="font-semibold mb-3">
                <span className="text-gray-400 text-xs font-medium">Todo</span><br />
                {todo.titleTodo}
              </h3>
              <div className="flex flex-col text-left text-sm font-medium gap-y-3">
                <p>
                  <span className="text-gray-400 text-xs">Completed</span><br />
                  {formatDate(todo.updatedAt)}
                </p>
                <p>
                  <span className="text-gray-400 text-xs">Study material</span><br />
                  <a href={todo.resource}>{todo.resource}</a>
                </p>
                <p>
                  <span className="text-gray-400 text-xs">Notes</span><br />
                  {todo.comments}
                </p>
              </div>
              <button onClick={() => onDelete(todo)} className="absolute top-2 right-2.5">
                <IconContext.Provider value={{color: 'grey'}}>
                  <BsThreeDots />
                </IconContext.Provider>
              </button>
            </CardContent>
          </Card>
          <button onClick={() => handleTodoRecover(todo)} className="p2 w-9 h-9 rounded-full bg-white/60">
            <IconContext.Provider value={{color: 'grey'}}>
              <AiOutlineRedo className="m-auto" />
            </IconContext.Provider>
          </button>
        </div>
      }
      {
        !todoCompleted &&
        <div className="flex items-center ">
          <Card classes={{root: "relative mr-5 px-2 text-left cursor-pointer grow 1 min-w-80"}}>
            <CardContent>
              <h3 className="font-semibold mb-3">
                <span className="text-gray-400 text-xs font-medium">Todo</span><br />
                {todo.titleTodo}
              </h3>
              <div className="flex flex-col text-left text-sm font-medium gap-y-3">
                <p>
                  <span className="text-gray-400 text-xs">Due</span><br />
                  {formatDate(todo.dueDateTodo)}
                </p>
                <p>
                  <span className="text-gray-400 text-xs">Study material</span><br />
                  <a href={todo.resource}>{todo.resource}</a>
                </p>
                <p>
                  <span className="text-gray-400 text-xs">Notes</span><br />
                  {todo.comments}
                </p>
              </div>
              <button onClick={() => onDelete(todo)} className="absolute top-2 right-2.5">
                <IconContext.Provider value={{color: 'var(--highlight-light-color)'}}>
                  <BsThreeDots />
                </IconContext.Provider>
              </button>
            </CardContent>
          </Card>
          <button onClick={() => handleTodoComplete(todo)} className="p2 w-9 h-9 rounded-full bg-[color:var(--highlight-dark-color)]">
            <MdDone className="m-auto" />
          </button>
        </div>
      }

    </>
  );
}

export default TodoCard

/*
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
*/
