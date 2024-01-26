import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import axios from 'axios'

import UserAtom from '../store/UserAtom'

function Signup() {
    
    const [signUpData,setSignUpData]=useState({
        username:"",
        firstName:"",
        lastName:"",
        password:"",
    })
    const setUserData = useSetRecoilState(UserAtom)

    const [error,setError]=useState("")
    const navigate = useNavigate ();

    function sendData(e){
        e.preventDefault();
        axios.post("http://localhost:3000/api/v1/user/signup",signUpData)
        .then((data)=>{
            const authorization =data.data.token;
            localStorage.setItem('authorization', authorization);
            setUserData(
                ()=>({
                    firstName:signUpData.firstName,
                    lastName:signUpData.lastName,
                    userId:data.data.userId,
                    balance:data.data.balance
                })
            )
            navigate("/dashboard")
        }).catch((error)=>{
            setError(error.response.data.message)
        })
    }

    function changeForm(e){
        console.log(e.target.value)
        if(error){
            setError("")
        }
        const { name, value } = e.target;
        setSignUpData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

  return (
    <div>
        <section className="bg-gray-50 dark:bg-gray-900 p-4">
            <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto md:h-full lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-4" onSubmit={sendData}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="username" id="username" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                  dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={changeForm} autoComplete="username" />
                            </div>
                            <div>
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                <input type="text" name="firstName" id="firstName" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                                focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                  dark:focus:border-blue-500" placeholder="First name" required="" onChange={changeForm}/>
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                <input type="text" name="lastName" id="lastName" placeholder="Last name" className="bg-gray-50 
                                border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 
                                focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                                 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                  dark:focus:border-blue-500" required="" onChange={changeForm}/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                                 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                                   dark:focus:border-blue-500" required="" onChange={changeForm}  autoComplete="current-password"/>
                            </div>
                            
                            
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 
                            focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 
                            py-2 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Create an account
                            </button>
                            {error&&error.map((e,index)=>{
                            return <div key={index} className='text-red-600'>{e}</div>
                            })}
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
    
  )
}

export default Signup