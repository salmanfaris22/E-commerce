import axios from "axios";
import { useState } from "react";
import { userAPI } from "../../../Components/API/API_URL";

const Home = () => {
  const [users, setUsers] = useState([]);

  useState(() => {
    axios
      .get(userAPI)
      .then((res) => setUsers(res.data.filter((e) => e.orders)))

      .catch((res) => res);
  }, []);

  return (
    <div className="min-h-[100vh] ml-[100px]">
      <div>
        {users.map((e) => {
          return Object.values(e.orders).map((e) => {
            return (
              <div key={e.id} className="grid grid-cols-6">{console.log(e)}
                <div>{e.name}</div>
                <div>{e.userInfo.firstName}</div>
                <div>
                  <div>{e.userInfo.phoneNumber}</div>
                  <div>{e.userInfo.email}</div>
                </div>
                <div>
                <div>{e.userInfo.street}</div>
                  <div>{e.userInfo.address}</div>
                  <div>{e.userInfo.state}</div>
                 
                </div>
                <div>{e.userInfo.paymentMethod}</div>
              
                <div
                    className={` rounded-full text-white w-[50px] h-[10px] flex ${
                      e.status === "pending" ? "bg-black" :
                      e.status === "inTransist" ? "bg-yellow-400" :
                      e.status === "delivers" ? "bg-orange-500" :
                      e.status === "outForDelivery" ? "bg-green-600" :
                      e.status === "exchange" ? "bg-red-500" :
                      "bg-gray-500"
                    }`}
                  >
                    {e.status === "pending" ? "Pending" :
                     e.status === "inTransist" ? "In Transit" :
                     e.status === "delivers" ? "Delivered" :
                     e.status === "outForDelivery" ? "Out for Delivery" :
                     e.status === "exchange" ? "Exchange" :
                     "Cancelled"
                    }
                  </div>

             
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default Home;
