import axios from "axios";
import { ItemsAPI, userAPI } from "../../../../Components/API/API_URL";


// User Delete
export async function HandleDelet(user){


  await axios.patch(`${userAPI}/${user.id}`, { bloked: "bloked" });




}
export async function HandleUnDelet(user){


  await axios.patch(`${userAPI}/${user.id}`, { bloked: "" });




}


//Product Deleit


export async function ProductDelet(e){

  await axios.delete(`${ItemsAPI}/${e.id}`)
}



