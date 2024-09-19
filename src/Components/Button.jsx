import React from 'react'

function Button({
   type='submit',
   children,
   className,
   ...props
}) {
  return (
    <button type={type} {...props} className={` mt-2 duration-700 rounded-md text-lg p-1  w-[80%] bg-blue-600 hover:bg-white
      
    border border-blue-600 hover:text-blue-500 text-white ${className}` }>
         {children}
    </button>
  )
}

export default Button