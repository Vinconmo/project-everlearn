import {ChangeEvent, FC, FormEvent, useState, Dispatch, SetStateAction} from "react";
import {Todo, Goal} from "../Types";
import {postGoal} from "../ApiServices";
import {IconContext} from "react-icons";
import {IoCloseOutline} from "react-icons/io5";

interface props {
  setIsAddGoal: Dispatch<SetStateAction<boolean>>,
  setGoals: Dispatch<SetStateAction<Goal[]>>,
}

// goal type with date = string and convert for value
interface GoalData {
  title: string,
  dueDate: string,
  Todos: Todo[] | [],
}


const AddGoal: FC<props> = ({setIsAddGoal, setGoals}): JSX.Element => {
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

  const initialGoalData = {title: '', dueDate: placeholder, Todos: []}
  const [goalData, setGoalData] = useState<GoalData>(initialGoalData)

  function handleFormChange (event: ChangeEvent) {
    event.preventDefault();
    setGoalData((prev: GoalData) => ({
      ...prev,
      [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
    }))
  }

  async function handleFormSubmit (event: FormEvent) {
    event.preventDefault();
    // convert HTML Input into Date object
    const dueDate = new Date(goalData.dueDate)
    const res = await postGoal({...goalData, dueDate})
    if (res) {
      setGoals((prev: Goal[]) => [...prev, res])
      setGoalData(initialGoalData)
      // set state to return to Dashboard
      setIsAddGoal(false)
    } else console.log('Error posting the goal in AddGoal')
  }

  const handleFormClose = () => {
    setIsAddGoal(false)
  }

  return (
    <>
      <div className="fixed bg-black/70 w-full h-screen flex items-center">
        <form onSubmit={(event) => handleFormSubmit(event)} className=" flex flex-col relative max-w-sm min-w-fit w-1/3 mx-auto bg-white p-10 rounded-md">
          <div className="mb-5 w-full">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">What would you like to learn?</label>
            <input type="text" id="title" name="title" onChange={(event) => handleFormChange(event)} value={goalData.title} placeholder="Build Leapmind with React Native" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          </div>
          <div className="mb-5 w-full">
            <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-gray-900">When would you like to be done?</label>
            <input type="date" id="dueDate" name="dueDate" onChange={(event) => handleFormChange(event)} value={goalData.dueDate} placeholder={placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          </div>
          <button type="submit" className="self-center text-white bg-[color:var(--highlight-light-color)] hover:bg-[color:var(--highlight-dark-color)] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Start Planning</button>
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

export default AddGoal
