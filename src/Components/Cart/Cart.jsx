import axios from "axios"
import { useEffect, useState } from "react"
import { userAPI } from "../API/API_URL"


const Cart = () => {
  const [cartItem,setcartItem]=useState([])

  useEffect(()=>{
  async function displaycartIteam(){
    
    try{
        const userId = localStorage.getItem("id")
        const res = await axios.get(`${userAPI}/${userId}`)
        const cartList = res.data.cart;
        setcartItem(Object.values(cartList)) 
        console.log(cartItem);
    }catch(err){
      console.log("error inchart",err);
    }
   }
   displaycartIteam()
  },[])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cartItem.length > 0 ?  cartItem.map((e)=>{
      return (
        <div key={e.id} className=" shadow-lg p-4 rounded-md bg-white">
          <img src={e.image_url} alt="" className="w-full h-48 object-cover rounded-md" />
          <div className="mt-2">
             <div className="flex  justify-between">
             <span className="font-semibold">{e.name}</span>
             <span className="font-bold text-blue-500">{e.price}$</span>
             </div>
             <p className="mt-1 text-gray-600">{e.description}</p>
             <div className="">
              <span className="font-semibold">Sizes:{e.available_sizes.map((s,i)=>{
                return (
                  <span
                  key={i}
                  className="ml-2 text-sm"
                  >{s}</span>
                )
              })}</span>
               <div className="flex">
             <span className="font-semibold  ">Bradn:</span>
             <span className="font-bold m-1 text-sm ">{e.brand}</span>
             </div>
              <div className="mt-2 flex justify-between ">
                <span className={` font-semibold ${e.in_stock ? 'text-green-500' : 'text-red-500'}`}>
                  {e.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
                {e.in_stock && <button className="bg-blue-500 text-white p-2 rounded-lg">By Now</button>}
              </div>
             </div>
          </div>
        </div>
      )
    }):<div>nocartIteam</div>}</div>
  )
}

export default Cart