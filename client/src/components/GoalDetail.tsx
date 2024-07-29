import {FC, useEffect, useState, Dispatch, SetStateAction} from "react";
import TodoCard from "./TodoCard";
import AddTodo from "./AddTodo"
import {useParams, useNavigate} from "react-router-dom";
import {deleteTodo, getGoalById, updateGoal, updateTodo} from "../ApiServices";
import {Todo, Goal} from '../Types'
import {IconContext} from "react-icons";
import {IoIosArrowBack} from "react-icons/io";


interface props {
  setGoals: Dispatch<SetStateAction<Goal[]>>
}

const GoalDetail: FC<props> = ({setGoals}): JSX.Element => {
  const navigate = useNavigate();

  const initialGoalState = {Todos: []} // ^solution? can't set empty with type or I can't map over todos
  const [goal, setGoal] = useState<any>(initialGoalState)
  const [isAddTodo, setIsAddTodo] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)

  // get param from router & convert to number
  const params = useParams();
  const id = Number(params.goalId);

  let completedTodos: Todo[] | [] = [];
  let openTodos: Todo[] | [] = [];

  useEffect(() => {
    // fetch goal data based on id from param
    const fetchGoal = async () => {
      const goal = await getGoalById(id)
      setGoal(goal)
      // check completion status of goal after fetching
      if (isCompleted !== goal.isCompleted) setIsCompleted(true)
    }
    fetchGoal()
  }, [isAddTodo]) // ! id removed // not optimal to refetch - maybe work with state

  console.log(goal)

  // filter todos by completion
  if (goal.Todos.length > 0) {
    completedTodos = goal.Todos.filter((todo: Todo) => todo.isCompletedTodo)
    openTodos = goal.Todos.filter((todo: Todo) => !todo.isCompletedTodo)
    isGoalCompleted(goal);
  }

  async function handleTodoComplete (todo: Todo): Promise<void> {
    const isCompletedTodo = !todo.isCompletedTodo;
    const updatedTodo = {...todo, isCompletedTodo};
    const resTodo = await updateTodo(updatedTodo)
    // if todo is reverted to open but goal was completed -> update goal in db
    // updatedGoal stays the old Goal or is updated after fetch
    let updatedGoal = goal;
    if (todo.isCompletedTodo && isCompleted) {
      updatedGoal = await updateGoal({...goal, isCompleted: false});
      setIsCompleted(false);
    }
    const filteredTodos = goal.Todos.filter((todoEl: Todo) => todoEl.id !== todo.id)
    updatedGoal = {...updatedGoal, Todos: [...filteredTodos, resTodo]}
    setGoal(updatedGoal)
    setGoals((prev: Goal[]) => {
      const filteredGoals = prev.filter((item: Goal) => item.id !== goal.id)
      return [...filteredGoals, updatedGoal]
    })
  }

  // list factory for both todo list types
  function createTodoList (todos: Todo[], completed: boolean): JSX.Element[] {
    // sort todo list by date
    const sortedTodos = todos.sort((a: Todo, b: Todo) => Date.parse(a.dueDateTodo.toString()) - Date.parse(b.dueDateTodo.toString()))
    // create todo list for rendering todo cards
    return sortedTodos.map((todo: Todo): JSX.Element => {
      return (
        <TodoCard key={todo.id} todo={todo} onDelete={handleDeleteClick} handleTodoComplete={handleTodoComplete} todoCompleted={completed} />
      )
    })
  }

  // check if goal completed
  async function isGoalCompleted (goal: Goal): Promise<void> {
    const isCompleted = goal.isCompleted;
    // sets isCompleted to true if at least 1 todo exists and no further open todos
    if (goal.Todos.length > 0 && !isCompleted && openTodos.length == 0) {
      const res = await updateGoal({...goal, isCompleted: !isCompleted})
      setGoal(res)
      setIsCompleted(true)
    }
  }

  function handleClickNew () {
    setIsAddTodo(true)
  }

  async function handleDeleteClick (todo: Todo) {
    await deleteTodo(todo)
    const Todos = goal.Todos.filter((todoEl: Todo) => todoEl.id !== todo.id)
    setGoal((prev: Goal) => ({...prev, Todos}))
  }

  // Todo: refactor
  return (
    <>
      <div className={`flex flex-col pt-16 px-10 w-full ${openTodos.length > 0 ? 'gap-y-8' : 'gap-y-0'}`}>
          {
             !isCompleted ?
              <div className="flex flex-col px-10 w-full">
              <div className="flex mb-5 w-400 items-end">

                <h1 className="text-left">
                  <span className="text-gray-400 text-sm">Your goal</span><br />
                  <div className="flex gap-x-1 items-center">
                    <button onClick={() => navigate('/')}>
                      <IconContext.Provider value={{color: 'var(--highlight-light-color)'}}>
                        <IoIosArrowBack />
                      </IconContext.Provider>
                    </button>
                      {goal.title} 🚀
                  </div>
                </h1>
                  <button onClick={handleClickNew} className="ml-auto bg-[color:var(--highlight-light-color)] px-4 py-0.5 rounded-md"><span className="font-semibold mr-3">+</span>Add New</button>
                </div>
                <div className="flex flex-col gap-y-5 my-5">
                  {
                    createTodoList(openTodos, false)
                  }
                </div>
              </div> :
              <div className="flex flex-col px-10 w-full">
              <div className="flex mb-5 w-400 items-end">
                <h1 className="text-left">
                  <span className="text-gray-400 text-sm font-semibold">You reached your goal 🚀</span><br />
                  <div className="flex gap-x-1 items-center">
                    <button onClick={() => navigate('/')}>
                      <IconContext.Provider value={{color: 'var(--highlight-light-color)'}}>
                        <IoIosArrowBack />
                      </IconContext.Provider>
                    </button>
                    {goal.title}
                  </div>
                </h1>
                </div>
              </div>
          }
        { isCompleted &&
            <div className="flex flex-col px-10 w-full">
              <div className="flex mb-5 w-400 items-end">
                <h2>Completed Todos 💪</h2>
              </div>
              <div className="flex flex-col gap-y-5">
                {
                  createTodoList(completedTodos, true)
                }
              </div>
            </div>
        }
      </div>
      {isAddTodo && <AddTodo setIsAddTodo={setIsAddTodo} GoalId={goal.id}/>}
    </>
  )
}

export default GoalDetail
