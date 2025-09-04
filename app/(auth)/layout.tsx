
import React, { PropsWithChildren } from 'react'
const AuthLayout = ({children} : PropsWithChildren) => {
  return (
    <div className='h-full'>
      {children}
    </div>
  )
}

export default AuthLayout
