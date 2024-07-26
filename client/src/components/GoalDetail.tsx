import {FC, useEffect, useState} from "react";
import TodoCard from "./TodoCard";
import AddTodo from "./AddTodo"
import {useParams} from "react-router-dom";
import {deleteTodo, getGoalById} from "../ApiServices";
import {Todo, Goal} from '../Types'



interface props {
}

const GoalDetail: FC<props> = (): JSX.Element => {
  const initialGoalState = {Todos: []} // ^solution? can't set empty with type or I can't map over todos
  const [goal, setGoal] = useState<any>(initialGoalState)
  const [isAddTodo, setIsAddTodo] = useState<boolean>(false)

  // get param from router & convert to number
  const params = useParams();
  const id = Number(params.goalId);

  useEffect(() => {
    // fetch goal data based on id from param
    const fetchGoal = async () => {
      const goal = await getGoalById(id)
      setGoal(goal)
    }
    fetchGoal()
  }, [isAddTodo, id])

  // filter todos by completed vs. not completed
  const completedTodos = goal.Todos.filter((todo: Todo) => todo.isCompletedTodo)
  const openTodos = goal.Todos.filter((todo: Todo) => !todo.isCompletedTodo)

  // list factory for both todo list types
  function createTodoList (todos: Todo[], completed: boolean): JSX.Element[] {
    return todos.map((todo: Todo): JSX.Element => {
      return (
        <TodoCard key={todo.id} todo={todo} onDelete={handleDeleteClick} setGoal={setGoal} goal={goal} completed={completed} />
      )
    })
  }

  function handleClickNew () {
    setIsAddTodo(true)
  }

  async function handleDeleteClick (todo: Todo) {
    await deleteTodo(todo)
    const Todos = goal.Todos.filter((todoEl: Todo) => todoEl.id !== todo.id)
    setGoal((prev: Goal) => ({...prev, Todos}))
  }


  return (
    <>
      <div className="flex flex-col pt-16 px-10 w-full gap-y-8">
        <div className="flex flex-col px-10 w-full">
          <div className="flex mb-5 w-400 items-end">
            <h1>Your goal: {goal.title} 🚀</h1>
            <button onClick={handleClickNew} className="ml-auto bg-[color:var(--highlight-light-color)] px-4 py-0.5 rounded-md"><span className="font-semibold mr-3">+</span>Add New</button>
          </div>
          <div className="flex flex-col gap-y-5 my-5">
            {
              createTodoList(openTodos, false)
            }
          </div>
        </div>
        { completedTodos.length > 0 &&
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
