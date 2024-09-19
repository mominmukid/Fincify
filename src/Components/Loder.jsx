import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
function Loder() {

   useGSAP(() => {
      let tl = gsap.timeline();
      tl.to('.box', {
         scale: 0,
         y: 60,
         duration: 1,
         rotate: 400,
         repeat: -1,
         yoyo: true,
         stagger: {
            amount: 1.5,
            from: 'start',
            grid: [3, 3],
         }
      });

   });

   return (
      <div className='h-full w-full flex justify-center bg-[#c7c6c6] items-center '>
         <div className='contenor w-24 rotate-45  grid grid-cols-3 gap-1'>

            {new Array(9).fill().map((arr) => {
               return <div className=' box h-7 w-7 bg-blue-700'></div>
            })}
         </div>
      </div>
   )
}

export default Loder