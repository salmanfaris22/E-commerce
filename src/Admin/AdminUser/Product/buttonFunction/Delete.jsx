import axios from "axios";
import { userAPI } from "../../../../Components/API/API_URL";

export async function HandleDelet(user){

  
 await axios.delete(`${userAPI}/${user.id}`)




}