import React from 'react'
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';

function Header({firstName}) {
  const token =localStorage.getItem("authorization")
  const navigate = useNavigate()
  console.log("token in header is ",token);



  function deleteStorage(){
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className='bg-gray-50 dark:bg-gray-900 flex font-poppins justify-between text-white pl-6 pr-6 text-lg py-3'>
        <div>
            <h1 className=' text-2xl font-medium'>Paytm</h1>
        </div>
        {token?
        <div className='flex'>
            <div>Welcome ,<span className=' text-lime-400'>{firstName}</span></div>
            <div className='ml-2'><CgProfile className='w-8 h-8 hover:text-gray-300 '/></div>
            <button className='bg-red-500 text-sm px-3 rounded-md ml-4'
            onClick={deleteStorage}>Logout</button>
        </div>:null}
    </div>
  )
}

export default Header