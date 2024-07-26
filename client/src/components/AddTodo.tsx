import {ChangeEvent, FC, FormEvent, useState, Dispatch, SetStateAction} from "react";
import {Todo} from "../Types";
import {postGoal, postTodo} from "../ApiServices";

interface props {
  setIsAddTodo: Dispatch<SetStateAction<Boolean>>,
  GoalId: number,
}

interface TodoData {
  titleTodo: string,
  dueDateTodo: string,
  resource: string,
  comments: string,
}

// TODO: color background
// Todo: pass down goal id
const AddTodo: FC<props> = ({setIsAddTodo, GoalId}): JSX.Element => {
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

  const initialTodoData = {titleTodo: '', dueDateTodo: placeholder, resource: '', comments: ''}
  const [todoData, setTodoData] = useState<TodoData>(initialTodoData)

  function handleFormChange (event: ChangeEvent) {
    event.preventDefault();
    setTodoData((prev: TodoData) => ({
      ...prev,
      [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
    }))
  }

  async function handleFormSubmit (event: FormEvent) {
    event.preventDefault();
    // convert HTML Input into Date object
    const dueDateTodo = new Date(todoData.dueDateTodo)
    await postTodo({...todoData, dueDateTodo, GoalId}, GoalId)
    setTodoData(initialTodoData)
    // set state to return to Goal Details
    setIsAddTodo(false)
  }

  return (
    <>
      <div className="absolute bg-black w-screen h-screen flex items-center">
        <form onSubmit={(event) => handleFormSubmit(event)} className="max-w-sm min-w-fit w-1/2 mx-auto bg-white p-10 rounded-md">
          <div className="mb-5">
            <label htmlFor="titleTodo" className="block mb-2 text-sm font-medium text-gray-900">Name your learning activity:</label>
            <input type="text" id="titleTodo" name="titleTodo" onChange={(event) => handleFormChange(event)} value={todoData.titleTodo} placeholder="YT beginners tutorial " className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          </div>
          <div className="mb-5">
            <label htmlFor="resource" className="block mb-2 text-sm font-medium text-gray-900">Save a link to your study material:</label>
            <input type="text" id="resource" name="resource" onChange={(event) => handleFormChange(event)} value={todoData.resource} placeholder="https://www.youtube.com/watch?v=0-S5a0eXPoc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          </div>
          <div className="mb-5">
            <label htmlFor="dueDateTodo" className="block mb-2 text-sm font-medium text-gray-900">When would you like to be done?</label>
            <input type="date" id="dueDateTodo" name="dueDateTodo" onChange={(event) => handleFormChange(event)} value={todoData.dueDateTodo} placeholder={placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          </div>
          <div className="mb-5">
            <label htmlFor="comments" className="block mb-2 text-sm font-medium text-gray-900">When would you like to be done?</label>
            <textarea id="comments" name="comments" onChange={(event) => handleFormChange(event)} value={todoData.comments} placeholder="Leave any notes for later ..." rows={3} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add todo</button>
        </form>
      </div>
    </>
  );
}

export default AddTodo
