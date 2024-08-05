import { useState } from "react";
import { AddProductItems } from "./buttonFunction/AddIteam";
import { useParams } from "react-router";

const AddProduct = () => {
    const params = useParams()
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
  
  const handleChange = (e) => {
    if(e.target.name==='price'){
        const num =Number(e.target.value,)
        setProduct({
            ...product,
            [e.target.name]: num,
          });
    }else{
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
          });
    }
   
   
  };
 

  const handleChangeSize= (e)=>{
    const size = e.target.value.split("/")
   
     setProduct({
        ...product,
        [e.target.name]: size
      });
     
  }
 const handleSubmit =async()=>{
    await AddProductItems(product)
 params('/AddProduct')

}
  return (
    <div className="ml-[100px]">
      <div>
        <div className="font-bold text-3xl">Add Product</div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label>
                Product ID:
                <input
                  type="number"
                  name="id"
                  onChange={handleChange}
                  className="border ml-2 p-1"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Product Name:
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="border ml-2 p-1"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  onChange={handleChange}
                  className="border ml-2 p-1"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  className="border ml-2 p-1"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Category:
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
              </label>
            </div>
            <div className="mb-4">
              <div className="flex space-x-2">
              <label>
                Entersize <span>with / Bar</span>
                <input
                  type="text"
                  name="size"
                  onChange={handleChangeSize}
                  className="border ml-2 p-1"
                />
              </label>
              </div>
            </div>
            <div className="mb-4">
              <label>
                Brand:
                <select
                  name="brand"
                  onChange={handleChange}
                  className="border ml-2 p-1"
                >
                  <option value="All">Select Brand</option>
                  <option value="Adidas">Adidas</option>
                  <option value="Nike">Nike</option>
                  <option value="Puma">Puma</option>
                  <option value="New-balance">New Balance</option>
                  <option value="Reebok">Reebok</option>
                </select>
              </label>
            </div>
            <div className="mb-4">
              <label>
                Image URL:
                <input
                  type="text"
                  name="image_url"
                  onChange={handleChange}
                  className="border ml-2 p-1"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                In Stock:
                <div className="flex space-x-2">
                  <label>
                    <input type="radio"  onChange={handleChange} name="in_stock" value="yes" /> true
                  </label>
                  <label>
                    <input type="radio"  onChange={handleChange} name="in_stock" value="no" /> false
                  </label>
                </div>
              </label>
            </div>
            <div className="mb-4">
              <label>
                Special Offer:
                <input
                  type="text"
                  name="special_offer"
                  onChange={handleChange}
                  className="border ml-2 p-1"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Discount:
                <input
                  name="discount"
                  onChange={handleChange}
                  type="text"
                  className="border ml-2 p-1"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Warranty:
                <input
                  name="warranty"
                  onChange={handleChange}
                  type="text"
                  className="border ml-2 p-1"
                />
              </label>
            </div>
            <div className="mb-4">
              <label>
                Additional Details:
                <input
                  name="additional_details"
                  onChange={handleChange}
                  type="text"
                  className="border ml-2 p-1"
                />
              </label>
            </div>
            <div>
                <button>onSubmit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
