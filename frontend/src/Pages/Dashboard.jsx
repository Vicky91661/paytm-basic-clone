import React, { useEffect, useState,lazy,Suspense } from 'react'
import Header from '../components/Header'
import axios from 'axios';

import { Link, useNavigate,useSearchParams  } from 'react-router-dom'

const UserCard =lazy(()=>import('../components/UserCard'));

import Loading from '../components/loading';

import { useRecoilValue } from 'recoil';
import UserAtom from '../store/UserAtom';

function Dashboard() {
    const navigate=useNavigate();
    // const params = useSearchParams();
    // const filter = params.get('filter');
    // console.log(filter)
    
    const user = useRecoilValue(UserAtom)
    const [allUsers,setAllUsers] = useState()

    const [search,setSearch]=useState("");

    useEffect(()=>{
        const token=localStorage.getItem('authorization');
        console.log("token is =>",token)
        const headers = {
            authorization: `Bearer ${token}`, // Example of an authorization header
        };
        // `/api/v1/user/bulk?filter=${filterValue}`
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${search}`,{headers})
        .then((data)=>{
            setAllUsers(data.data.users)
        }).catch((error)=>{
            console.log(error)
            navigate("/error")
        })
    },[search])


  return (
    <div >
        <Header firstName={user.firstName} lastName={user.lastName}/>
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
                        dark:focus:border-blue-500" placeholder="Search Users" required value={search} onChange={(e)=>setSearch(e.target.value)}/>

                      
                    </div>
                </form>

            </div>
        </div>
        <Suspense fallback={<Loading />}>
            {allUsers&&allUsers?.map((u)=>{
                return(u.firstName!==user.firstName&&u.lastName!==user.lastName?<div key={user._id}>
                        <UserCard userId={user._id} firstName={u.firstName} lastName={u.lastName}/>
                    </div>:null)
                
            })}
        </Suspense>
    </div>
  )
}

export default Dashboard