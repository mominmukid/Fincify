import React from 'react'

function Input({
   label,
   className='',
   type='text',
   state,
   setState,
   ...props
}) {
  return (
    <div className='flex flex-col justify-center w-[90%] items-start'>
    {label && <label>{label}</label>}
    <input value={state} 
    onChange={(e)=>setState(e.target.value)} 
    type={type} 
    id={label}
    {...props}
    autoComplete='true'
     className={`p-1 outline-none ${className} border-b-2 border-b-black md:w-[96%] w-[90%]`} />
    </div>
  )
}

export default Input