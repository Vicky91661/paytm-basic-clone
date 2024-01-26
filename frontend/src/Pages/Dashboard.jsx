import React, { useEffect, useState,lazy,Suspense } from 'react'
import Header from '../components/Header'
import axios from 'axios';

import { Link, useNavigate,useSearchParams  } from 'react-router-dom'

const UserCard =lazy(()=>import('../components/UserCard'));

import Loading from '../components/Loading';

import { useRecoilValue ,useSetRecoilState } from 'recoil';
import UserAtom from '../store/UserAtom';

import SendMoney from '../components/SendMoney';

import { MdCurrencyRupee } from "react-icons/md";

function Dashboard() {
    const navigate=useNavigate();

    const user = useRecoilValue(UserAtom)
    const setUserData = useSetRecoilState(UserAtom)

    const [allUsers,setAllUsers] = useState()

    const [search,setSearch]=useState("");

    const [moneySend,SetMoneySend] = useState(false)

    const [receiverUser , setReceiverUser] = useState()

    const [userBalance, setUserBalance]= useState()

    const token=localStorage.getItem('authorization');
    
    const headers = {
        authorization: `Bearer ${token}`, // Example of an authorization header
    };

    useEffect(()=>{

            axios.get("https://paytm-basic-clone-backend.vercel.app/api/v1/user/userDetails",{headers})
            .then((Response)=>{
                const data = Response.data;
                
                setUserData(()=>({
                    firstName:data.firstName,
                    lastName:data.lastName,
                    balance:data.balance,
                    userId:data.userId
                }))
                setUserBalance(data.balance)

                axios.get(`https://paytm-basic-clone-backend.vercel.app/api/v1/user/bulk?filter=${search}`,{headers})
                .then((data)=>{
                    setAllUsers(data.data.users)
                }).catch((error)=>{
                    
                    navigate("/error")
                })

            }).catch((error)=>{
               
                navigate("/error")
            })       

    },[search])


  return (
    <div className=' font-poppins'>
        <Header firstName={user.firstName} lastName={user.lastName}/>
        {!moneySend?
            <div>
                <div className=' p-4'>
                    <div>
                        <h1 className=' text-blue-900 font-poppins font-medium text-lg pt-2 pb-2 ml-2'>Your Balance is :<MdCurrencyRupee className=' inline-block' />{userBalance?userBalance:user.balance} </h1>
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
                        return(u._id!==user.userId?<div key={u._id}>
                                <UserCard userId={u._id} firstName={u.firstName} lastName={u.lastName}
                                 SetMoneySend={SetMoneySend} setReceiverUser={setReceiverUser}/>
                            </div>:null)
                        
                    })}
                </Suspense>
            </div>
        :<div className='flex justify-center'>
            <SendMoney firstName={receiverUser.firstName} lastName={receiverUser.lastName} headers={headers} 
            receiverId={receiverUser.receiverId} SetMoneySend={SetMoneySend} setUserBalance={setUserBalance}/>
        </div>}
    </div>
  )
}

export default Dashboard