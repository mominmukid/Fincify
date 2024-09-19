import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Components/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    
    <div className='w-full h-screen'>
      <ToastContainer/>
      <Header/>
      <Outlet/>
      
    </div>
  )
}

export default App