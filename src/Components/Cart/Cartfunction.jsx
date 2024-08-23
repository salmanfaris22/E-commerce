import axios from "axios";
import { userAPI } from "../API/API_URL";
import { Bounce, toast } from "react-toastify";
// eslint-disable-next-line react-refresh/only-export-components
export const handleAddCart = async (item) => {
  
  const user = localStorage.getItem("id");
  if (user) {
    try {
      await TotelCart()
      const response = await axios.get(`${userAPI}/${user}`);
      const currentCart = response.data.cart;

      if(currentCart){
        const  dupilcate = Object.values(currentCart).filter((e)=>e.id===item.id)
        if(dupilcate.length!==0){
          toast.warning("alredy in cart")
        }else{
          const updatedCart = {
            ...currentCart,
            [item.id]: item,

          };

  
  
        await axios.patch(`${userAPI}/${user}`, { cart: updatedCart });
  
        toast("🦄 Item successfully added to cart!", {
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
      }
      }else{
        const updatedCart = {
          ...currentCart,
          [item.id]: item,

        };



      await axios.patch(`${userAPI}/${user}`, { cart: updatedCart });

      toast("🦄 Item successfully added to cart!", {
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
      }
     

     
  
      
    } catch (error) {
      toast.warning("Something went Wrong");
      console.error("Error adding to cart:", error);
    }
  } else {
    toast.warning("pleas Logine");
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const handleRemovecart = async (item) => {
  TotelCart()
  try {
    const user = localStorage.getItem("id");

    const response = await axios.get(`${userAPI}/${user}`);
    const currentCart = response.data.cart;

    // eslint-disable-next-line no-unused-vars
    const { [item.id]: Remove, ...snew } = currentCart;

    await axios.patch(`${userAPI}/${user}`, { cart: snew });

    console.log("Item successfully added to cart");
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

export async function TotelCart(){
  const user = localStorage.getItem("id");

  const response = await axios.get(`${userAPI}/${user}`);
  const currentCart = response.data.cart;

  return Object.keys(currentCart).length
}

export async function ByFronCart(from,item){
  TotelCart()
  const user =localStorage.getItem("id")
    if(user){
      
       try{
        const date = new Date();
       const set =  item.map((e)=>{
          return e={
            ...e,
            "userInfo":from,
            "status":"pending",
            "userId": user,
          "date": date
          }
        })
        await console.log(set);
        const res = await axios.get(`${userAPI}/${user}`)
        const  GetOrders = res.data.orders
        const updateOrder = {
            ...GetOrders,
            ...set
         }

        
        axios.patch(`${userAPI}/${user}`,{orders:updateOrder})
        console.log("this is iteamn",item);
        toast.success("Thanks For Ordering");
       }catch(err){
        console.log("ordder time err",err);
       }
    }else{
        toast.warning("Pleas Logine");
    }
}