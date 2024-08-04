import axios from "axios";
import { toast } from "react-toastify";
import {  userAPI } from "../API/API_URL";

export const PaymentAdd = async (item)=>{
    const user =localStorage.getItem("id")
    if(user){
       try{

        const res = await axios.get(`${userAPI}/${user}`)
        const  GetOrders = res.data.orders
        const updateOrder = {
            ...GetOrders,
            [item.id]:item
        }
        
        axios.patch(`${userAPI}/${user}`,{orders:updateOrder})
        toast.success("Thanks For Ordering");
       }catch(err){
        console.log("ordder time err",err);
       }
    }else{
        toast.warning("Pleas Logine");
    }
}

export const CancelOrder = async (item)=>{
 
    
    try {
        const user = localStorage.getItem("id");
    
       
        const response = await axios.get(`${userAPI}/${user}`);
        const currentCart = response.data.orders
         
         
       // eslint-disable-next-line no-unused-vars
       const {[item.id]:Remove, ...snew} = currentCart
        
        
      
        await axios.patch(`${userAPI}/${user}`, { orders: snew });
        
     
       
    
        
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }