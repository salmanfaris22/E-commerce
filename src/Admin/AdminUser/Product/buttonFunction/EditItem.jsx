import axios from "axios"
import { ItemsAPI } from "../../../../Components/API/API_URL"

export const  UpdateItem = async(item,id)=>{
    await console.log(id);
 await axios.put(`${ItemsAPI}/${id}`,item)
}