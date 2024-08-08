import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { userAPI } from "../../../../Components/API/API_URL";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${userAPI}/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log("err", err));
  }, [id]);

  if (!user) {
    return <div className="text-center text-gray-600">Loading....</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Information</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg font-semibold">
              <strong>ID:</strong> {user.id}
            </p>
            <p className="text-lg font-semibold">
              <strong>First Name:</strong> {user.fname}
            </p>
            <p className="text-lg font-semibold">
              <strong>Last Name:</strong> {user.lname}
            </p>
            <p className="text-lg font-semibold">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-lg font-semibold">
              <strong>Admin:</strong> {user.admin ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Orders</h2>
      {user.orders ? (
        <div className="space-y-6">
          {Object.keys(user.orders).map((key) => {
            const order = user.orders[key];
            return (
              <div
                key={order.id}
                className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="flex items-center justify-center">
                  <img
                    src={order.image_url}
                    alt={order.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {order.name}
                  </p>
                  <p>
                    <strong>Price:</strong> ${order.price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {order.qty}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ${order.qtyPrice}
                  </p>
                  <p>
                    <strong>Payment Method:</strong> {order.paymentMethord}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div
                    className={`py-2 px-4 rounded-full text-white ${
                      order.status === "pending" ? "bg-black" :
                      order.status === "inTransist" ? "bg-yellow-400" :
                      order.status === "delivers" ? "bg-orange-500" :
                      order.status === "outForDelivery" ? "bg-green-600" :
                      order.status === "exchange" ? "bg-red-500" :
                      "bg-gray-500"
                    }`}
                  >
                    {order.status === "pending" ? "Pending" :
                     order.status === "inTransist" ? "In Transit" :
                     order.status === "delivers" ? "Delivered" :
                     order.status === "outForDelivery" ? "Out for Delivery" :
                     order.status === "exchange" ? "Exchange" :
                     "Cancelled"
                    }
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600">No orders found</p>
      )}
    </div>
  );
};

export default UserInfo;
