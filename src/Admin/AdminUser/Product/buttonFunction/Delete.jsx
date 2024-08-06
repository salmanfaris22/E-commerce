import axios from "axios";
import { ItemsAPI, userAPI } from "../../../../Components/API/API_URL";


// User Delete
export async function HandleDelet(user){

  
 await axios.delete(`${userAPI}/${user.id}`)




}


//Product Deleit


export async function ProductDelet(e){

  await axios.delete(`${ItemsAPI}/${e.id}`)
}



