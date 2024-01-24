import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import UserCard from '../components/UserCard';
function Dashboard() {
    const [user,setUser] = useState({
        username:"kumar.vickysah72@gmail.com",
        firstName:"Vicky",
        lastName : "Shah",
        balance:7000
    })
    const [allUsers,setAllUsers] = useState()

    useEffect(()=>{
        const token=localStorage.getItem('authorization');
        const headers = {
            authorization: `Bearer ${token}`, // Example of an authorization header
        };
        axios.get("http://localhost:3000/api/v1/user/bulk",{headers})
        .then((data)=>{
            console.log(data)
            console.log(data.data.users);
            setAllUsers(data.data.users)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

  return (
    <div >
        <Header firstName={"Vicky"} lastName={"Shah"}/>
        <div className=' p-4'>
            <div>
                <h1 className=' text-blue-900 font-poppins font-medium text-lg pt-2 pb-2 ml-2'>Your Balance is :{user.balance} </h1>
                <h1 className='font-poppins font-medium text-lg pb-2 ml-2'>Users</h1>
                
                <form>   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border
                        border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                        dark:focus:border-blue-500" placeholder="Search Users" required/>

                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                        focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700
                        dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>

            </div>
        </div>
        {allUsers&&allUsers?.map((user)=>{
            return <div key={user._id}>
                <UserCard userId={user._id} firstName={user.firstName} lastName={user.lastName}/>
            </div>
        })}
    </div>
  )
}

export default Dashboard