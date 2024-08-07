import axios from "axios";
import { useEffect, useState } from "react";
import { userAPI } from "../../API/API_URL";
import { CancelOrder } from "../AddPayment";
import { ToastContainer, toast } from "react-toastify";

const TrackOrder = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    async function displayCartItems() {
      try {
        const userId = localStorage.getItem("id");
        const res = await axios.get(`${userAPI}/${userId}`);
        const cartList = res.data.orders;
        setCartItems(Object.values(cartList));
      } catch (err) {
        console.log("Error in carts:", err);
      }
    }

    displayCartItems();
  }, []);
  async function handleRemoveOrder(id) {
    console.log("ss", id);
    try {
      await CancelOrder(id);
      const user = localStorage.getItem("id");
      const res = await axios.get(`${userAPI}/${user}`);
      const Chart = res.data.orders;
      setCartItems(Object.values(Chart));
      toast.success("cancel order sunccfully");
    } catch (err) {
      console.log("errr");
    }
  }
  return (
    <div className="h-[100vh] mt-2">
      <ToastContainer />
{console.log("hey", cartItems)}
      {cartItems.length >= 1 ? (
        cartItems.map((e) => {
          return (
            <div
              key={e.id}
              className="grid grid-cols-3 max-w-[1300px] m-auto  p-2 shadow rounded-lg"
            >
              <div className="col-span-1">
                <img
                  src={e.image_url}
                  alt={e.image_url}
                  className="h-[200px] w-[300px] p-4"
                />
              </div>
              <div className="col-span-2 p-4 flex justify-around flex-col bg-white">
                <div className="flex justify-between">
                  <div>
                    <span className="font-semibold"> Brand:</span>

                    <span className="text-blue-500">{e.brand}</span>
                  </div>
                  <div>
                    <span className=" font-semibold"> Totole Prize:</span>
                    <span className="text-blue-500"> {e.qtyPrice}$</span>
                  </div>
                </div>
                <div className="md:flex justify-between">
                  <div>
                    <span className="font-semibold"> Category: </span>
                    <span className="text-blue-500"> {e.category}</span>
                  </div>

                  <div>
                    Warranty:
                    <span className="text-red-500"> {e.warranty}</span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col md:flex-row  justify-between">
                    <div className="flex md:gap-10 flex-col md:flex-row  ">
                      <div>
                        <span className=" font-semibold"> Qty:</span>
                        <span className="text-blue-500">{e.qty}</span>
                      </div>
                      <div>
                        <span className="font-semibold"> Size: </span>
                        <span className="text-blue-500"> {e.size}</span>
                        
                      </div>
                      <div>
                        <span className=" font-semibold"> Payment Method:</span>
                        <span className="text-blue-500">
                          {" "}
                          {e.paymentMethord}
                        </span>
                        
                      </div>
                    </div>
                   <div className="flex gap-2 flex-col">
                   <button
                      onClick={() => handleRemoveOrder(e)}
                      className="text-white bg-blue-500 p-2 mt-4 rounded-lg "
                    >
                      Cancel Order
                    </button>
                    <button     className={`w-[150px] h-[30px] text-white rounded-lg ${
                 e.status === "pending"
                   ? "bg-black"
                   : e.status === "inTransist"
                   ? "bg-yellow-400"
                   : e.status === "delivers"
                   ? "bg-orange-500"
                   : e.status === "outForDelivery"
                   ? "bg-green-600"
                   : e.status === "exchange"
                   ? "bg-red-500"
                   : "bg-blue-500"
               }`}>{e.status}</button>
                   </div>
                  </div>
                </div>
                {/* {order && (
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-md w-80">
                      <h2 className="text-xl font-semibold mb-4">
                        Cancle Order
                      </h2>
                      <p className="mb-4">
                        Are you sure you want to Cancle Order?
                      </p>
                      <div className="flex justify-end">
                        <button
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                          onClick={() => setOrder(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => handleRemoveOrder(e)}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  </div>
                )} */}
              </div>
            </div>
          );
        })
      ) : (
        <div className="h-screen flex justify-center items-center">
          Not Order available <br /> Pleas Order ........!
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
