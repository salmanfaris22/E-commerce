import { useEffect, useState } from "react";
import axios from "axios";
import { ItemsAPI, } from "../API/API_URL";
import IMg from "../../Assets/nikeMian.webp";
import { handleAddCart } from "../Cart/Cartfunction";

const Men = () => {
  const [mens, setMens] = useState([]);
  
   
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



 

  return (
    <div>
      <div className="h-[200px] grid place-items-center">
        <img src={IMg} alt="Nike" className="bg-cover h-[400px]" />
      </div>
      <div className="flex justify-between ml-5 mr-5">
        <div>Mens</div>
        <div>Filter</div>
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
                <button className="w-full mt-2 border py-2 rounded-md transition duration-300">
                  Buy Now
                </button>
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
