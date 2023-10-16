import React from 'react'
import { useState,useEffect } from 'react'
import ApiFetch from '../ApiFetch'
import {useCookies} from 'react-cookie'
 //import {useNavigate} from "react-router-dom"

const Login = () => {
const [login, setlogin] = useState({username:'',password:''})
const [islogin, setislogin] = useState(true)
const [token,settoken] = useCookies(['mytoken'])
 //let navigate=useNavigate()

useEffect(()=>{
  if(token['mytoken']){
     //navigate('/blogs')
    window.location.href='blogs'
  }
},[token])

 const loginsubmit=()=>{
    ApiFetch.login(login)
    .then(resp=>settoken('mytoken',resp.token))
    .catch(error=>console.log(error))
 }
 
 const registersubmit=()=>{
    ApiFetch.register(login)
    .then(resp=>loginsubmit())
    .catch(error=>console.log(error))
  }
 
 
  return (
    <div className='grid justify-center pt-5 text-white'>
      <h1 className=' text-4xl mb-8 font-bold'>Please {islogin ?'Login':'Register' }</h1>
        <label><span className='text-xl font-semibold'>Username :</span> <input type="text" className='bg-transparent px-4 py-[6px] text-lg rounded-full w-[300px] font-medium border-[1px] border-white outline-none' placeholder='Enter Username' onChange={(e)=>setlogin({...login,username:e.target.value})} value={login.username} /></label><br />
        <label><span className='text-xl font-semibold '>Password :</span> <input type="password" placeholder='Enter Password' className='bg-transparent my-3 ml-1 px-4 py-[6px] text-lg rounded-full w-[300px] font-medium border-[1px] border-white outline-none' onChange={(e)=>setlogin({...login,password:e.target.value})} value={login.password} /></label><br />
        {islogin ?<button type="button" className=' text-xl font-bold rounded-lg py-1 px-14 ml-[35vh] mt-2 mb-5  bg-green-700' onClick={loginsubmit}>Login</button> : <button className=' text-xl font-bold rounded-lg py-1 px-11 ml-[35vh] mt-2 mb-5  bg-green-700' onClick={registersubmit}>Register</button>}
         {islogin ? <h5 className='text-lg font-medium'>If you don't have Account, Please <button className='underline text-xl text-blue-400 font-semibold' onClick={()=>setislogin(false)}>Register</button> Here</h5> :<h5 className='text-lg font-medium'>Already Have An Account , Please <button className='underline text-xl text-blue-400 font-semibold'  onClick={()=>setislogin(true)}>Login</button> Here</h5>} 
    </div>
  )
}

export default Login

