import { useEffect, useState } from "react";
import { ItemsAPI } from "../../API/API_URL";
import axios from "axios";

const Item = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(ItemsAPI)
      .then((res) => setItems(res.data))
      .catch((err) => console.log("error", err));
  }, []);

  return (
    <div >
         <h2 className="text-2xl font-bold mb-6 mt-5 text-start">Best Seller</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
             
             {items && items.map((item) => (
               <div key={item.id} className="relative h-[300px] p-4 bg-white shadow-md rounded-lg overflow-hidden group">
                 <img 
                   src={item.image_url} 
                   alt={item.name} 
                   className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:blur-sm"
                 />
                 <button className="absolute  inset-0 flex items-center justify-center text-white  bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   Go
                 </button>
               </div>
             ))}
           </div>
    </div>
  
  );
}

export default Item;
