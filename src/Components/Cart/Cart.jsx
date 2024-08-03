import axios from "axios";
import { useEffect, useState } from "react";
import { userAPI } from "../API/API_URL";
import { Link,  } from "react-router-dom";
import { handleRemovecart } from "./Cartfunction";
import { Bounce, ToastContainer, toast } from 'react-toastify';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  

  useEffect(() => {
    async function displayCartItems() {
      try {
        const userId = localStorage.getItem("id");
        const res = await axios.get(`${userAPI}/${userId}`);
        const cartList = res.data.cart;
        setCartItems(Object.values(cartList));
      } catch (err) {
        console.log("Error in carts:", err);
      }
    }

    displayCartItems();
  }, []); // Empty dependency array to run only once on mount

  const handleRemove = async (item) => {
    try {
      await handleRemovecart(item);
      // After removing item, update the cart items
      const userId = localStorage.getItem("id");
      const res = await axios.get(`${userAPI}/${userId}`);
      const cartList = res.data.cart;
      setCartItems(Object.values(cartList));
      toast('🦄 Item successfully removed from cart!', {
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
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
   
      {cartItems.length > 0 ? (
        cartItems.map((e) => (
          <div key={e.id} className="shadow-lg p-4 rounded-md bg-white">
                  <ToastContainer/>
                  <Link  to={`/byProducts/${e.id}`}>
                  <img src={e.image_url} alt={e.name} className="w-full h-48 object-cover rounded-md" />
                  </Link>
    
            <div className="mt-2">
              <div className="flex justify-between">
                <span className="font-semibold">{e.name}</span>
                <span className="font-bold text-blue-500">{e.price}$</span>
              </div>
              <p className="mt-1 text-gray-600">{e.description}</p>
              <div className="">
                <span className="font-semibold">Sizes:{e.available_sizes.map((s, i) => (
                  <span key={i} className="ml-2 text-sm">{s}</span>
                ))}</span>
                <div className="flex">
                  <span className="font-semibold">Brand:</span>
                  <span className="font-bold m-1 text-sm">{e.brand}</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className={`font-semibold ${e.in_stock ? 'text-green-500' : 'text-red-500'}`}>
                    {e.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex justify-between mt-3">
                  <button
                    onClick={() => handleRemove(e)}
                    className="bg-blue-500 text-white p-2 rounded-lg"
                  >
                    Remove From Cart
                  </button>
                  {e.in_stock && (
                    <Link to={`/byProducts/${e.id}`}>
                      <button className="bg-blue-500 text-white p-2 rounded-lg">Buy Now</button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No cart items</div>
      )}
    </div>
  );
};

export default Cart;
