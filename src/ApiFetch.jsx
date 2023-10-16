
export class ApiFetch {
 static getdata(token){
    return (
    fetch('http://127.0.0.1:8000/blogs/',{
      'method':'GET',
      headers:{
        'Authorization':`Token ${token}`,
      }
    })
    .then(res=>res.json())
    )
 }

 static postdata(body,token){
    return (
     fetch('http://127.0.0.1:8000/blogs/',{
       'method':'POST',
       headers:{
      'Authorization':`Token ${token}`,
      'Content-Type':'application/json'
    },
    body:JSON.stringify(body)
  })
  .then(res=>res.json())
    )
   }

   static update(id,body,token){
    return(
        fetch(`http://127.0.0.1:8000/blogs/${id}/`,{
        'method':'PUT',
       headers:{
        'Authorization':`Token ${token}`,
       'Content-Type':'application/json'
      },
     body:JSON.stringify(body)
    })
    .then(res=>res.json())
    )
   }

   static delete(id,token){
    return (
        fetch(`http://127.0.0.1:8000/blogs/${id}/`,{
         'method':'DELETE',
          headers:{
          'Authorization':`Token ${token}`,
          'Content-Type':'application/json'
         }
        })
    )
   }

   static register(body){
    return(
        fetch('http://127.0.0.1:8000/users/',{
       'method':'POST',
       headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(body)
  })
  .then(res=>res.json())
    )
   }

   static login(body){
    return(
        fetch('http://127.0.0.1:8000/auth/',{
       'method':'POST',
       headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(body)
  })
  .then(res=>res.json())
    )
   }

}

export default ApiFetch