import axios from "axios";
import { memo, useContext, useEffect, useState } from "react";
import { userAPI } from "../../../Components/API/API_URL";
import { OrderStatus } from "../Product/buttonFunction/CheckOrderStatus";
import { Color } from "../../../App";

const Home = () => { 
  const color=useContext(Color)
  const [users, setUsers] = useState([]);
  const [status,SetStaus]=useState([])
  const [openStatus,setOpenStatus]=useState(false)
   
  useEffect(() => {
    axios
      .get(userAPI)
      .then((res) => setUsers(res.data.filter((e) => e.orders)))
      .catch((err) => console.log("err", err));
  }, []);

function handleOpenStatus(e,a){
  SetStaus({e,a})
  setOpenStatus((pre)=>!pre)
}  
 async function handleStatus (e){
 
  await  OrderStatus(status,e)
  setOpenStatus(false)

   axios
  .get(userAPI)
  .then((res) => setUsers(res.data.filter((e) => e.orders)))
  .catch((err) => console.log("err", err));

}

  return (
   <div
   style={{background:color.color.main,color:color.color.primery}}
   >
     <div className="min-h-screen ml-4 md:ml-[100px] py-6"

    >
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
              style={{background:color.color.secondry,color:color.color.primery}}
              className="grid grid-cols-1 md:grid-cols-6 transition-transform hover:scale-105 transform gap-4 p-4 bg-white rounded-lg shadow-md place-items-center"
            >
              <div className="font-semibold text-lg text-gray-800"><img src={order.image_url} alt=""  className="h-[100px] w-[150px]"/>
             
              </div>
              <div className="text-gray-700"
                 style={{background:color.color.secondry,color:color.color.primery}}
              >{order.userInfo.firstName}

              
              </div>
              <div className="space-y-2">
                <div className="text-gray-700"
                 style={{background:color.color.secondry,color:color.color.primery}}
                >{order.userInfo.phoneNumber}</div>
                <div className="text-gray-700"
                 style={{background:color.color.secondry,color:color.color.primery}}
                >{order.userInfo.email}</div>
              </div>
              <div className="space-y-2">
                <div className="text-gray-700"
                 style={{background:color.color.secondry,color:color.color.primery}}
                >{order.userInfo.street}</div>
                <div className="text-gray-700"
                 style={{background:color.color.secondry,color:color.color.primery}}
                >{order.userInfo.address}</div>
                <div className="text-gray-700"
                 style={{background:color.color.secondry,color:color.color.primery}}
                >{order.userInfo.state}</div>
              </div>
              <div className="text-gray-700"
               style={{background:color.color.secondry,color:color.color.primery}}
              >{order.userInfo.paymentMethod}</div>
              <button
                onClick={()=>handleOpenStatus(user.id,order.id)}
                style={{color:color.color.primery}}
                className={`w-[150px] h-[30px] transition-transform hover:scale-105  rounded-full text-white flex justify-center items-center ${
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
              </button>
              <div  className="col-span-5 hover:scale-105 transition-transform transform rounded-lg text-[12px] flex bg-gray-400 text-white p-1 justify-between w-[100%]">
                <div >Order Id:{order.id}</div>
                <div>User Id:{order.userId}</div>
                <div>Prize:{order.price}$</div>
                <div>qty:{order.qty}</div>
                <div>total{order.qtyPrice}$</div>
                <div>Date:{order.date}</div>
                </div>



                
            </div>
          ));
        })}
      </div>
      {openStatus &&
       <div className=" fixed top-0 h-[100vh] w-[100vw] flex justify-center items-center left-0 bg-black bg-opacity-40">
      
       <div className=" h-[400px] w-[400px] bg-white rounded-lg p-3 shadow-md flex justify-center items-center gap-4 flex-col">

           {["pending","inTransist","delivers","outForDelivery","exchange","Cancelled"].map((e,i)=>{
             return(
              <div key={i}>
     
                <button   onClick={()=>handleStatus(e)}  className={`w-[150px] h-[30px] transition-transform hover:scale-105  rounded-full text-white flex justify-center items-center ${
                 e === "pending"
                   ? "bg-black"
                   : e === "inTransist"
                   ? "bg-yellow-400"
                   : e === "delivers"
                   ? "bg-orange-500"
                   : e === "outForDelivery"
                   ? "bg-green-600"
                   : e === "exchange"
                   ? "bg-red-500"
                   : "bg-blue-500"
               }`}>{e}</button>
              </div>
             )
           })}
       </div>
     </div>
      }
     
    </div>
   </div>
  );
};

export default memo(Home);
