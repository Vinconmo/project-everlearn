import {ChangeEvent, FC, FormEvent, useState, Dispatch, SetStateAction} from "react";
import {postTodo} from "../ApiServices";
import {IconContext} from "react-icons";
import {IoCloseOutline} from "react-icons/io5";
import {Goal, Todo} from "../Types";

interface props {
  setIsAddTodo: Dispatch<SetStateAction<boolean>>,
  setGoal: Dispatch<SetStateAction<Goal>>,
  setGoals: Dispatch<SetStateAction<Goal[]>>,
  GoalId: number | undefined,
}

interface TodoData {
  titleTodo: string,
  dueDateTodo: string,
  resource: string,
  comments: string,
  GoalId: number | undefined,
}

const AddTodo: FC<props> = ({setIsAddTodo, GoalId, setGoal, setGoals}): JSX.Element => {
  // setting placeholder for HTML Date Input
  const now = new Date();
  now.setMonth(now.getMonth() + 2, 0);
  const thisYear = now.getFullYear();
  const nextMonth = now.getMonth() + 1;
  const day = now.getDate();
  const placeholder = getDateFormHtmlInput(thisYear, nextMonth, day);

  function getDateFormHtmlInput (year: number, month: number, day: number): string {
    return `${year}-${month < 10 ? 0 : ''}${month}-${day}`
  }

  const initialTodoData = {titleTodo: '', dueDateTodo: placeholder, resource: '', comments: '', GoalId}
  const [todoData, setTodoData] = useState<TodoData>(initialTodoData)

  function handleFormChange (event: ChangeEvent) {
    setTodoData((prev: TodoData) => ({
      ...prev,
      [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
    }))
  }

  async function handleFormSubmit (event: FormEvent) {
    event.preventDefault();
    // convert HTML Input into Date object
    const dueDateTodo = new Date(todoData.dueDateTodo)
    let todo: Todo;
    if (GoalId) {
      const res = await postTodo({...todoData, dueDateTodo}, GoalId)
      if (res) {
        todo = res;
        setGoals((prev: Goal[]) => {
          const [currGoal] = prev.filter((goal: Goal) => goal.id === GoalId)
          const otherGoals = prev.filter((goal: Goal) => goal.id !== GoalId)
          const currTodos = currGoal.Todos
          const updatedGoal = {...currGoal, Todos: [...currTodos, todo]}
          setGoal(updatedGoal)
          return [...otherGoals, updatedGoal]
        })
        setTodoData(initialTodoData)
        // set state to return to Goal Details
        setIsAddTodo(false)

      }
    } else alert('Error connecting todo with a goal. Please go back to your dashboard an retry')
  }

  const handleFormClose = () => {
    setIsAddTodo(false)
  }

  return (
    <>
      <div className="fixed bg-black/70 w-screen h-screen flex items-center">
        <form onSubmit={(event) => handleFormSubmit(event)} className="flex flex-col relative max-w-sm min-w-fit w-5/12 mx-auto bg-white p-10 rounded-md">
          <div className="mb-5 w-full">
            <label htmlFor="titleTodo" className="block mb-2 text-sm font-medium text-gray-900">Name your learning activity:</label>
            <input type="text" id="titleTodo" name="titleTodo" onChange={(event) => handleFormChange(event)} value={todoData.titleTodo} placeholder="Read Sam Altman's blog post" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          </div>
          <div className="mb-5 w-full">
            <label htmlFor="resource" className="block mb-2 text-sm font-medium text-gray-900">Save a link to your study material:</label>
            <input type="text" id="resource" name="resource" onChange={(event) => handleFormChange(event)} value={todoData.resource} placeholder="https://link-to-your-material.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          </div>
          <div className="mb-5 w-full">
            <label htmlFor="dueDateTodo" className="block mb-2 text-sm font-medium text-gray-900">When would you like to be done?</label>
            <input type="date" id="dueDateTodo" name="dueDateTodo" onChange={(event) => handleFormChange(event)} value={todoData.dueDateTodo} placeholder={placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          </div>
          <div className="mb-5 w-full">
            <label htmlFor="comments" className="block mb-2 text-sm font-medium text-gray-900">When would you like to be done?</label>
            <textarea id="comments" name="comments" onChange={(event) => handleFormChange(event)} value={todoData.comments} placeholder="Leave any notes for later ..." rows={3} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          </div>
          <button type="submit" className="self-center text-white bg-[color:var(--highlight-light-color)] hover:bg-[color:var(--highlight-dark-color)] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add todo</button>
          <div className="absolute top-2 right-2">
            <IconContext.Provider value={{color: 'var(--highlight-light-color)', size: '1.5em'}}>
              <IoCloseOutline onClick={handleFormClose} className="cursor-pointer z-50" />
            </IconContext.Provider>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTodo
