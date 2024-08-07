import axios from "axios"
import { ItemsAPI, userAPI } from "../../../Components/API/API_URL";


export const TotalCoutomer = async()=>{
    try{
            const res =await axios.get(userAPI)
            const datas = res.data
            return datas
    }catch(err){
            console.log(err);
    }

    
} 

export const TotalProduct = async()=>{
    try{
            const res =await axios.get(ItemsAPI)
            const datas = res.data
            return datas
    }catch(err){
            console.log(err);
    }

    
} 
export const TotalOrder = async()=>{
    try{
        const res =await axios.get(userAPI)
        const datas = res.data
        return datas
}catch(err){
        console.log(err);
}
    
} 

// export const TotalSales = async()=>{
//     try{
//         const res =await axios.get(userAPI)
//         const datas = res.data


//         // status==="pending"
//       return datas
       
// }catch(err){
//         console.log(err);
// }
    
// } 