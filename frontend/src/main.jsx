import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from "./Pages/LoginPage.jsx"
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ChatLayout from './Pages/ChatLayout.jsx'

const router=createBrowserRouter([
  {
    path:"/login",
    element:<LoginPage/>
  },{
    path:"/",
    element:<ProtectedRoute><ChatLayout/></ProtectedRoute>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
