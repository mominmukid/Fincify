import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase.js';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { signOut } from "firebase/auth";
import menphoto from '../../public/men.svg'
import men from '../../public/imag.png'
function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, loading])


  const handelLogout = async () => {
    try {
      await signOut(auth)
      toast.success('Signout successfully!')
      navigate('/')
    } catch (error) {
      toast.error(error.message)
      throw (error)
    }
  }
  return (
    <div className='w-full bg-blue-600 p-3 text-white font-semibold text-2xl sticky top-0 left-0 flex justify-between items-center z-50'>
      <p className='cursor-pointer'>Fincify.</p>
      {user && <div onClick={handelLogout} className='cursor-pointer px-3 hover:text-orange-600  duration-700 flex justify-center  gap-2 items-center'>
        <p><img src={user.photoURL ? user.photoURL :menphoto|| men}  className='flex justify-center items-center h-[2rem] w-[2rem] rounded-full ' /></p>
        <p>Logout</p>
      </div>}
    </div>


  )
}

export default Header