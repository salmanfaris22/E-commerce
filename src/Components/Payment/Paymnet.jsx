import axios from "axios";
import { useEffect, useState } from "react";
import { ItemsAPI } from "../API/API_URL";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { PaymentAdd } from "./AddPayment";

const Payment = () => {
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState(false);
  const [size,getSize]=useState(0)
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
  const [errors, setErrors] = useState({});

  const { id } = useParams();

  useEffect(() => {
    async function fetchItem() {
      const res = await axios.get(`${ItemsAPI}/${id}`);
      setItem(res.data);
      setPrice(res.data.price);
     
  
    }
    fetchItem();
  }, [id]);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
    setPrice((prev) => prev + item.price);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      setPrice((prev) => prev - item.price);
    } else {
      toast.warn("Minimum quantity is 1");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName) newErrors.firstName = "First Name is required";
    if (!form.lastName) newErrors.lastName = "Last Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.street) newErrors.street = "Street is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setOrder(true);
    } else {
      setErrors(newErrors);
    }
  };
  const handelOrder = (id) => {
    setOrder(false);
  
    PaymentAdd(id,quantity,price,form.paymentMethod,size);
  };
  return (
    <div className="container mx-auto p-4 w-[100vw] grid md:grid-cols-2">
      {order && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-xl font-semibold mb-4">Confirm Order</h2>
            <p className="mb-4">Are you sure you want to place this order?</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={() => setOrder(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handelOrder(item)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <ToastContainer />
        <div className="p-8 rounded-lg  gap-8 mx-auto mt-4">
          <div className="flex justify-center">
            <img
              src={item.image_url}
              alt={item.description}
              className="rounded-lg h-[300px] object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-zinc-500 font-semibold">{item.category}</p>
            <h2 className="font-bold text-3xl">{item.brand}</h2>
            <p className="font-semibold text-2xl text-zinc-500">
              {item.description}
            </p>
            <div className="p-3 mt-7">
              <span className="font-semibold">Sizes:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {item.available_sizes ? (
                  item.available_sizes.map((size, index) => (
                    <span
                      className="rounded-lg p-2 shadow-sm text-blue-500 border border-blue-500"
                      key={index}
                    >
                      {size}
                    </span>
                  ))
                ) : (
                  <div>No sizes available</div>
                )}
              </div>
              <div className="mt-6 flex justify-between items-center">
                <span className="font-bold text-2xl p-2 rounded-lg shadow-md">
                  ${price.toFixed(2)}
                </span>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:p-8 pt-7 pb-7 p-3 rounded-lg shadow-lg  flex flex-col gap-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-between">
            <div className="w-1/2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleInputChange}
                className="rounded-lg p-2 w-full border"
              />
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName}</span>
              )}
            </div>
            <div className="w-1/2 ml-1">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleInputChange}
                className="rounded-lg p-2 w-full border"
              />
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName}</span>
              )}
            </div>
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInputChange}
              className="ml-1 rounded-lg p-2 w-full border"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
          </div>
          <div>
            <input
              type="number"
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleInputChange}
              className="ml-1 rounded-lg p-2 w-full border"
            />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber}</span>
            )}
          </div>
          <div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleInputChange}
              className="ml-1 rounded-lg p-2 w-full border"
            />
            {errors.address && (
              <span className="text-red-500">{errors.address}</span>
            )}
          </div>
          <div>
            <input
              type="text"
              name="street"
              placeholder="Street"
              value={form.street}
              onChange={handleInputChange}
              className="ml-1 rounded-lg p-2 w-full border"
            />
            {errors.street && (
              <span className="text-red-500">{errors.street}</span>
            )}
          </div>
          <div className="flex gap-3 items-center ">
            <label>Select Country:</label>
            <select
              name="country"
              value={form.country}
              onChange={handleInputChange}
              className="p-1 shadow-sm rounded-lg"
            >
              <option value="india">India</option>
              <option value="japan">Japan</option>
              <option value="america">America</option>
            </select>
            <label>Select State:</label>
            <select
              name="state"
              value={form.state}
              onChange={handleInputChange}
              className="p-1 shadow-sm rounded-lg"
            >
              <option value="kerala">Kerala</option>
              <option value="tamilnadu">Tamil Nadu</option>
              <option value="karnataka">Karnataka</option>
            </select>
          </div>
          <div className="mt-4 ">
            <label>Payment Method:</label>
            <div className="flex gap-4 flex-wrap">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={form.paymentMethod === "creditCard"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Credit Card
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cashOnPay"
                  checked={form.paymentMethod === "cashOnPay"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
               cashOnPay
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="debitCard"
                  checked={form.paymentMethod === "debitCard"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Debit Card
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={form.paymentMethod === "upi"}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                UPI
              </label>
            </div>
          </div>
          <div className="flex gap-3 items-center p-2 rounded-lg shadow-md">
                Set Quy :  <div
                type="btn"
                    className="p-2 bg-blue-500 text-white rounded-lg"
                    onClick={incrementQuantity}
                  >
                    +
                  </div>
                  <span>{quantity}</span>
                  <div
                    className="p-2 bg-blue-500 text-white rounded-lg"
                    onClick={decrementQuantity}
                  >
                    -
                  </div> <span className="font-bold text-2xl p-2 rounded-lg shadow-md">
                  ${price.toFixed(2)}
                </span>

                <div className="flex gap-3 items-center">
                 <span className=" font-semibold"> Select Sizes :</span>
                 {item.available_sizes ? (
                  item.available_sizes.map((size, index) => (
                    <label className="ml-3" key={index}>
                           {size}

                        <input onClick={()=>getSize(size)} type="radio" className="ml-1" name="size" />
                       
                 
       
                    </label>
                  ))
                ) : (
                  <div>No sizes available</div>
                )}
                </div>
                </div>
          <div className="mt-8">
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg shadow-lg w-full"
            >
              Submit Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
