import {FC} from 'react'
import './App.css'
import Navbar from './layouts/Navbar'
import Dashboard from './pages/Dashboard'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import GoalDetail from './pages/GoalDetail'

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
