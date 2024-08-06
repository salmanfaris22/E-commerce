import axios from "axios";
import { useEffect, useState } from "react";
import { userAPI } from "../../../Components/API/API_URL";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(userAPI)
      .then((res) => setUsers(res.data.filter((e) => e.orders)))
      .catch((err) => console.log("err", err));
  }, []);

  return (
    <div className="min-h-screen ml-4 md:ml-[100px] py-6">
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-6 text-1xl place-items-center font-bold">
          <div>Product</div>
          <div>UserName</div>
          <div>Contact</div>
          <div>Loaction</div>
          <div>paymentMethod</div>
          <div>Order Status</div>
        </div>
        {users.map((user) => {
          return Object.values(user.orders).map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-white rounded-lg shadow-md place-items-center"
            >
              <div className="font-semibold text-lg text-gray-800"><img src={order.image_url} alt=""  className="h-[100px] w-[150px]"/>
              <div className="text-gray-600">OrderId:{order.id}</div>
              </div>
              <div className="text-gray-700">{order.userInfo.firstName}

                <div>user id:{order.userInfo.id}</div>
              </div>
              <div className="space-y-2">
                <div className="text-gray-700">{order.userInfo.phoneNumber}</div>
                <div className="text-gray-700">{order.userInfo.email}</div>
              </div>
              <div className="space-y-2">
                <div className="text-gray-700">{order.userInfo.street}</div>
                <div className="text-gray-700">{order.userInfo.address}</div>
                <div className="text-gray-700">{order.userInfo.state}</div>
              </div>
              <div className="text-gray-700">{order.userInfo.paymentMethod}</div>
              <div
                className={`w-[100px] h-[30px] rounded-full text-white flex justify-center items-center ${
                  order.status === "pending"
                    ? "bg-black"
                    : order.status === "inTransist"
                    ? "bg-yellow-400"
                    : order.status === "delivers"
                    ? "bg-orange-500"
                    : order.status === "outForDelivery"
                    ? "bg-green-600"
                    : order.status === "exchange"
                    ? "bg-red-500"
                    : "bg-gray-500"
                }`}
              >
                {order.status === "pending"
                  ? "Pending"
                  : order.status === "inTransist"
                  ? "In Transit"
                  : order.status === "delivers"
                  ? "Delivered"
                  : order.status === "outForDelivery"
                  ? "Out for Delivery"
                  : order.status === "exchange"
                  ? "Exchange"
                  : "Cancelled"}
              </div>
            </div>
          ));
        })}
      </div>
    </div>
  );
};

export default Home;
