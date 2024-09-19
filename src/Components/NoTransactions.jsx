import React from 'react'
import imag from '../../public/image.png'
function NoTransactions() {
  return (
    <div className='w-full mt-8 h-[80%] '>
         <div className='w-full h-full  flex flex-col justify-center items-center p-10 bg-white'>
            <img src={imag} alt="Loding..." className='w-1/2 h-[20rem] object-contain'/>
            <p className='text-[1.3rem] text-gray-800 mt-5'>You Have No Transactions currently! </p>
         </div>
    </div>
  )
}

export default NoTransactions