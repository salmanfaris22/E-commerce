import { useEffect, useState } from "react";
import axios from "axios";
import { ItemsAPI, } from "../API/API_URL";

import { handleAddCart } from "../Cart/Cartfunction";
import { ToastContainer } from "react-toastify";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Men = () => {
  const [mens, setMens] = useState([]);
  const [filter,setFilter]=useState(false)
   
  useEffect(() => {
    const fetchMenItems = async () => {
      try {
        const response = await axios.get(ItemsAPI);
        const menItems = response.data.filter(
          (item) => item.category === "Men"
        );
        setMens(menItems);
      } catch (error) {
        console.error("Error fetching men's items:", error);
      }
    };

    fetchMenItems();
  }, []);

const handlefilter = ()=>{
   setFilter(!filter)
}

 const handleShort =(data)=>{
     
      console.log(mens);
      setMens(mens.filter((e)=>e.brand=== data.target.name))
 }

  return (
    <div>
      <ToastContainer/>
      
      <div className="flex justify-between ml-5 mr-5">
      {
        filter && <div className="md:w-1/3 w-[300px] bg-white rounded-lg shadow-lg absolute h-[90vh] right-0 flex flex-col ">
          <div className="p-10 border w-[90%] m-auto h-[90%] border-black rounded-lg">
         <div>
               <div className="font-thin">Select Your Brand</div>

               <div className="flex font-semibold gap-5 mt-4 flex-col justify-start  ">
               <label className="w-[50%] justify-between flex">Adidas<input type="radio" className="ml-2" name="Adidas" onChange={handleShort}/></label>
               <label className="w-[50%] justify-between flex">Nike<input type="radio" className="ml-2" name="Nike"  onChange={handleShort}/></label>
               <label className="w-[50%] justify-between flex">Puma<input type="radio" className="ml-2" name="Puma"  onChange={handleShort}/></label>
               <label className="w-[50%] justify-between flex">Reebok<input type="radio" className="ml-2"  name="Reebok" onChange={handleShort}/></label>
               </div>

         </div>
       </div>
        
     </div>
      }
        <div className="text-3xl">Mens</div>
        <div className="flex gap-3 justify-center items-center text-2xl">Filter<FaFilter onClick={handlefilter}/>
     
        </div>
        
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {mens &&
          mens.map((item) => (
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
               <Link to={`/byProducts/${item.id}`}>
               <button className="w-full mt-2 border py-2 rounded-md transition duration-300">
                  Buy Now
                </button>
                </Link>
               
                <button
                  onClick={() => handleAddCart(item)}
                  className="w-full mt-2 border py-2 rounded-md transition duration-300"
                >
                  ADD to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Men;
