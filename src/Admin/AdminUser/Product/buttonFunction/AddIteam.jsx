import axios from "axios"
import { ItemsAPI } from "../../../../Components/API/API_URL"

export const AddProductItems = async (iteam)=>{
        try{
               await axios.post(ItemsAPI,iteam)
        }catch(err){
            console.log("err");
        }
}