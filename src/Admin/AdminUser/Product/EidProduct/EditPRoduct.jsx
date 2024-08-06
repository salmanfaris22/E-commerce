import { useState } from "react";

import axios from "axios";
import { ItemsAPI } from "../../../../Components/API/API_URL";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router";
import { UpdateItem } from "../buttonFunction/EditItem";

const EditProduct = () => {
  // eslint-disable-next-line no-unused-vars
  const {id} =useParams()
  const [error, setErroe] = useState([]);

  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    category: "",
    available_sizes: [],
    brand: "",
    image_url: "",
    in_stock: false,
    special_offer: "",
    discount: "",
    warranty: "",
    additional_details: "",
  });
  useState(()=>{
    
    async function getProduct(){
    try{
     const res = await axios.get(`${ItemsAPI}/${id}`)
      setProduct(res.data)
      toast.warning("don't Chanje The Id ")
    }catch(err){
     console.log("erre");
    }
    }
    getProduct()
},[])

  const handleChange = (e) => {
   
    if (e.target.name === "price") {
      const num = Number(e.target.value);
      setProduct({
        ...product,
        [e.target.name]: num,
      });
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
  };

  const validate = () => {
    const err = {};

    if (!product.id) {
      err.id = "Please enter an ID";
    }
    if (!product.name) {
      err.name = "Please enter a name";
    }
    if (!product.description) {
      err.description = "Please enter a description";
    }
    if (!product.price || product.price <= 0) {
      err.price = "Please enter a valid price";
    }
    if (!product.category) {
      err.category = "Please select a category";
    }
    if (product.available_sizes.join("").length === 0) {
      err.available_sizes = "Please select at least one size";
    }
    if (!product.brand) {
      err.brand = "Please enter a brand";
    }
    if (!product.image_url) {
      err.image_url = "Please enter an image URL";
    }

    return err;
  };

  const handleChangeSize = (e) => {
    const size = e.target.value.split("/");

    setProduct({
      ...product,
      available_sizes: size,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   

      validate(product);

      if (Object.keys(validate()).length === 0) {
        await UpdateItem(product,id);
        window.location.reload();

        toast("Added To Products");
      } else {
        setErroe(validate());
        toast("pleas Fill The Minimam From");
      }
   
  };

  return (
    <div className="ml-[100px] flex justify-center mt-6  p-2">
      <ToastContainer />
      <div>
        <div className="font-bold text-3xl">Edit Product</div>
        <div className="grid md:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-[500px] bg-white p-3 rounded-lg shadow-md"
          >
            <div className="mb-4 flex  justify-between items-center">
              <label className="">
                <div className="flex">
                  Product ID:
                  {error.id && <div className="text-red-500">*</div>}
                </div>
              </label>
              <input
                type="number"
                name="id"
                value={product.id}
                onChange={handleChange}
                className="border ml-2 p-1 w-[300px]  rounded-lg pl-2 shadow-sm "
              />
            </div>

            <div className="mb-4 flex   justify-between items-center">
              <label>
                <div className="flex">
                  Product Name:
                  {error.name && <div className="text-red-500">*</div>}
                </div>
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={product.name}
                className="border ml-2 p-1"
              />
            </div>
            <div className="mb-4 flex  justify-between items-center">
              <label>
                <div className="flex">
                  Description:
                  {error.description && <div className="text-red-500">*</div>}
                </div>
              </label>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                value={product.description}
                className="border ml-2 p-1"
              />
            </div>
            <div className="mb-4 flex justify-between items-center">
              <label>
                <div className="flex">
                  Price:
                  {error.price && <div className="text-red-500">*</div>}
                </div>
              </label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                className="border ml-2 p-1"
              />
            </div>
            <div className="mb-4 flex   justify-between items-center">
              <label>
                <div className="flex">
                  Category:
                  {error.category && <div className="text-red-500">*</div>}
                </div>
              </label>
              <select
                name="category"
                onChange={handleChange}
                className="border ml-2 p-1"
              >
                <option value="">Select Category</option>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Football">Football</option>
                <option value="Running">Running</option>
              </select>
            </div>
            <div className="mb-4 flex   justify-between items-center">
              <label>
                <div className="flex">
                  Entersize <span>with / Bar</span>
                  {error.available_sizes && (
                    <div className="text-red-500">*</div>
                  )}
                </div>
              </label>
              <input
                type="text"
                name="available_sizes"
                onChange={handleChangeSize}
                className="border ml-2 p-1"
              />
            </div>
            <div className="mb-4 flex  justify-between items-center">
              <label>
                <div className="flex">
                  Brand: {error.brand && <div className="text-red-500">*</div>}
                </div>
              </label>
              <select
                name="brand"
                onChange={handleChange}
                className="border ml-2 p-1"
              >
                <option value="All">Select Brand</option>
                <option value="Adidas">Adidas</option>
                <option value="Nike">Nike</option>
                <option value="Puma">Puma</option>
                <option value="New Balance">New Balance</option>
                <option value="Reebok">Reebok</option>
              </select>
            </div>
            <div className="mb-4 flex   justify-between items-center">
              <label>
                <div className="flex">
                  Image URL:
                  {error.image_url && <div className="text-red-500">*</div>}
                </div>
              </label>
              <input
                type="text"
                name="image_url"
                onChange={handleChange}
                className="border ml-2 p-1"
              />
            </div>
            <div className="mb-4 flex   justify-between items-center">
              <label className="flex justify-between w-[100%]">
                <div className="flex">
                  In Stock:
                  {error.image_url && <div className="text-red-500">*</div>}
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      onChange={handleChange}
                      name="in_stock"
                      value="yes"
                    />{" "}
                    true
                  </label>
                  <label>
                    <input
                      type="radio"
                      onChange={handleChange}
                      name="in_stock"
                      value="no"
                    />{" "}
                    false
                  </label>
                </div>
              </label>
            </div>
            <div className="mb-4 flex   justify-between items-center">
              <label>Special Offer:</label>
              <input
                type="text"
                name="special_offer"
                onChange={handleChange}
                className="border ml-2 p-1"
              />
            </div>
            <div className="mb-4 flex   justify-between items-center">
              <label>Discount:</label>
              <input
                name="discount"
                onChange={handleChange}
                type="text"
                className="border ml-2 p-1"
              />
            </div>
            <div className="mb-4 flex   justify-between items-center">
              <label>Warranty:</label>
              <input
                name="warranty"
                onChange={handleChange}
                type="text"
                className="border ml-2 p-1"
              />
            </div>
            <div className="mb-4 flex   justify-between items-center">
              <label>Additional Details:</label>
              <input
                name="additional_details"
                onChange={handleChange}
                type="text"
                className="border ml-2 p-1"
              />
            </div>
            <div>
              <button>onSubmit</button>
            </div>
          </form>
          <div>
            <div className="p-2 shadow-lg ml-2">
              <div className="text-3xl font-bold">Demo Page</div>
              <div>
                <div className="flex justify-center mt-3">
                  <img
                    src={product.image_url}
                    alt={product.description}
                    className="rounded-lg min-h-[300px] max-w-[400px] max-h-[500px] object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex justify-end text-3xl text-red-500"></div>

                  <div className="flex justify-between mt-3">
                    <p className="text-zinc-500 font-semibold mt-2">
                      {product.category}
                    </p>
                    <h2 className="font-bold text-2]1xl mt-2">
                      {product.brand}
                    </h2>
                  </div>
                  <h2 className=" font-semibold flex gap-3 text-red-500 mt-2">
                    {product.special_offer}
                  </h2>
                  <h2 className="font-bold text-3xl">{product.name}</h2>

                  <p className="font-semibold text-2xl text-zinc-500">
                    {product.description}
                  </p>

                  <div className="p-3 mt-7">
                    <span className="font-semibold">Sizes:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.available_sizes ? (
                        product.available_sizes.map((size, index) => (
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
                        ${product.price}
                      </span>
                      <div className="flex gap-3 items-center p-2 rounded-lg shadow-md">
                        <button className="p-2 bg-blue-500 text-white rounded-lg">
                          +
                        </button>
                        <span>{0}</span>
                        <button className="p-2 bg-blue-500 text-white rounded-lg">
                          -
                        </button>
                      </div>
                    </div>
                    <div className="mt-8 flex flex-col gap-2  justify-between">
                      <button className="bg-blue-500 text-white p-3  rounded-lg shadow-lg w-full">
                        {product.in_stock ? "Buy Now" : "Out Of Stock"}
                      </button>

                      <button className="bg-blue-500 text-white p-3  rounded-lg shadow-lg">
                        Add to Cart
                      </button>

                      <div className="p-2 shadow-lg rounded-lg">
                        <div className="font-bold text-3xl mt-5">
                          Additional InforMation
                        </div>
                        <div className="mt-3 flex gap-4 flex-col p-2 ">
                          <p className="text-zinc-500 font-semibold flex gap-3">
                            <span className="text-black">Category:</span>
                            {product.category}
                          </p>
                          <h2 className="text-zinc-500 font-semibold flex gap-3">
                            <span className="text-black">Product Name:</span>
                            {product.name}
                          </h2>
                          <h2 className="text-zinc-500 font-semibold flex gap-3">
                            <span className="text-black">Brand:</span>
                            {product.brand}
                          </h2>
                          <h2 className="text-zinc-500 font-semibold flex gap-3">
                            <span className="text-black">Price:</span>
                            {product.price}$
                          </h2>
                          <h2 className="text-zinc-500 font-semibold flex gap-3 items-center">
                            <span className="text-black">Available Sizes:</span>
                            {product.available_sizes ? (
                              product.available_sizes.map((size, index) => (
                                <span
                                  className="rounded-lg p-2 shadow-sm text-black-500 border border-black"
                                  key={index}
                                >
                                  {size}
                                </span>
                              ))
                            ) : (
                              <div>No sizes available</div>
                            )}
                          </h2>

                          <h2 className="text-green font-semibold flex gap-3">
                            <span className="text-black">In Stock:</span>{" "}
                            {product.in_stock ? "Stock" : "Out Of Stock"}
                          </h2>
                          <h2 className="text-green-500 font-semibold flex gap-3">
                            <span className="text-black">Discount:</span>
                            {product.discount}
                          </h2>
                          <h2 className="text-red-500 font-semibold flex gap-3">
                            <span className="text-black">Warranty:</span>
                            {product.warranty}
                          </h2>
                          <h2 className="text-zinc-500 font-semibold flex gap-3">
                            <span className="text-black">
                              Additional Details:
                            </span>
                            {product.additional_details}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
