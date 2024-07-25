import { useEffect, useState, FC } from 'react'
import './App.css'
import {getGoals} from './ApiServices'
import {Goal} from './Types'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'


const App: FC = (): JSX.Element => {
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const goals = await getGoals();
      setGoals(goals)
    }
    fetchData()
  }, [])

  // ^more elegant way?
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard goals={goals}/>
    }

  ])

  return (
    <>
      <div className='flex w-full'>
        <Navbar />
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
