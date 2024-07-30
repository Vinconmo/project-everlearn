import {ChangeEvent, FC, FormEvent, useState, Dispatch, SetStateAction} from "react";
import {generateTodos} from "../ApiServices";
import {Goal, Todo} from "../Types";
import {Grid} from 'react-loader-spinner';
import {Slider, Checkbox, FormControlLabel, FormGroup, Typography} from '@mui/material';

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
    experienceLevel: '1',
    existingKnowledge: '',
    frequency: '',
    frequencyUnit: '',
    preferredFormats: '',
    todoUnitTime: '',
    preferredLearningDays: ''
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

      <div className="fixed bg-black/70 w-screen h-screen flex items-center">
        {!isLoading &&

          <form onSubmit={(event) => handleFormSubmit(event)} className="flex flex-col h-5/6 overflow-y-scroll custom-scrollbar max-w-2/3 min-w-fit w-1/3 mx-auto bg-white p-10 rounded-md">
            <h2 className="font-semibold mb-5">Let <span className="text-[color:var(--highlight-light-color)]">LeapmindAI</span> generate a plan for you</h2>
            <div className="mb-5 w-full">
              <label htmlFor="learningGoalDesc" className="block mb-2 text-sm font-medium text-gray-900">Describe your goal in more detail:</label>
              <textarea id="learningGoalDesc" name="learningGoalDesc" onChange={(event) => handleFormChange(event)} value={planDetails.learningGoalDesc} placeholder="Build an MVP for a todo app" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="experienceLevel" className="block mb-2 text-sm font-medium text-gray-900">How experience are you already in the field?<br /> <span className="text-xs text-gray-400">Rate yourself on a scale from 1 "complete beginner" to 10 "expert"</span></label>
              <div className="flex w-full justify-center">

              <Slider sx={{color: 'var(--highlight-light-color)', width: '80%'}} min={1} max={10} marks={true} valueLabelDisplay="auto" className="text-xs Mui-required" name="experienceLevel" id="experienceLevel" onChange={(event) => handleFormChange(event)} />
              </div>
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="existingKnowledge" className="block mb-2 text-sm font-medium text-gray-900">Describe any previous experience:</label>
              <textarea id="existingKnowledge" name="existingKnowledge" onChange={(event) => handleFormChange(event)} value={planDetails.existingKnowledge} placeholder="Built 3 apps with react" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="preferredFormats" className="block mb-2 text-sm font-medium text-gray-900">How would you like to learn?</label>
              <input type="text" id="preferredFormats" name="preferredFormats" onChange={(event) => handleFormChange(event)} value={planDetails.preferredFormats} placeholder="Mix of video tutorials & reading blog posts" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div className="flex flex-col gap-x-5 items-start justify-between">
              <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-900">How frequent would you like to study?</label>
              <div className="flex gap-x- mb-5 w-full">
                <div className="flex items-center gap-x-2 text-black text-sm mr-5">
                  <input type="text" id="todoUnitTime" name="todoUnitTime" onChange={(event) => handleFormChange(event)} value={planDetails.todoUnitTime} placeholder="1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5" required />
                  <span>hour(s)</span>
                </div>
                <div className="flex items-center gap-x-2 text-black text-sm mr-5">
                  <input type="number" id="frequency" name="frequency" onChange={(event) => handleFormChange(event)} value={planDetails.frequency} placeholder="1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16 p-2.5" required />
                  <span>time(s)</span>
                </div>
                <div className="flex items-center gap-x-2 text-black text-sm ml-auto">
                  <span>per</span>
                  <select id="frequencyUnit" name="frequencyUnit" onChange={(event) => handleFormChange(event)} value={planDetails.frequencyUnit} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5">
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-5 w-full">
              <label htmlFor="preferredLearningDays" className="block mb-2 text-sm font-medium text-gray-900">What week days do you prefer to learn?</label>
              <FormGroup>
              <div className="flex">
                <div className="w-1/8">
                  <FormControlLabel name="Monday"
                    control={<Checkbox id="Monday" name="Monday" sx={{
                      '& .MuiSvgIcon-root': {fontSize: 18, marginBottom: '1.5px'},
                    }} />}
                    label={<Typography sx={{
                      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                      fontSize: '0.875rem',
                      color: 'black',
                      '& p': {verticalAlign: 'middle'}
                    }}>Mon</Typography>}
                    sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', verticalAlign: 'bottom'}}
                  />
                </div>
                <div className="w-1/8">
                  <FormControlLabel name="Tuesday"
                    control={<Checkbox id="Tuesday" name="Tuesday" sx={{
                      '& .MuiSvgIcon-root': {fontSize: 18, marginBottom: '1.5px'},
                    }} />}
                    label={<Typography sx={{
                      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                      fontSize: '0.875rem',
                      color: 'black',
                      '& p': {verticalAlign: 'middle'}
                    }}>Tue</Typography>}
                    sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', verticalAlign: 'bottom'}}
                  />
                  </div>
                  <div className="w-1/8">
                    <FormControlLabel name="Wednesday"
                      control={<Checkbox id="Wednesday" name="Wednesday" sx={{
                        '& .MuiSvgIcon-root': {fontSize: 18, marginBottom: '1.5px'},
                      }} />}
                      label={<Typography sx={{
                        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                        fontSize: '0.875rem',
                        color: 'black',
                        '& p': {verticalAlign: 'middle'}
                      }}>Wed</Typography>}
                      sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', verticalAlign: 'bottom'}}
                    />
                  </div>
                  <div className="w-1/8">
                    <FormControlLabel name="Thursday"
                      control={<Checkbox id="Thursday" name="Thursday" sx={{
                        '& .MuiSvgIcon-root': {fontSize: 18, marginBottom: '1.5px'},
                      }} />}
                      label={<Typography sx={{
                        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                        fontSize: '0.875rem',
                        color: 'black',
                        '& p': {verticalAlign: 'middle'}
                      }}>Thur</Typography>}
                      sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', verticalAlign: 'bottom'}}
                    />
                  </div>
                  <div className="w-1/8">
                    <FormControlLabel name="Friday"
                      control={<Checkbox id="Friday" name="Friday" sx={{
                        '& .MuiSvgIcon-root': {fontSize: 18, marginBottom: '1.5px'},
                      }} />}
                      label={<Typography sx={{
                        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                        fontSize: '0.875rem',
                        color: 'black',
                        '& p': {verticalAlign: 'middle'}
                      }}>Fri</Typography>}
                      sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', verticalAlign: 'bottom'}}
                    />
                  </div>
                  <div className="w-1/8">
                    <FormControlLabel name="Saturday"
                      control={<Checkbox id="Saturday" name="Saturday" sx={{
                        '& .MuiSvgIcon-root': {fontSize: 18, marginBottom: '1.5px'},
                      }} />}
                      label={<Typography sx={{
                        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                        fontSize: '0.875rem',
                        color: 'black',
                        '& p': {verticalAlign: 'middle'}
                      }}>Sat</Typography>}
                      sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', verticalAlign: 'bottom'}}
                    />
                  </div>
                  <div className="w-1/8">
                    <FormControlLabel name="Sunday"
                      control={<Checkbox id="Sunday" name="Sunday" sx={{
                        '& .MuiSvgIcon-root': {fontSize: 18, marginBottom: '1.5px'},
                      }} />}
                      label={<Typography sx={{
                        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
                        fontSize: '0.875rem',
                        color: 'black',
                        '& p': {verticalAlign: 'middle'}
                      }}>Sun</Typography>}
                      sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', verticalAlign: 'bottom'}}
                    />
                  </div>

              </div>
              </FormGroup>
            </div>
            <button type="submit" className="self-center sticky bottom-0 text-white bg-[color:var(--highlight-light-color)] hover:bg-[color:var(--highlight-dark-color)] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Generate plan</button>
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
