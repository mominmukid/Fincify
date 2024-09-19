import React from 'react'
import {  Card, Row } from "antd";
import Button from './Button';

function Cards({
   showExpenseModal,
   showIncomeModal,
   resetBlance,
   income,
   expence,
   totalBal,
}) {
   return (
      <div className='w-full  h-fit flex justify-center items-center'>

         <Row className=' flex-col md:flex-row  justify-between items-center w-[96%] flex-wrap 
         md:justify-between gap-5  md:items-center
         '>
            <Card title={`Current Balance`} className='shadow-2xl shadow-blue-900/80 min-w-[16rem] flex justify-center  flex-col text-[1rem]  md:min-w-[24rem]'>
              <div className='w-full flex justify-center items-center flex-col py-5'>
              <p className='text-[1.3rem]'>₹{totalBal}</p>
              </div>
            </Card>
            
            <Card title={`Total Income`} className='shadow-2xl shadow-blue-900/80 min-w-[16rem] flex justify-center  flex-col text-[1rem]  md:min-w-[24rem]'>
              <div className='w-full flex justify-center items-center flex-col'>
              <p> ₹{income}</p>
              <Button type='reset'
              onClick={showIncomeModal}
               children={`Add Income`}/>
              </div>
            </Card>
            
            <Card title={`Total Expenses`} className='shadow-2xl shadow-blue-900/80 min-w-[16rem] flex justify-center  flex-col text-[1rem]  md:min-w-[24rem]'>
              <div className='w-full flex justify-center items-center flex-col'>
              <p> ₹{expence}</p>
              <Button type='reset'
              onClick={showExpenseModal}
               children={`Add Expenses`}/>
              </div>
            </Card>

         </Row>
      </div>
   )
}

export default Cards