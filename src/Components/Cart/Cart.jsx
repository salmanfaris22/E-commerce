import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userAPI } from "../API/API_URL";
import { Link } from "react-router-dom";
import { handleRemovecart,  } from "./Cartfunction"; // Import PaymentAdd
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { PaymentAdd } from "../Payment/AddPayment";
import { CArtss } from "../../App";

const Cart = () => {
  // const [cartItems, setCartItems] = useState([]);
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
  const {cartItems,setCartItems}=useContext(CArtss)
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

    const existingItem = by.find((byItem) => byItem.id === item.id && byItem.selectedSize === size);
    if (existingItem) {
      setBy(by.map((byItem) =>
        byItem.id === item.id && byItem.selectedSize === size
          ? { ...byItem, quantity: byItem.quantity + 1 }
          : byItem
      ));
    } else {
      setBy([...by, { ...item, quantity: 1, selectedSize: size }]);
    }
  };

  const handleQuantityChange = (itemId, delta) => {
    setBy(by.map((byItem) =>
      byItem.id === itemId
        ? { ...byItem, quantity: Math.max(byItem.quantity + delta, 1) }
        : byItem
    ));
  };

  const handleRemoveFromBy = (itemId, size) => {
    setBy(by.filter(byItem => !(byItem.id === itemId && byItem.selectedSize === size)));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const item of by) {
        await PaymentAdd(item, item.quantity, item.quantity * item.price, form.paymentMethod, item.selectedSize, form);
        if(localStorage.getItem("id")){
          toast.success("Thanks For Ordering");
           const user = localStorage.getItem("id")
          await axios.patch(`${userAPI}/${user}`, { cart: "" });
  
            try {
              const userId = localStorage.getItem("id");
              const res = await axios.get(`${userAPI}/${userId}`);
              const cartList = res.data.cart;
              setCartItems(Object.values(cartList));
            } catch (err) {
              console.log("Error in carts:", err);
            }
          
      
     
        }
      }
      setBy([]);
      setForm({
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
      toast.success('Order placed successfully!', {
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
      setShowForm(false); // Close the form modal
    } catch (err) {
      console.error("Error during order submission:", err);
      toast.error('Error placing the order. Please try again.', {
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
    }
  };

  const totalPrice = by.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-[100vh] grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
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

      {/* Order Summary Section */}
      <div className="p-4 border rounded-md shadow-md">
        {by.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="mt-4">
              {by.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <span className="font-semibold">{item.name}</span> - Size: {item.selectedSize} - Quantity: {item.quantity}
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveFromBy(item.id, item.selectedSize)}
                      className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center font-bold">
              <span>Total Price:</span>
              <span>{totalPrice}$</span>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Checkout
            </button>
          </div>
        )}
      </div>

      {/* Payment Form Section */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md shadow-lg w-96">
            <h2 className="text-xl font-semibold">Payment Information</h2>
            <form onSubmit={handleFormSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block font-medium">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Phone Number:</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Street:</label>
                <input
                  type="text"
                  name="street"
                  value={form.street}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Country:</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="india">India</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">State:</label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="kerala">Kerala</option>
                </select>
              </div>
              <div>
                <label className="block font-medium">Payment Method:</label>
                <select
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="creditCard">Credit Card</option>
                </select>
              </div>
              <div className="flex justify-between items-center mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
