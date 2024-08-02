import axios from "axios"
import { useEffect, useState } from "react"
import { ItemsAPI, userAPI } from "../API/API_URL"


const Women = () => {
  const [women, setWomen] =useState([])

  useEffect(()=>{
    const fetchWomenItems = async ()=>{
       try{
        const res = await axios.get(ItemsAPI)
        const womenItem = res.data.filter((e)=>e.category=="Women")
        setWomen(womenItem)
        
       }catch(err){
        console.log(err,"women place");
       }
    }
    fetchWomenItems()
  },[])


  const handleAddCart = async(iteam)=>{
    try{
        const user = localStorage.getItem("id")
        const res = await axios.get(`${userAPI}/${user}`)
        const currentCart = res.data.cart

        const updatedCart = {
          ...currentCart,
          [iteam.id]:iteam
        }
      

        await axios.patch(`${userAPI}/${user}`,{cart:updatedCart})

        console.log("done");

    }catch(err){
      console.log("women add cart",err);
    }
  }

  return (
    <div>
      <div className="h-[200px] grid place-items-center">
        <img src={""} alt="Nike" className="bg-cover h-[400px]" />
      </div>
      <div className="flex justify-between ml-5 mr-5">
        <div>Mens</div>
        <div>Filter</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {women &&
          women.map((item) => (
            <div key={item.id} className="shadow-lg p-4 rounded-md bg-white">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-blue-500 font-bold">{item.price}$</span>
                </div>
                <button className="w-full mt-2 border py-2 rounded-md transition duration-300">
                  Buy Now
                </button>
                <button
            
                  className="w-full mt-2 border py-2 rounded-md transition duration-300"
                  onClick={()=>handleAddCart(item)}
                >
                  ADD to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Women
