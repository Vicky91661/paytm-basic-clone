import axios from 'axios'
import React, { useState } from 'react'
import { MdOutlineCancel } from "react-icons/md";

function SendMoney({firstName,lastName,headers,receiverId,SetMoneySend,setUserBalance}) {
    console.log(headers)
    const [moneyData,setMoneyData]=useState({
        to:receiverId,
        amount:0, 
    })

    const [error,setError]=useState();
    const [message , setMessage]=useState();
    const [showButton,setShowButton]=useState(true)

    function changeAmount(e){
        setError("")
        console.log(e.target.value)
        setMoneyData((prev)=>({
            ...prev,
            amount:e.target.value
        }))
        console.log(moneyData)
    }

    function sendAgain(){
        setMessage("");
        setShowButton(true)
    }

    function cancleTransaction(){
        SetMoneySend(false)
    }

    function transferMoney(e){
        e.preventDefault();
      
        if(moneyData.amount>0){
            setMessage("Sending...")

            axios.post("http://localhost:3000/api/v1/account/transferMoney",moneyData,{headers})
            .then((response)=>{
                console.log("After sending => ",response.data)
                setMessage("Transaction Successfull")
                setShowButton(false)
                 
                setUserBalance((prev)=>prev-moneyData.amount)

                setMoneyData((prev)=>({
                    ...prev,
                    amount:0
                }))
            }).catch((error)=>{
                console.log(error.response.data.message)
                setMessage("")
                setError(error.response.data.message)
            })
        }else{
            setError("Please enter the amount more than zero")
        }
       
    }
  return (
    <div className=' rounded-2xl shadow-xl w-1/3 mt-16'>
        <MdOutlineCancel className='w-7 h-7 text-red-600 m-2 cursor-pointer' onClick={cancleTransaction} />
        <h1 className='text-center text-2xl font-poppins font-bold pt-5'>Send Money</h1>
        <div className='w-full'>
            <h1 className='text-center font-poppins font-bold pt-1'>to</h1>
            <h1 className='text-center text-lg font-poppins font-bold pt-2'>{firstName} {lastName}</h1>
            <h1 className='text-center font-poppins font-medium pt-3'>Amount(in Rs)</h1>
            
            <div className='flex flex-col items-center pt-1 pb-10 w-full'>
                {showButton?
                    <div className='border-solid border-slate-600 mb-4 mt-1'>
                        <input type="number" placeholder='Enter Amount' 
                        onChange={(e)=>changeAmount(e)} value={moneyData.amount} className=' outline-none w-full'/>
                    </div>
                :null
                }
                {showButton?
                <div>
                    <button className='bg-green-600 text-white px-4 py-1 rounded-md'
                    onClick={transferMoney}>Initiate Transfer</button>
                </div>
                :null}
               {message?<div className='text-green-500 pt-2 mt-1'>{message}</div>:null}
               {!showButton?
                <div>
                    <button className='bg-red-500 text-white px-4 py-1 rounded-md mt-2'
                    onClick={sendAgain}>Send it Again</button>
                </div>
                :null}
               {error?<div className='text-red-500 pt-2'>{error}</div>:null}
                
            </div>
            
            
        </div>
    </div>
  )
}

export default SendMoney