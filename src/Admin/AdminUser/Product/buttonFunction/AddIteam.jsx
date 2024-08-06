import axios from "axios"
import { ItemsAPI } from "../../../../Components/API/API_URL"
import {  toast } from "react-toastify";
export const AddProductItems = async (iteam)=>{
        try{
           const res= await axios.get(ItemsAPI)
           const id=res.data.filter((e)=>e.id===iteam.id)
           alert(id)
           if(id===undefined){
            await axios.post(ItemsAPI,iteam)
           }
       
      
        }catch(err){
            toast.warning("err");
        }
}