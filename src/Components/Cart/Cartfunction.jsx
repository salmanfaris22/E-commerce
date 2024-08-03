import axios from "axios";
import { userAPI } from "../API/API_URL";
import { Bounce, toast } from 'react-toastify';
export const handleAddCart = async (item) => {
  try {
    const user = localStorage.getItem("id");

   
    const response = await axios.get(`${userAPI}/${user}`);
    const currentCart = response.data.cart;

    const updatedCart = {
      ...currentCart,
      [item.id]: item 
    };

  
    await axios.patch(`${userAPI}/${user}`, { cart: updatedCart });
    
 
   
    toast('🦄 Item successfully added to cart!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};


export const handleRemovecart =async (item)=>{
  try {
    const user = localStorage.getItem("id");

   
    const response = await axios.get(`${userAPI}/${user}`);
    const currentCart = response.data.cart
     
     
   // eslint-disable-next-line no-unused-vars
   const {[item.id]:Remove, ...snew} = currentCart
    
    console.log(snew);
  
    await axios.patch(`${userAPI}/${user}`, { cart: snew });
    
 
   

    console.log("Item successfully added to cart");
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
}