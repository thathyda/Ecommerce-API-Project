import { Spinner } from '@nextui-org/react'
import React from 'react'

const LoadingComponent = () => {
  return (
    <div className='h-screen flex w-full justify-center items-center'>
      <Spinner size='lg'/>
    </div>
  )
}
export default LoadingComponent