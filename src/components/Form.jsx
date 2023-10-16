import React, { useEffect, useState } from 'react'
import ApiFetch from '../ApiFetch'
import {useCookies} from 'react-cookie'


const Form = ({postdat,updatebool,updateitem,setformactive,valueupdate}) => {
  const [blog, setblog] = useState({title:'',post:''})
  const [token] = useCookies(['mytoken'])

useEffect(()=>{
        setblog(!updatebool ? updateitem :{title:'',post:''})
},[updateitem])

  const add=()=>{
    setformactive(false)
      if(updatebool){
          ApiFetch.postdata(blog,token['mytoken'])
          .then(dat=>postdat(dat))
          setblog({title:'',post:''})
         
    }else{
        valueupdate(blog)
    }
     }
     
 
 
  return (
    <div className={`absolute form bottom-0 w-full bg-gray-700 py-[3vh] px-[5vw] text-white `}>
    <input type="text" className='w-full h-9 px-5 text-xl bg-gray-600  outline-none font-bold' placeholder='Enter title' onChange={(e)=>setblog({...blog,title:e.target.value})} value={blog.title} /><br />
    <textarea type="text" className='w-full my-4  h-[20vh] text-white font-semibold bg-gray-600 px-5 pt-1 text-lg outline-none' placeholder='Enter post' onChange={(e)=>setblog({...blog,post:e.target.value})} value={blog.post} ></textarea><br />
    <button className=' text-lg font-bold rounded-lg py-1 px-7 ml-5 text-black bg-gray-400' onClick={()=>setformactive(false)}>back</button>
    <button className=' text-lg font-bold rounded-lg py-1 px-7 ml-5 bg-green-700' onClick={add}>{updatebool ? 'post':'update'}</button>
    </div>
  )
}

export default Form
