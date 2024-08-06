import axios from "axios"
import { ItemsAPI } from "../../../../Components/API/API_URL"
import {  toast } from "react-toastify";
export const AddProductItems = async (iteam)=>{

        try{
        
             
            await axios.post(ItemsAPI,iteam)
           
       
      
        }catch(err){
            toast.warning("err");
        }
}

