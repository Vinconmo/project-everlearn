import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {getGoals} from './ApiServices'
import {Goal} from './Types'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'

function App() {
  const [data, setData] = useState<Goal[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const goals = await getGoals();
      setData(goals)
    }
    fetchData()
  }, [])
  console.log(data)

  return (
    <>
      <div className='flex'>
        <Navbar />
        <Dashboard />
      </div>
    </>
  )
}

export default App
