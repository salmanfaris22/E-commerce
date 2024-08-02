import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userAPI } from '../API/API_URL';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = localStorage.getItem('id');
        const response = await axios.get(`${userAPI}/${userId}`);
        const cartData = response.data.cart;
        setCartItems(Object.values(cartData)); // Convert cart object to array
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
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
                <p className="mt-1 text-gray-600">{item.description}</p>
                <div className="mt-2">
                  <span className="font-semibold">Sizes:</span>
                  {item.available_sizes.map((size) => (
                    <span key={size} className="ml-2 text-sm">
                      {size}
                    </span>
                  ))}
                </div>
                <div className="mt-2">
                  <span className="font-semibold">Brand:</span>
                  <span className="ml-2 text-sm">{item.brand}</span>
                </div>
                <div className="mt-2">
                  <span className={`font-semibold ${item.in_stock ? 'text-green-500' : 'text-red-500'}`}>
                    {item.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
