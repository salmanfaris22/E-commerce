import { useEffect, useState } from "react";
import axios from "axios";
import { ItemsAPI } from "../../API/API_URL";
import { handleAddCart } from "../../Cart/Cartfunction"; 
import { ToastContainer } from "react-toastify";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

const AlllCatogory = () => {
  const [mens, setMens] = useState([]);
  const [filter, setFilter] = useState(false);
  const [store, setStore] = useState([]);
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    const fetchMenItems = async () => {
      try {
        const response = await axios.get(ItemsAPI);
        const menItems = response.data;
        setMens(menItems);
        setStore(menItems);
      } catch (error) {
        console.error("Error fetching men's items:", error);
      }
    };

    fetchMenItems();
  }, []);

  useEffect(() => {
    let filteredItems = mens;
  
    if (filterBrand !== "All") {
      filteredItems = filteredItems.filter((e) => e.brand === filterBrand);
    }
    if (filterPrice !== "All") {
      const [minPrice, maxPrice] = filterPrice;
      filteredItems = filteredItems.filter(
        (item) => item.price >= minPrice && item.price <= maxPrice
      );
    }
    if (filterCategory !== "All") {
      filteredItems = filteredItems.filter((item) => item.category === filterCategory);
    }
  
    setStore(filteredItems);
  }, [filterBrand, filterPrice, filterCategory, mens]);

  const handleFilter = () => {
    setFilter(!filter);
  };

  const handleBrandChange = (brand) => {
    setFilterBrand(brand);
  };

  const handlePriceChange = (price) => {
    setFilterPrice(price);
  };

  const handleCategoryChange = (category) => {
    setFilterCategory(category);
  };

  return (
    <div>
      <ToastContainer />
      
      <div className="flex justify-between ml-5 mr-5">
        {filter && (
          <div className="md:w-1/4 w-[300px] p-10 bg-white rounded-lg fixed shadow-lg top-0 right-0 flex flex-col overflow-y-auto h-full">
            <div className="w-[90%] m-auto h-[90%] rounded-lg">
              <div className="flex justify-between items-center">
                <div>Filter Item</div>
                <IoMdClose className="text-2xl" onClick={handleFilter} />
              </div>
              <div className="font-thin mt-4">Select Your Brand</div>
              <div className="ml-10 flex font-semibold gap-5 mt-4 flex-col justify-start">
                {["All", "Adidas", "New Balance", "Nike", "Puma", "Reebok"].map((brand) => (
                  <label key={brand} className="w-[60%] justify-between flex">
                    {brand}
                    <input
                      type="radio"
                      className="ml-2"
                      name="brand"
                      value={brand}
                      checked={filterBrand === brand}
                      onChange={() => handleBrandChange(brand)}
                    />
                  </label>
                ))}
              </div>
              <div className="font-thin mt-7">Filter With Money</div>
              <div className="ml-10 flex font-semibold gap-5 mt-4 flex-col justify-start">
                {["All", [0, 25], [25, 50], [50, 100], [100, 250], [250, 999]].map((price, index) => (
                  <label key={index} className="w-[60%] justify-between  flex">
                    {price === "All" ? "All" : `${price[0]}$-${price[1]}$`}
                    <input
                      type="radio"
                      className="ml-2"
                      name="price"
                      value={price}
                      // checked={filterPrice === price}
                      onChange={() => handlePriceChange(price)}
                    />
                  </label>
                ))}
              </div>
              <div className="font-thin mt-7">Filter By Category</div>
              <div className="ml-10 flex font-semibold gap-5 mt-4 flex-col justify-start">
                {["All", "Men", "Women", "Kids", "Running","Football","Casual"].map((category) => (
                  <label key={category} className="w-[60%] justify-between flex">
                    {category}
                    <input
                      type="radio"
                      className="ml-2"
                      name="category"
                      value={category}
                      checked={filterCategory === category}
                      onChange={() => handleCategoryChange(category)}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="text-3xl">Mens</div>
        <div className="flex gap-3 justify-center items-center text-2xl">
          Filter
          <FaFilter onClick={handleFilter} />
        </div>
      </div>
      <div className="grid grid-cols-2 min-h-screen sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {store &&
          store.map((item) => (
            <div key={item.id} className="  shadow-lg p-4 h-[390px] rounded-md bg-white">
             
              <Link to={`/byProducts/${item.id}`}>
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md"
                />
              </Link>
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semi`   bold">{item.name}</span>
                  <span className="text-blue-500 font-bold">{item.price}$</span>
                </div>
                <Link to={`/byProducts/${item.id}`}>
                  <button className="w-full mt-2 border py-2 rounded-md transition duration-300">
                    Buy Now
                  </button>
                </Link>
                <button
                  onClick={() => handleAddCart(item)}
                  className="w-full mt-2 border py-2 rounded-md transition duration-300"
                >
                  ADD to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AlllCatogory;
