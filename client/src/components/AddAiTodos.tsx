import {ChangeEvent, FC, FormEvent, useState, Dispatch, SetStateAction} from "react";
import {generateTodos} from "../ApiServices";
import {Goal, Todo} from "../Types";
import {Grid} from 'react-loader-spinner'

interface props {
  setIsAddAiTodo: Dispatch<SetStateAction<boolean>>,
  goal: Goal,
  setGoal: Dispatch<SetStateAction<Goal>>
}

interface PlanData {
  learningGoalDesc: string,
  experienceLevel: string,
  existingKnowledge: string,
  frequency: string,
  frequencyUnit: string,
  preferredFormats: string,
  todoUnitTime: string,
  preferredLearningDays: string
}

// Todo: pass down goal id
const AddAiTodos: FC<props> = ({setIsAddAiTodo, goal, setGoal}): JSX.Element => {
  const initialPlanDetails = {
    learningGoalDesc: '',
    experienceLevel: '',
    existingKnowledge: '',
    frequency: '',
    frequencyUnit: '',
    preferredFormats: '',
    todoUnitTime: '',
    preferredLearningDays: ''
  }
  const [planDetails, setPlanDetails] = useState<PlanData>(initialPlanDetails)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function handleFormChange (event: ChangeEvent) {
    event.preventDefault();
    setPlanDetails((prev: PlanData) => ({
      ...prev,
      [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
    }))
    console.log(planDetails, 'planDetails')
  }

  async function handleFormSubmit (event: FormEvent) {
    event.preventDefault();
    setIsLoading(true)
    const {learningGoalDesc, experienceLevel, existingKnowledge, frequency, frequencyUnit, preferredFormats, todoUnitTime, preferredLearningDays} = planDetails
    //!
    const modelParams = {
      learningGoal: `General goal: ${goal.title}. Goal details: ${learningGoalDesc}`,
      experienceLevel,
      existingKnowledge,
      timeline: goal.dueDate,
      frequency,
      frequencyUnit,
      preferredFormats,
      todoUnitTime,
      preferredLearningDays,
    }
    // call model with model parameter & id
    const todos: Todo[] | [] = await generateTodos(modelParams, goal.id)
    // add todos to goal after call
    setGoal((prev: Goal) => {
      const currTodos = goal.Todos
      const newTodos: Todo[] = (currTodos as Todo[]).concat((todos as Todo[]))
      return {...prev, Todos: newTodos}
    })
    setIsAddAiTodo(false)
    setIsLoading(false)
  }

  return (
    <>

        <div className="absolute bg-black/70 w-screen h-screen flex items-center">
        {!isLoading &&
          <form onSubmit={(event) => handleFormSubmit(event)} className="flex flex-col h-5/6 overflow-y-scroll max-w-2/3 min-w-fit w-2/3 mx-auto bg-white p-10 rounded-md">
            <div className="mb-5 w-full">
              <label htmlFor="learningGoalDesc" className="block mb-2 text-sm font-medium text-gray-900">Describe your goal in more detail:</label>
              <textarea id="learningGoalDesc" name="learningGoalDesc" onChange={(event) => handleFormChange(event)} value={planDetails.learningGoalDesc} placeholder="Build an MVP for a todo app" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="experienceLevel" className="block mb-2 text-sm font-medium text-gray-900">Your experience in your desired field:</label>
              <input type="text" id="experienceLevel" name="experienceLevel" onChange={(event) => handleFormChange(event)} value={planDetails.experienceLevel} placeholder="Beginner, 2 on a scale 1-10" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="existingKnowledge" className="block mb-2 text-sm font-medium text-gray-900">Describe any previous experience:</label>
              <input type="text" id="existingKnowledge" name="existingKnowledge" onChange={(event) => handleFormChange(event)} value={planDetails.existingKnowledge} placeholder="1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div className="mb-5 w-full">
              <div className="mb-5 w-full">
                <label htmlFor="preferredFormats" className="block mb-2 text-sm font-medium text-gray-900">How would you like to learn?</label>
                <input type="text" id="preferredFormats" name="preferredFormats" onChange={(event) => handleFormChange(event)} value={planDetails.preferredFormats} placeholder="Video & Reading" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
              </div>
              <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-900">How frequent would you like to study?</label>
              <input type="text" id="frequency" name="frequency" onChange={(event) => handleFormChange(event)} value={planDetails.frequency} placeholder="1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="frequencyUnit" className="block mb-2 text-sm font-medium text-gray-900">How long should be a study unit?</label>
              <input type="text" id="frequencyUnit" name="frequencyUnit" onChange={(event) => handleFormChange(event)} value={planDetails.frequencyUnit} placeholder="week" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="todoUnitTime" className="block mb-2 text-sm font-medium text-gray-900">How long should be a study unit?</label>
              <input type="text" id="todoUnitTime" name="todoUnitTime" onChange={(event) => handleFormChange(event)} value={planDetails.todoUnitTime} placeholder="1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="preferredLearningDays" className="block mb-2 text-sm font-medium text-gray-900">What week days do you prefer to learn?</label>
              <input type="text" id="preferredLearningDays" name="preferredLearningDays" onChange={(event) => handleFormChange(event)} value={planDetails.preferredLearningDays} placeholder="Monday, Wednesday, Friday" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <button type="submit" className="self-center sticky bottom-0 text-white bg-[var(--highlight-light-color)] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Generate plan for me</button>
          </form>
        }
        {
          isLoading &&
          <div className="flex flex-col relative m-auto gap-y-5">
              <p>Leapmind's AI is cooking up a brain buffet ...</p>
            <Grid
              visible={true}
              height="80"
              width="80"
              radius="12.5"
              color="var(--highlight-light-color)"
              ariaLabel="loading"
              wrapperStyle={{}}
              wrapperClass="relative m-auto"
            />
          </div>
        }
        </div>


    </>
  );
}

export default AddAiTodos
