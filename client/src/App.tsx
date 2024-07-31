import {useEffect, useState, FC} from 'react'
import './App.css'
import {getGoals} from './ApiServices'
import {Goal} from './Types'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import GoalDetail from './components/GoalDetail'
import AddGoal from './components/AddGoal'


const App: FC = (): JSX.Element => {
  const [goals, setGoals] = useState<Goal[]>([])
  const [isAddGoal, setIsAddGoal] = useState<boolean>(false)

  useEffect(() => {
    const fetchGoals = async () => {
      const goals = await getGoals();
      if (goals) setGoals(goals)
      else {
        console.log('Error fetching goals in App')
      }
    }
    fetchGoals()
  }, [isAddGoal])

  console.log(goals)
  const completedGoals = goals.filter((goal: Goal) => goal.isCompleted)
  const openGoals = goals.filter((goal: Goal) => !goal.isCompleted)

  // ^more elegant way?
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard goals={goals} setIsAddGoal={setIsAddGoal} isAddGoal={isAddGoal} setGoals={setGoals} completedGoals={completedGoals} openGoals={openGoals} />
    },
    {
      path: 'goal/:goalId',
      element: <GoalDetail setGoals={setGoals} /> // ^is there a way to pass variable prop? // helper funct that filters goal by id from router params?
    }

  ])

  return (
    <>
      <div className='flex w-full '>
        <Navbar setIsAddGoal={setIsAddGoal} />
        <RouterProvider router={router} />
        {
          isAddGoal && <AddGoal setIsAddGoal={setIsAddGoal} setGoals={setGoals} />
        }
      </div>
    </>
  )
}

export default App
