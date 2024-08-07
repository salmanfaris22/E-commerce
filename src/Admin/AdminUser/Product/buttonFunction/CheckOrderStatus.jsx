import axios from "axios"
import { userAPI } from "../../../../Components/API/API_URL";


export const OrderStatus =  async(...Id)=>{
    const [user,data]= Id

  
    try{
        const res = await axios.get(`${userAPI}/${user.e}`)
        const currentOrder = res.data.orders
       
        const updatedCart = {
          ...currentOrder,
          [[user.a]]:{...currentOrder[user.a],

            ["status"]:data
          }
        };
        await axios.patch(`${userAPI}/${user.e}`, { orders: updatedCart });
      

    }catch(err){
        console.log(err);
    }
 
  
}