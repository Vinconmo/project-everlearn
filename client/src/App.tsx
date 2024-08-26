import {FC} from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import GoalDetail from './components/GoalDetail'

const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {path: "/", element: <Dashboard />},
      {path: "goal/:goalId", element: <GoalDetail />}
    ]
  },
])

const App: FC = (): JSX.Element => {
  return (
    <div className='flex w-full '>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
