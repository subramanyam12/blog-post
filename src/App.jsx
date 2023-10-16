import { useState,useEffect } from 'react'
import './App.css'
import ApiFetch from './ApiFetch'
import Form from './components/Form'
import Login from './components/Login'
import {useCookies} from 'react-cookie'



function App() {
  const [data, setdata] = useState([])
  const [updateitem,setupdateitem]=useState({title:'',post:''})
  const [updatebool, setupdatebool] = useState(true)
 const [formactive, setformactive] = useState(false)
 const [token,settoken,removetoken] = useCookies(['mytoken'])
  

  useEffect(()=>{
    ApiFetch.getdata(token['mytoken'])
    .then(dat=>setdata(dat))
  },[data])
 
  useEffect(()=>{
    if(!token['mytoken']){
      window.location.href='/'
    }
  },[token])

const postdat=(dat)=>{
  setdata([...data,dat])
}
 
 const del=(id)=>{
  ApiFetch.delete(id,token['mytoken'])
  setdata(data.filter(item=>item.id!==id))
 }

 const update=(item)=>{
    setupdateitem(item)
    setformactive(true)
    setupdatebool(false)
  
}

const valueupdate=(blog)=>{
   ApiFetch.update(blog.id,blog,token['mytoken'])
   .then(dat=>setdata(data.map(item=>item.id===dat.id ? dat:item)))
   setupdatebool(true)
   setupdateitem({title:'',post:''})
  
 }
 const post=()=>{
  setformactive(true)
  setupdatebool(true)
  setupdateitem({title:'',post:''})
 }

 const logout=()=>{
  removetoken(['mytoken'])
 }


return (
  <div className=' overflow-y-auto text-white w-full h-[100vh]'>
    
    <div className='flex gap-16 sticky top-0 bg-inherit items-center border-b-[3px] pt-9 p-5 border-double border-white'>
     <h1 className='font-bold text-4xl'>Your Blogs</h1>
     <div className='flex gap-20 text-xl mt-1 font-bold justify-between'>
        <button type="button" className='bg-blue-700 pl-9 add relative px-3 pb-2 pt-1 rounded-full border-[1px] border-white' onClick={post}>post</button>
        <button className='bg-gray-300 text-red-500 px-3 py-2 rounded-full shadow-2xl border-[1px] border-gray-400' onClick={logout}>Logout</button>
      </div>
    </div> 

    {data && data.map((item)=>(
      <div key={item.id} className='border-b-[1px] p-4 px-10 border-white' >
         <h3 className='text-3xl font-bold'>{item.title}</h3> 
         <p className='mt-4 first-letter:ml-20 ml-3 font-medium'>{item.post}</p>
         <div className='flex mt-5 gap-10 '>
            <button className=' text-lg font-semibold rounded-lg py-1 px-3 outline-gray-500 outline-1 hover:scale-[1.03] hover:outline-double bg-red-600' onClick={()=>del(item.id)}>delete</button>
            <button className=' text-lg font-semibold rounded-lg py-1 px-3 outline-gray-500 outline-1 hover:scale-[1.03] hover:outline-double bg-green-800' onClick={()=>update(item)}>update</button>
         </div>
       </div> 
        ))}
      {formactive && <Form postdat={postdat} setformactive={setformactive} updateitem={updateitem} updatebool={updatebool} valueupdate={valueupdate} update={update}/> }
    </div>
  )
}

export default App
