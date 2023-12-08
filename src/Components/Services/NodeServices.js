/*
axios.post(url,body,[headers])
headers are used in case of files and web tokens
axios.get()
axios.put()

*/
import axios from 'axios';
export const ServerURL='http://localhost:5000'

export const getData=async(url,isFile=false)=>{
try{
  var response=await fetch(`${ServerURL}/${url}`)
  var result= response.json() 
 // alert(result);
  return(result)
}
catch(e){
return(null)
}
}

export const postData=async(url,body,isFile=false)=>{ 
  
    try{
        const headers={
        headers:{
          'content-type':isFile ?"multipart/form data":"application/json"
       //   "authorization":localStorage.getItem("token")||null 
        }
      }
    var response=await axios.post(`${ServerURL}/${url}`,body,headers)
      var result= await response.data
      return(result)
  
    }

      catch(error){
     return(false)
      }


}