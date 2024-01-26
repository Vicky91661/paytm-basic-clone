import React, { useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import UserAtom from '../store/UserAtom';
function Signin() {
    
    const [loginData,setLoginData]=useState({
        username:"",
        password:""
    })
    const setUserData = useSetRecoilState(UserAtom)

    const [error,setError]=useState("")
    const navigate = useNavigate ();

    function sendData(e){
        e.preventDefault();
        axios.post("https://paytm-basic-clone-backend.vercel.app/api/v1/user/signin",loginData)
        .then((data)=>{
            const authorization =data.data.token;
            localStorage.setItem('authorization', authorization);
            
            setUserData(
                ()=>({firstName:data.data.firstName,
                lastName:data.data.lastName,
                userId:data.data.userId,
                balance:data.data.balance
                })
            )
            navigate("/dashboard")
        }).catch((error)=>{
            console.log("error is =>",error)
            setError(error.response.data.message)
           console.log(error.response.data.message)
        })
    }

    function changeForm(e){
        console.log(e.target.value)
        if(error){
            setError("")
        }
        const { name, value } = e.target;
        console.log(name,value)
        setLoginData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

  return (
    <div className=' '>
    <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={sendData}>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm 
                            rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                             dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                              dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={changeForm}/>
                        </div>
                        
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                             focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                               dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={changeForm}/>
                        </div>
                        
                        
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 
                        focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 
                        py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onChange={sendData}>
                            Sign In
                        </button>
                        {error&&error.map((e,index)=>{
                            return <div key={index} className='text-red-600'>{e}</div>
                        })}
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Dont't have an account? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign Up here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
  )
}

export default Signin