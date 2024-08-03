import axios from "axios";
import { useEffect, useState } from "react";
import { ItemsAPI } from "../API/API_URL";
import { useParams } from "react-router";
import { FaHeartBroken } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { handleAddCart } from "../Cart/Cartfunction";
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
      alert("Minimum quantity is 1");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="md:w-[70vw] p-8 rounded-lg shadow-lg grid md:grid-cols-2 gap-8 mx-auto mt-4">
        <div className="flex justify-center">
          <img
            src={item.image_url}
            alt={item.description}
            className="rounded-lg min-h-[300px] object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
<div className="flex justify-end text-3xl text-red-500">
    {whish ?<FaHeartBroken onClick={()=>setWhish(!whish)}/>:<FaHeart onClick={()=>setWhish(!whish)}/>}

</div>
          <p className="text-zinc-500 font-semibold">{item.category}</p>
          <h2 className="font-bold text-3xl">{item.brand}</h2>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ByProducts;
