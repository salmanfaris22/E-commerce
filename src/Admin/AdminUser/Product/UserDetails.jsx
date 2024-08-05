import axios from "axios"
import { useEffect, useState } from "react"
import { userAPI } from "../../../Components/API/API_URL"
import { HandleDelet } from "./buttonFunction/Delete"



const UserDetails = () => {
const [user,setUser] =useState([])
    useEffect(()=>{
       async function users(){
           try{
            const res =await axios.get(userAPI)
            const use  = res.data.filter((e)=>e.admin !== true)
            setUser(use)
           }catch(err){
            console.log(err,"Admin userErr");
           }
         
        }
        users()
    },[])

   async function deleteUSer(e){

    try{
        await HandleDelet(e)
        const res =await axios.get(userAPI)
        const use  = res.data.filter((e)=>e.admin !== true)
        setUser(use)
        
   }catch(err){
        console.log("somthin wrong");
    }

   }  
  return (
   <div className="">
     <div className="flex flex-col gap-3 mt-4">
        {
            user.map((e,i)=>{
                return(
                    <div key={e.id} className="grid grid-cols-3 shadow-sm font-semibold p-2 w-[90%] m-auto">
                        <div className="flex "><span className="">{i+1}</span> <span className="ml-3">{e.fname}</span> {e.lname}</div>
                        <div>{e.email}</div>
                       <div className="flex gap-2 justify-between">
                       
                        <div className="flex justify-end">
                            <button className="bg-green-500 text-white rounded-lg p-3">Edit</button>
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-red-500 text-white rounded-lg p-3" onClick={()=>deleteUSer(e)}>Delete</button>
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-blue-500 text-white p-3 rounded-lg">More InforMation</button>
                        </div>
                        <div className="flex justify-end">
                            <button className="bg-white text-black rounded-lg p-3">Make Admin</button>
                        </div>
                       </div>
                    </div>
                )
            })
        }
    </div>
   </div>
  )
}

export default UserDetails