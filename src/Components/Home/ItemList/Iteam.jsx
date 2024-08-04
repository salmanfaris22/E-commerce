import { useEffect, useState } from "react";
import { ItemsAPI } from "../../API/API_URL";
import axios from "axios";
import { Link } from "react-router-dom";

const Item = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${ItemsAPI}?_limit=12`)
      .then((res) => setItems(res.data))
      .catch((err) => console.log("error", err));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-4xl font-extrabold mb-8 mt-5 text-center text-blue-600">Best Seller</h2>
      <div data-aos="zoom-in-up" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-2 w-full max-w-screen-xl ">
        {items &&
          items.map((item) => (
            <div
    data-aos="zoom-in-up"
              key={item.id}
              className="relative h-[400px] p-4 bg-white shadow-md rounded-lg overflow-hidden group transition duration-300 ease-in-out transform hover:scale-105"
            >
              {item.special_offer !== "None" && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg z-10">
                  {item.special_offer}
                </div>
              )}
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full object-cover h-[300px] rounded-md transition-transform duration-300 ease-in-out group-hover:blur-sm"
              />
              <Link to={`/byProducts/${item.id}`}>
                <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-lg font-semibold bg-blue-600 py-2 px-4 rounded-lg">
                    Buy Now
                  </div>
                </button>
              </Link>
              <div className="flex flex-col mt-2">
                <div className="flex justify-between items-center">
                  <div className="font-bold text-gray-800">{item.brand}</div>
                  <div className="text-blue-500 font-semibold">{item.price}$</div>
                </div>
                <div className="text-gray-600 font-medium">{item.category}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Item;
