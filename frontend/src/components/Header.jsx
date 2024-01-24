import React from 'react'
import { CgProfile } from "react-icons/cg";

function Header({firstName,lastName}) {

    function getProfileDetails(){
        
    }

  return (
    <div className='bg-gray-50 dark:bg-gray-900 flex justify-between text-white pl-6 pr-6 text-lg py-3'>
        <div>
            Paytm
        </div>
        <div className='flex cursor-pointer' onClick={getProfileDetails}>
            <div>Welcome {firstName} {lastName}</div>
            <div className='ml-2'><CgProfile className='w-8 h-8 hover:text-gray-300 '/></div>
        </div>
    </div>
  )
}

export default Header