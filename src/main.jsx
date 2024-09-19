import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import SignupPage from './Pages/SignupPage.jsx'
import Dashboard from './Pages/Dashboard.jsx'

 const router=createBrowserRouter([
  {
    path: '/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<SignupPage/>
      },
      {
        path: '/dashboard',
        element:<Dashboard/>
      },
      
    ]
  }
 ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider  router={router}>
    <App />
    </RouterProvider>
  </StrictMode>,
)
