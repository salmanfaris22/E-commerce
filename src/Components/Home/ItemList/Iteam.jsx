import { useEffect, useState } from "react";
import { ItemsAPI } from "../../API/API_URL";
import axios from "axios";
import { Link } from "react-router-dom";

const Item = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(ItemsAPI)
      .then((res) => setItems(res.data))
      .catch((err) => console.log("error", err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 mt-5 text-start">Best Seller</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
        {items &&
          items.map((item) => (
            <div
              key={item.id}
              className="relative h-[450px] p-4 bg-white shadow-md rounded-lg overflow-hidden group"
            >
              
             
              
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full  object-cover h-[300px] rounded-md transition-transform duration-300 ease-in-out group-hover:blur-sm"
              />
             <Link to={`/byProducts/${item.id}`}>
             <button className="absolute  inset-0 flex items-center justify-center   bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex flex-col gap-3">
                  <div className="font-bold">{item.brand}</div>
                  <div className="text-white bg-black p-2 rounded-lg">
                    By Now
                  </div>
                </div>
              </button>
             </Link>
              <div className="flex flex-col mt-2">
                <div className="flex justify-between">
                <div className="font-bold">{item.brand}</div>
                <div className="text-blue-500">{item.price}$</div>
                
                </div>
                <div className="font-semibold text-stone-700">{item.category}</div>
                {item.special_offer==="None" ? "":<span className="font-semibold  relative  z-[6]   mt-2 rounded-lg bg-black text-white p-2">{item.special_offer}</span>}
                
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Item;
