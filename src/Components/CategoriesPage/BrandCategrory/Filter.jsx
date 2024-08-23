import { useEffect, useState } from "react";
import axios from "axios";
import { ItemsAPI } from "../../API/API_URL";

import { handleAddCart } from "../../Cart/Cartfunction";
import { ToastContainer } from "react-toastify";
import { FaFilter } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";


const Filter = () => {
    const {id} = useParams()
  const [mens, setMens] = useState([]);
  const [filter, setFilter] = useState(false);
  const [store, seStore] = useState([]);
  const [filterBrand, setFilterBrand] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");

  useEffect(() => {
    const fetchMenItems = async () => {
      try {
        const response = await axios.get(ItemsAPI);
        const menItems = response.data.filter(
          (item) => item.category === id
        );
        setMens(menItems);
        seStore(menItems);
      } catch (error) {
        console.error("Error fetching men's items:", error);
      }
    };

    fetchMenItems();
  }, [store,filter,mens]);


 useEffect(()=>{
  let filterIteams = mens
  
  if(filterBrand !=="All"){
    filterIteams=filterIteams.filter((e)=>e.brand===filterBrand)
  }
  if (filterPrice !== "All") {
    const [minPrice, maxPrice] = filterPrice;
    filterIteams = filterIteams.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );
  }
 
  seStore(filterIteams)

 }, [filterBrand, filterPrice, mens])

  const handlefilter = () => {
    setFilter(!filter);
  };

  function handleBrandChange(brand){
    setFilterBrand(brand)
  }

  function handlePriceChange(price){
    setFilterPrice(price)
  }

  return (
    <div>
      <ToastContainer />

      <div className="flex justify-between ml-5 mr-5 ">
      {filter && (
          <div className="md:w-1/4 w-[300px] p-10 bg-white rounded-lg  fixed shadow-lg top-0 h-[90vh] right-0 flex flex-col">
            <div className=" w-[90%] m-auto h-[90%]  rounded-lg">
              <div>
                <div className="flex justify-between  items-center">
                  <div>Filter Item</div>
                   <FaFilter onClick={handlefilter}  />
                </div>
                <div className="font-thin mt-4">Select Your Brand</div>
                <div className="ml-10 flex font-semibold gap-5 mt-4 flex-col justify-start">
                  <label className="w-[50%] justify-between flex">
                    All
                    <input
                      type="radio"
                      className="ml-2"
                      name="brand"
                      value="All"
                      checked={filterBrand === "All"}
                      onChange={() => handleBrandChange("All")}
                    />
                  </label>
                  <label className="w-[50%] justify-between flex">
                    Adidas
                    <input
                      type="radio"
                      className="ml-2"
                      name="brand"
                      value="Adidas"
                      checked={filterBrand === "Adidas"}
                      onChange={() => handleBrandChange("Adidas")}
                    />
                  </label>
                  <label className="w-[50%] justify-between flex">
                    Nike
                    <input
                      type="radio"
                      className="ml-2"
                      name="brand"
                      value="Nike"
                      checked={filterBrand === "Nike"}
                      onChange={() => handleBrandChange("Nike")}
                    />
                  </label>
                  <label className="w-[50%] justify-between flex">
                    Puma
                    <input
                      type="radio"
                      className="ml-2"
                      name="brand"
                      value="Puma"
                      checked={filterBrand === "Puma"}
                      onChange={() => handleBrandChange("Puma")}
                    />
                  </label>
                  <label className="w-[50%] justify-between flex">
                    Reebok
                    <input
                      type="radio"
                      className="ml-2"
                      name="brand"
                      value="Reebok"
                      checked={filterBrand === "Reebok"}
                      onChange={() => handleBrandChange("Reebok")}
                    />
                  </label>
                </div>
              </div>
              <div>
                <div className="font-thin mt-7">Filter With Money</div>
                <div className="ml-10 flex font-semibold gap-5 mt-4 flex-col justify-start">
                  <label className="w-[50%] justify-between flex">
                    All
                    <input
                      type="radio"
                      className="ml-2"
                      name="price"
                      value="All"
                      checked={filterPrice === "All"}
                      onChange={() => handlePriceChange("All")}
                    />
                  </label>
                  <label className="w-[50%] justify-between flex">
                    0$-25$
                    <input
                      type="radio"
                      className="ml-2"
                      name="price"
                      value={[0, 25]}
                      checked={filterPrice[0] === 0 && filterPrice[1] === 25}
                      onChange={() => handlePriceChange([0, 25])}
                    />
                  </label>
                  <label className="w-[50%] justify-between flex">
                    25$-50$
                    <input
                      type="radio"
                      className="ml-2"
                      name="price"
                      value={[25, 50]}
                      checked={filterPrice[0] === 25 && filterPrice[1] === 50}
                      onChange={() => handlePriceChange([25, 50])}
                    />
                  </label>
                  <label className="w-[50%] justify-between flex">
                    50$-100$
                    <input
                      type="radio"
                      className="ml-2"
                      name="price"
                      value={[50, 100]}
                      checked={filterPrice[0] === 50 && filterPrice[1] === 100}
                      onChange={() => handlePriceChange([50, 100])}
                    />
                  </label>
                  <label className="w-[50%] justify-between flex">
                    100$-250$
                    <input
                      type="radio"
                      className="ml-2"
                      name="price"
                      value={[100, 250]}
                      checked={filterPrice[0] === 100 && filterPrice[1] === 250}
                      onChange={() => handlePriceChange([100, 250])}
                    />
                  </label>
                  <label className="w-[50%] justify-between flex">
                    250$+
                    <input
                      type="radio"
                      className="ml-2"
                      name="price"
                      value={[250,999]}
                      checked={filterPrice[0] === 250 && filterPrice[1] ===999}
                      onChange={() => handlePriceChange([250,999])}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="text-3xl ">{id}</div>
        <div className="flex gap-3  justify-center items-center text-2xl">
          Filter
          <FaFilter onClick={handlefilter} />
        </div>
      </div>
      <div className="grid grid-cols-2 min-h-screen sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {store &&
          store.map((item) => (
            <div key={item.id} className="shadow-lg p-4 h-[390px] rounded-md bg-white">
              <Link to={`/byProducts/${item.id}`}>
            
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md"
              />
                </Link>
              <div className="mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{item.name}</span>
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
};


export default Filter