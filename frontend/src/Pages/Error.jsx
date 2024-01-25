import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
function Error() {
    const navigate = useNavigate()
  return (
    <div>
        <Header/>
        <div>
            <h1 className=' text-center text-2xl font-poppins font-bold pt-5'>Your are not Signed in </h1>
        </div>
        <div className='flex justify-around items-center h-52 '>
            <div>
                <div className='flex flex-col items-center'>
                    <h1 className=' text-center text-xl font-poppins font-bold pt-5 mb-2'>Not a user ?</h1>
                    <button className='bg-gray-900 text-white py-1 px-3  rounded-md ' onClick={()=>navigate("/signup")}>Sign Up</button>
                </div>
            </div>
            <div>
                <div className='flex flex-col items-center'>
                    <h1 className=' text-center text-xl font-poppins font-bold pt-5 mb-2'>Already have an account?</h1>
                    <button className='bg-gray-900 text-white py-1 px-3  rounded-md w-1/2'  onClick={()=>navigate("/signin")}>Sign In</button>
                </div>
                
                
            </div>
        </div>
    </div>
  )
}

export default Error