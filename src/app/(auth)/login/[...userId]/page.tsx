import React from 'react'

const page = ({params}:any) => {
    const id = params.userId
  return (
    <div>
      This is login user {id}
    </div>
  )
}

export default page
