import axios from "axios";
import { useEffect, useState } from "react";
import { ItemsAPI } from "../../../../Components/API/API_URL";
import { ProductDelet } from "../buttonFunction/Delete";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
const DeletProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function Product() {
      try {
        const res = await axios.get(ItemsAPI);
        const data = res.data;
        setProducts(data);
      } catch (err) {
        console.log("err");
      }
    }
    Product();
  }, []);
async function handleDeleteProduct(e){
 try{
    await  ProductDelet(e)
    const res = await axios.get(ItemsAPI);
    const data = res.data;
    setProducts(data);
    toast.success("Deleted Product")

 }catch(err){
    console.log("err");
 }
}
  return (
    <div className=" bg-slate-100 p-6">
        <ToastContainer/>
      <div className="grid gap-6 grid-cols-1 ml-[100px]  m-auto">
        {products.map((e) => {
          return (
            <div
              key={e.id}
              className="p-4 bg-white rounded-lg  flex justify-between shadow-lg transition-transform transform hover:scale-105"
            >
              <img
                src={e.image_url}
                alt={e.image_url}
                className="h-[150px] w-[150px] object-cover rounded-lg mb-4"
              />
              <div className="space-y-2">
                <div className="font-bold">
                  <span className="text-gray-500">Name:</span> {e.name}
                </div>
                <div className="font-bold">
                  <span className="text-gray-500">Prize:</span> {e.price}$
                </div>
                <div className="font-bold">
                  <span className="text-gray-500">Stock:</span>{" "}
                  {e.in_stock ? "true" : "false"}
                </div>
                <div>
                  <span className="text-gray-500 font-bold">Size:</span>{" "}
                  {e.available_sizes ? (
                    e.available_sizes.map((size, index) => (
                      <span
                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        key={index}
                      >
                        {size}
                      </span>
                    ))
                  ) : (
                    <div>No sizes available</div>
                  )}
                </div>
                <div className="font-bold">
                  <span className="text-gray-500">Warranty:</span> {e.warranty}
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-4">
                <Link to={`/EditProduct/${e.id}`}>
                
                <button  className="p-2 bg-blue-500 text-white w-full rounded-lg shadow-md hover:bg-blue-600">
                  Edit Product
                </button></Link>
                <button onClick={()=>handleDeleteProduct(e)} className="p-2 bg-red-500 text-white w-full rounded-lg shadow-md hover:bg-red-600">
                  Delete Product
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeletProduct;
