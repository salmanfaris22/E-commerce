import axios from "axios"
import { useEffect, useState } from "react"
import { userAPI } from "../../API/API_URL"
import { CancelOrder } from "../AddPayment";
import {  ToastContainer, toast } from 'react-toastify';

const TrackOrder = () => {
    const [cartItems, setCartItems] = useState([]);
    const [order,setOrder]=useState(false)
 

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
    async function handleRemoveOrder(id){
        setOrder(false)
        try{
            await CancelOrder(id)
            const user = localStorage.getItem("id")
            const res= await axios.get(`${userAPI}/${user}`)
            const Chart = res.data.orders
            setCartItems(Object.values(Chart));
            toast.success("cancel order sunccfully")

        }catch(err){
            console.log("errr");
        }
  }
  return (
    <div className="h-[100vh] ">
        <ToastContainer/>
       
        {
        cartItems.length>=1 ?(  
            cartItems.map((e)=>{
                        return (
                            <div key={e.id} className="grid grid-cols-3 h-[250px] p-2 shadow rounded-lg">
                                <div className="col-span-1">
                                    <img src={e.image_url} alt={e.image_url}  className="h-[200px] w-[300px] p-4"/>
                                </div>
                                <div className="col-span-2 p-4 flex justify-around flex-col">
                                    <div className="">
                                    <span className="font-semibold">  Brand:</span>

                                    <span className="text-blue-500">{e.brand}</span>
                                    </div>
                                    <div className="md:flex justify-between">
                                        <div>
                                        <span className="font-semibold">   Category: </span>
                                        <span className="text-blue-500"> {e.category}</span>
                                       
                                        </div>
                                   
                                    <div>
                                    Warranty:  {e.warranty}
                                    </div>
                                    </div>
                                    <div>
                                    Description:  {e.description}

                                    <div>
                                        <button onClick={()=>setOrder(true)} className="text-white bg-blue-500 p-2 mt-4 rounded-lg">
                                            Cancel Order
                                        </button>
                                    </div>
                                    </div>
                                    {order && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-xl font-semibold mb-4">Cancle Order</h2>
            <p className="mb-4">Are you sure you want to Cancle Order?</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={() => setOrder(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={()=>handleRemoveOrder(e)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
                                </div>
                            </div>
                        )
                    })
         ):(<div className="h-screen flex justify-center items-center">Not Order available <br/> Pleas Order ........!</div>)
        }</div>
  )
}

export default TrackOrder