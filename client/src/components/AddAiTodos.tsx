import {ChangeEvent, FC, FormEvent, useState, Dispatch, SetStateAction} from "react";
import {generateTodos} from "../ApiServices";
import {Goal, Todo} from "../Types";
import {Grid} from 'react-loader-spinner';
import {Slider, Checkbox, FormControlLabel, Typography} from '@mui/material';
import {IconContext} from "react-icons";
import {IoCloseOutline} from "react-icons/io5";

interface props {
  setIsAddAiTodo: Dispatch<SetStateAction<boolean>>,
  goal: Goal,
  setGoal: Dispatch<SetStateAction<Goal>>
}

interface PlanData {
  learningGoalDesc: string,
  experienceLevel: string,
  existingKnowledge: string,
  startDate: string,
  frequency: string,
  frequencyUnit: string,
  preferredFormats: string,
  todoUnitTime: string,
  preferredLearningDays: string[]
}

// Todo: pass down goal id
const AddAiTodos: FC<props> = ({setIsAddAiTodo, goal, setGoal}): JSX.Element => {
  // setting placeholder for HTML Date Input
  const now = new Date();
  const thisYear = now.getFullYear();
  const nextMonth = now.getMonth() + 1;
  const day = now.getDate();
  const placeholder = getDateFormHtmlInput(thisYear, nextMonth, day);

  function getDateFormHtmlInput (year: number, month: number, day: number): string {
    return `${year}-${month < 10 ? 0 : ''}${month}-${day}`
  }

  const initialPlanDetails = {
    learningGoalDesc: '',
    experienceLevel: '1',
    existingKnowledge: '',
    startDate: placeholder,
    frequency: '',
    frequencyUnit: 'week',
    preferredFormats: '',
    todoUnitTime: '',
    preferredLearningDays: []
  }
  const [planDetails, setPlanDetails] = useState<PlanData>(initialPlanDetails)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  function handleFormChange (event: ChangeEvent | Event) { // ! check type
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
    const {learningGoalDesc, experienceLevel, startDate, existingKnowledge, frequency, frequencyUnit, preferredFormats, todoUnitTime, preferredLearningDays} = planDetails
    //!
    const modelParams = {
      learningGoal: `General goal: ${goal.title}. Goal details: ${learningGoalDesc}`,
      experienceLevel,
      existingKnowledge,
      startDate,
      timeline: goal.dueDate,
      frequency,
      frequencyUnit,
      preferredFormats,
      todoUnitTime,
      preferredLearningDays: preferredLearningDays.join(',')
    }
    // call model with model parameter & id
    const todos: Todo[] | [] = await generateTodos(modelParams, goal.id)
    console.log('todos', todos)
    // add todos to goal after call
    setGoal((prev: Goal) => {
      const currTodos = goal.Todos
      const newTodos: Todo[] = (currTodos as Todo[]).concat((todos as Todo[]))
      return {...prev, Todos: newTodos}
    })
    setIsAddAiTodo(false)
    setIsLoading(false)
  }

  // handle Checkbox changes
  const handleCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {target} = event;
    const {name} = target;
    const updatedSelectedDays = planDetails.preferredLearningDays.includes(name)
      ? planDetails.preferredLearningDays.filter((day: string) => day !== name)
      : [...planDetails.preferredLearningDays, name];
    setPlanDetails((prev: PlanData) => ({
      ...prev,
      preferredLearningDays: updatedSelectedDays
    }))
  };

  const handleFormClose = () => {
    setIsAddAiTodo(false)
  }

  return (
    <>

      <div className="fixed bg-black/70 w-screen h-screen flex items-center">
        {!isLoading &&
          <form onSubmit={(event) => handleFormSubmit(event)} className="flex flex-col relative h-5/6 overflow-y-scroll custom-scrollbar max-w-2/3 min-w-fit w-1/3 mx-auto bg-white p-10 rounded-md">
            <h2 className="font-semibold mb-5">Let <span className="text-[color:var(--highlight-light-color)]">LeapmindAI</span> generate a plan for you</h2>
            <div className="mb-5 w-full">
              <label htmlFor="learningGoalDesc" className="block mb-2 text-sm font-medium text-gray-900">Describe your goal in more detail:</label>
              <textarea id="learningGoalDesc" name="learningGoalDesc" onChange={(event) => handleFormChange(event)} value={planDetails.learningGoalDesc} placeholder="Build an MVP for a todo app" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="mb-5 w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">How experience are you already in the field?<br /> <span className="text-xs text-gray-400">Rate yourself on a scale from 1 "complete beginner" to 10 "expert"</span></label>
              <div className="flex w-full justify-center">

              <Slider sx={{color: 'var(--highlight-light-color)', width: '80%'}} min={1} max={10} marks={true} valueLabelDisplay="auto" className="text-xs Mui-required" name="experienceLevel" id="experienceLevel" onChange={(event) => handleFormChange(event)} />
              </div>
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="existingKnowledge" className="block mb-2 text-sm font-medium text-gray-900">Describe any previous experience:</label>
              <textarea id="existingKnowledge" name="existingKnowledge" onChange={(event) => handleFormChange(event)} value={planDetails.existingKnowledge} placeholder="Built 3 apps with react" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900">When would you like to start?</label>
              <input type="Date" id="startDate" name="startDate" onChange={(event) => handleFormChange(event)} value={planDetails.startDate} placeholder={placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="preferredFormats" className="block mb-2 text-sm font-medium text-gray-900">Which forms of learning do you prefer?</label>
              <input type="text" id="preferredFormats" name="preferredFormats" onChange={(event) => handleFormChange(event)} value={planDetails.preferredFormats} placeholder="Mix of video tutorials & reading blog posts" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div className="flex flex-col gap-x-5 items-start justify-between">
              <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-900">How frequent would you like to study?</label>
              <div className="flex gap-x- mb-5 w-full">
                <div className="flex items-center gap-x-2 text-black text-sm mr-5">
                  <input type="number" id="todoUnitTime" name="todoUnitTime" onChange={(event) => handleFormChange(event)} value={planDetails.todoUnitTime} placeholder="1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5" required />
                  <span>hour(s)</span>
                </div>
                <div className="flex items-center gap-x-2 text-black text-sm mr-5">
                  <input type="number" id="frequency" name="frequency" onChange={(event) => handleFormChange(event)} value={planDetails.frequency} placeholder="1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16 p-2.5" required />
                  <span>time(s)</span>
                </div>
                <div className="flex items-center gap-x-2 text-black text-sm ml-auto">
                  <span>per</span>
                  <select id="frequencyUnit" name="frequencyUnit" onChange={(event) => handleFormChange(event)} value={planDetails.frequencyUnit} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5" required>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-5 w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900">When do you usually have time for studying?</label>
              <div className="flex">
                {[
                  'Mon',
                  'Tue',
                  'Wed',
                  'Thu',
                  'Fri',
                  'Sat',
                  'Sun',
                ].map((day) => (
                  <div key={day} className="w-1/8">
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={day}
                          name={day}
                          sx={{
                            '& .MuiSvgIcon-root': {fontSize: 18, marginBottom: '1.5px'},
                          }}
                          onChange={handleCheckChange}
                        />
                      }
                      label={
                        <Typography sx={{
                          fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                          fontSize: '0.875rem',
                          color: 'black',
                        }}>
                          {day}
                        </Typography>
                      }
                      sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="self-center sticky bottom-0 text-white bg-[color:var(--highlight-light-color)] hover:bg-[color:var(--highlight-dark-color)] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Generate plan</button>
            <div className="absolute top-2 right-2">
              <IconContext.Provider value={{color: 'var(--highlight-light-color)', size: '1.5em'}}>
                <IoCloseOutline onClick={handleFormClose} className="cursor-pointer z-50" />
              </IconContext.Provider>
            </div>
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
