import {useEffect, useState, FC} from 'react'
import './App.css'
import {getGoals} from './ApiServices'
import {Goal} from './Types'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import GoalDetail from './components/GoalDetail'


const App: FC = (): JSX.Element => {
  const [goals, setGoals] = useState<Goal[]>([])
  const [isAddGoal, setIsAddGoal] = useState<boolean>(false)

  useEffect(() => {
    const fetchGoals = async () => {
      const goals = await getGoals();
      setGoals(goals)
    }
    fetchGoals()
  }, [isAddGoal, goals])

  // ^more elegant way?
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard goals={goals} setIsAddGoal={setIsAddGoal} isAddGoal={isAddGoal} />
    },
    {
      path: 'goal/:goalId',
      element: <GoalDetail /> // ^is there a way to pass variable prop? // helper funct that filters goal by id from router params?
    }

  ])

  return (
    <>
      <div className='flex w-full'>
        <Navbar setIsAddGoal={setIsAddGoal} />
        <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
