import axios from "axios";
import { useEffect, useState } from "react";
import { ItemsAPI } from "../API/API_URL";
import { useParams } from "react-router";
import { FaHeartBroken } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { handleAddCart } from "../Cart/Cartfunction";
import { Bounce, ToastContainer, toast } from 'react-toastify';
const ByProducts = () => {
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [whish,setWhish] =useState(true)
  const { id } = useParams();

  useEffect(() => {
    async function fetchItem() {
      const res = await axios.get(`${ItemsAPI}/${id}`);
      setItem(res.data);
      setPrice(res.data.price);
      console.log(res.data);
    }
    fetchItem();
  }, [id]);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
    setPrice(prev => prev + item.price);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      setPrice(prev => prev - item.price);
    } else {
      toast.warn("Minimum quantity is 1");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer/>
      <div className="md:w-[70vw] p-8 rounded-lg shadow-lg grid md:grid-cols-2 gap-8 mx-auto mt-4">
        
        <div className="flex justify-center">
          <img
            src={item.image_url}
            alt={item.description}
            className="rounded-lg min-h-[300px] object-cover max-h-[500px]"
          />
        </div>
        <div className="flex flex-col justify-center">
<div className="flex justify-end text-3xl text-red-500">
    {whish ?<FaHeartBroken onClick={()=>{setWhish(!whish)

toast('🤞🏻 Item successfully whish list !', {
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
    }}/>:<FaHeart onClick={()=>{setWhish(!whish)
      
    }}/>}

</div>
<div className="flex justify-between">
         <p className="text-zinc-500 font-semibold mt-1">{item.category}</p>
         <h2 className="font-bold text-2]1xl mt-2">{item.brand}</h2>
         </div>
          <h2 className=" font-semibold flex gap-3 text-red-500 mt-2">{item.special_offer}</h2>
          <h2 className="font-bold text-3xl mt-2">{item.name}</h2>
          
          <p className="font-semibold text-2xl text-zinc-500">{item.description}</p>

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
              <div className="flex gap-3 items-center p-2 rounded-lg shadow-md">
                <button
                  className="p-2 bg-blue-500 text-white rounded-lg"
                  onClick={incrementQuantity}
                >
                  +
                </button>
                <span>{quantity}</span>
                <button
                  className="p-2 bg-blue-500 text-white rounded-lg"
                  onClick={decrementQuantity}
                >
                  -
                </button>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-2  justify-between">
              <Link to={`${item.in_stock ? `/paymnet/${id}` :""} `} className="flex w-full">
              <button className="bg-blue-500 text-white p-3  rounded-lg shadow-lg w-full">
                {item.in_stock ? "Buy Now" : "Out Of Stock"}
              </button >
              </Link>
              <button onClick={()=>handleAddCart(item)} className="bg-blue-500 text-white p-3  rounded-lg shadow-lg">
                Add to Cart
              </button>
              <div className="p-2 shadow-lg rounded-lg">
                <div className="font-bold text-3xl mt-5">Additional  InforMation</div>
                <div className="mt-3 flex gap-4 flex-col p-2 ">
                <p className="text-zinc-500 font-semibold flex gap-3"><span className="text-black">Category:</span>{item.category}</p>
                <h2 className="text-zinc-500 font-semibold flex gap-3"><span className="text-black">Product Name:</span>{item.name}</h2>
                <h2 className="text-zinc-500 font-semibold flex gap-3"><span className="text-black">Brand:</span>{item.brand}</h2>
                <h2 className="text-zinc-500 font-semibold flex gap-3"><span className="text-black">Price:</span>{item.price}$</h2>
                <h2 className="text-zinc-500 font-semibold flex gap-3 items-center"><span className="text-black">Available Sizes:</span>{item.available_sizes ? (
                item.available_sizes.map((size, index) => (
                  <span
                    className="rounded-lg p-2 shadow-sm text-black-500 border border-black"
                    key={index}
                  >
                    {size}
                  </span>
                ))
              ) : (
                <div>No sizes available</div>
              )}</h2>

<h2 className="text-green font-semibold flex gap-3"><span className="text-black">In Stock:</span> {item.in_stock ? "Stock" : "Out Of Stock"}</h2>
<h2 className="text-green-500 font-semibold flex gap-3"><span className="text-black">Discount:</span>{item.discount}</h2>
<h2 className="text-red-500 font-semibold flex gap-3"><span className="text-black">Warranty:</span>{item.warranty}</h2>
<h2 className="text-zinc-500 font-semibold flex gap-3"><span className="text-black">Additional Details:</span>{item.additional_details}</h2>


                </div>

              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByProducts;
