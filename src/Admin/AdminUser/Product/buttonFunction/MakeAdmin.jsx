import axios from "axios";
import { userAPI } from "../../../../Components/API/API_URL";

export async function MakeAdmin(user){
   
   try{
        await axios.patch(`${userAPI}/${user.id}`,{"admin":true})
   }catch(Err){
    console.log(Err);
   }

}


export async function RemoveAdmin(user){
   
    try{
         await axios.patch(`${userAPI}/${user.id}`,{"admin":false})
    }catch(Err){
     console.log(Err);
    }
 
 }