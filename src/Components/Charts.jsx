import React, { useState } from 'react'
import { Line, Pie } from '@ant-design/charts';

function Charts({
   sortedTransactions,
}) {
   //  useState [height,setHeight]=useState(0)
   const data = sortedTransactions?.map((item) => {
      return { date: item.date, amount: item.amount }
   })

   const spendingdata = sortedTransactions.filter((item) => {
      if (item.type == 'expense') {
         return { tag: item.tag, amount: item.amount }
      }
   })

   const incomeData = sortedTransactions.filter((item) => {
      if (item.type == 'income') {
         return { tag: item.tag, amount: item.amount }
      }
   })

   const config = {
      data,
      // width: 800,
      // height: 400,
      autoFit: true,
      xField: 'date',
      yField: 'amount',
   };

   const spendingConfig = {
      spendingdata,
      // width: 500,
      angleField: 'amount',
      colorField: 'tag',

   };
   let chart;


   return (
//       <div className='w-full h-fit flex justify-center items-center    mt-10  p-2'>
//          <div className='flex-col  justify-between items-center w-[100%] flex-wrap 
//          gap-5  
//           '>
           
//          <div
//                className='w-full  mx-10 '>
              
//                <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
//                <p className='text-center text-gray-700'>Your income</p>
//             </div>
// <div className='w-[40%] '>
// <Pie {...{ ...spendingConfig, data: spendingdata }} />

//             </div>
//          </div>
       


//       </div>

<>
<div className='w-full min-h-auto flex  justify-center flex-wrap items-center   mt-10  p-5  '>
   

    <div className='w-[100%] md:w-[80%] rounded-lg min-h-[5rem]  flex justify-center items-center p-2 bg-white shadow-2xl shadow-blue-900/90 '>
      <div className='w-1/2 min-h-[10rem]'>
      <p className='text-2xl font-semibold my-5'>Financial Statistics</p>
      <Line {...config} onReady={(chartInstance) => (chart = chartInstance)}  className={`h-auto w-auto`}/>
      </div>
    </div>


{
   spendingdata?.length !==0 ? <div className='w-[100%] md:w-[80%] 
   rounded-lg min-h-[5rem] shadow-2xl shadow-blue-900/90 flex justify-center items-center mt-10 bg-white'>
      
   <div className='w-1/2 min-h-[10rem] flex-col justify-center items-center '>
   <p  className=' w-full text-2xl text-center font-semibold my-5'>Total Spending</p>
   <Pie {...{ ...spendingConfig, data: spendingdata }} 
   className={`min-h-[20rem] w-auto `}/>
   </div>
 </div>:null

}

{
   spendingdata?.length !==0 ? <div className='w-[100%] md:w-[80%] 
   rounded-lg min-h-[5rem] shadow-2xl shadow-blue-900/90 flex justify-center items-center mt-10 bg-white'>
      
   <div className='w-1/2 min-h-[10rem] flex-col justify-center items-center '>
   <p  className=' w-full text-2xl text-center font-semibold my-5'>Total Income</p>
   <Pie {...{ ...spendingConfig, data: incomeData }} 
   className={`min-h-[20rem] w-auto `}/>
   </div>
 </div>:null

}


   
</div>
</>


   )
}

export default Charts