import React, { useState } from 'react'

function UserCard({userId,firstName,lastName}) {
    const [user,setUser]=useState(userId)

    function sendMoney(){
        console.log(user)
    }
  return (
    <div className=' rounded-md shadow-2xl flex justify-between pl-5 pr-5 mt-3'>
        <div>
            <div></div>
            <div className=' text-lg'>{firstName} {lastName}</div>
        </div>
        <div>
            <button className='bg-slate-800 text-white text-sm p-2 rounded-md' onClick={sendMoney}>Send Money</button>
        </div>
    </div>
  )
}

export default UserCard