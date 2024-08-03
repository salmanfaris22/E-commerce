import img1 from "../../Assets/manC.webp";
import img2 from "../../Assets/WomenC.webp";
import img3 from "../../Assets/boot.webp";
import img4 from "../../Assets/Kids’ Shoes.webp";

const categories = [
  { name: "Men", img: img1 },
  { name: "Women", img: img2 },
  { name: "Running", img: img3 },
  { name: "Kids’ Shoes", img: img4 },
];

const Categories = () => {
  return (
    <div className="p-4 bg-gray-100">
      <div className="font-bold text-3xl text-zinc-700 p-4">Categories</div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-6 overflow-auto ">
        {categories.map((category, index) => (
          <div    key={index}>
            <div
         
            className="relative h-[300px] bg-white shadow-md rounded-lg overflow-hidden group"
          >
            <img
              src={category.img}
              alt={category.name}
              className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-white text-black p-3 rounded-md">
                {category.name}
              </button>
            </div>
            
          </div>
          <div className="">
          <div className=" items-center justify-center  group-hover:opacity-100 transition-opacity duration-300 mt-2">
              <button className="text-white bg-black p-3 rounded-md w-full">
                {category.name}
              </button>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
