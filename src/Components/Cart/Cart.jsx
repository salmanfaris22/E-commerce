import axios from "axios";
import { useEffect, useState } from "react";
import { userAPI } from "../API/API_URL";
import { Link } from "react-router-dom";
import { ByFronCart, handleRemovecart } from "./Cartfunction";
import { Bounce, ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [by, setBy] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    street: "",
    country: "india",
    state: "kerala",
    paymentMethod: "creditCard",
  });

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
  }, []);

  const handleRemove = async (item) => {
    try {
      await handleRemovecart(item);
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

  const handleSizeSelect = (itemId, size) => {
    setSelectedSize((prevState) => ({
      ...prevState,
      [itemId]: size,
    }));
  };

  const handleAddBy = (item) => {
    const size = selectedSize[item.id];
    if (!size) {
      toast('Please select a size before adding to cart.', {
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
      return;
    }

    const existingItem = by.find((byItem) => byItem.id === item.id && byItem.size === size);
    if (existingItem) {
      setBy(by.map((byItem) =>
        byItem.id === item.id && byItem.size === size
          ? { ...byItem, qty: byItem.qty + 1 }
          : byItem
      ));
    } else {
      setBy([...by, { ...item, qty: 1, size: size }]);
    }
  };

  const handlePlus = (item) => {
    setBy(by.map((byItem) =>
      byItem.id === item.id && byItem.size === item.size
        ? { ...byItem, qty: byItem.qty + 1 }
        : byItem
    ));
  };

  const handleMinus = (item) => {
    setBy(by.map((byItem) =>
      byItem.id === item.id && byItem.size === item.size && byItem.qty > 1
        ? { ...byItem, qty: byItem.qty - 1 }
        : byItem
    ));
  };

  const handleRemoveFromBy = (itemId, size) => {
    setBy(by.filter(byItem => !(byItem.id === itemId && byItem.seze === size)));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
  
    setShowForm(false);
    await ByFronCart(form,by)
  };

  const totalPrice = by.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      
      {/* Cart Items Section */}
      <div className="p-4 rounded-md shadow-md">
        <div className="grid gap-4">
          {cartItems.length > 0 ? (
            cartItems.map((e) => (
              <div key={e.id} className="shadow-lg p-4 flex gap-4 rounded-md bg-white">
                <ToastContainer />
                <Link to={`/byProducts/${e.id}`}>
                  <img src={e.image_url} alt={e.name} className="w-full h-48 object-cover rounded-md" />
                </Link>
                <div className="mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">{e.name}</span>
                    <span className="font-bold text-blue-500">{e.price}$</span>
                  </div>
                  <p className="mt-1 text-gray-600">{e.description}</p>
                  <div className="mt-2 flex flex-col">
                    <span className="font-semibold">
                      Sizes: {e.available_sizes.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleSizeSelect(e.id, s)}
                          className={`ml-2 text-sm px-2 py-1 rounded-md ${
                            selectedSize[e.id] === s ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </span>
                    <div className="flex">
                      <span className="font-semibold">Brand:</span>
                      <span className="font-bold m-1 text-sm">{e.brand}</span>
                    </div>
                    <span className={`font-semibold mt-2 ${e.in_stock ? 'text-green-500' : 'text-red-500'}`}>
                      {e.in_stock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <div className="flex justify-between gap-1 mt-3">
                      <button
                        onClick={() => handleRemove(e)}
                        className="bg-blue-500 text-white p-2 rounded-lg"
                      >
                        Remove From Cart
                      </button>
                      {e.in_stock && (
                        <div className="flex gap-1">
                          <Link to={`/byProducts/${e.id}`}>
                            <button className="bg-blue-500 text-white p-2 rounded-lg">Buy Now</button>
                          </Link>
                          <button onClick={() => handleAddBy(e)} className="bg-blue-500 text-white p-2 rounded-lg">
                            Add To By
                          </button>
                        </div>
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
      </div>

      {/* Total By Section */}
      <div className="p-4 border rounded-md shadow-md">
        {by.length > 0 && (
          <div className="flex flex-col gap-2">
            {by.map((e, i) => (
              <div key={i} className="grid grid-cols-2 shadow-lg rounded-lg p-2">
                <img src={e.image_url} alt={e.name} className="h-[100px] w-[130px]" />
                <div className="flex flex-col gap-2 justify-center">
                  <div className="flex justify-center items-center gap-3">
                    <button className="bg-blue-500 text-white p-1 rounded-lg w-[30px]" onClick={() => handlePlus(e)}>+</button>
                    <div>{e.qty} x {e.price}$ = {e.qty * e.price}$</div>
                    <button className="bg-blue-500 text-white p-1 rounded-lg w-[30px]" onClick={() => handleMinus(e)}>-</button>
                  </div>
                  <div className="text-sm text-gray-600">Size: {e.selectedSize}</div>
                  <button onClick={() => handleRemoveFromBy(e.id, e.selectedSize)} className="bg-red-500 text-white p-1 rounded-lg mt-2">
                    Remove from Buy
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right font-bold text-lg">Total: {totalPrice}$</div>
            <button onClick={() => setShowForm(true)} className="bg-blue-500 text-white p-2 rounded-lg mt-4">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      {/* Checkout Form Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Checkout</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleFormChange}
                  placeholder="First Name"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleFormChange}
                  placeholder="Last Name"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="Email"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleFormChange}
                  placeholder="Phone Number"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleFormChange}
                  placeholder="Address"
                  className="p-2 border border-gray-300 rounded"
                  required
                />
                <input
                  type="text"
                  name="street"
                  value={form.street}
                  onChange={handleFormChange}
                  placeholder="Street"
                  className="p-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleFormChange}
                  placeholder="Country"
                  className="p-2 border border-gray-300 rounded"
                  disabled
                />
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleFormChange}
                  placeholder="State"
                  className="p-2 border border-gray-300 rounded"
                  disabled
                />
                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleFormChange}
                  className="p-2 border border-gray-300 rounded col-span-2"
                >
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bankTransfer">Bank Transfer</option>
                </select>
              </div>
              <div className="text-right font-bold text-lg mb-4">Total: {totalPrice}$</div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white p-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
