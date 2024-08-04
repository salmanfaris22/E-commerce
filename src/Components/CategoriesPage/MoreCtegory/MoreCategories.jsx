
import img1 from "../../../Assets/OutherFootball.jpg";
import img2 from "../../../Assets/OutherKids.webp";
import img3 from "../../../Assets/OutherMen.jpg";
import img4 from "../../../Assets/OutherWomen.jpg";
import img5 from "../../../Assets/OutherCasual.avif";
import img6 from "../../../Assets/Outherrunnig.webp";
import { Link } from "react-router-dom";

const categories = [
  { img: img1, text: "Football", etc: "Let's Play With Me" },
  { img: img2, text: "Kids" },
  { img: img3, text: "Men" },
  { img: img4, text: "Women" },
  { img: img5, text: "Casual" },
  { img: img6, text: "Running" },
];

const MoreCategories = () => {
  return (
    <div className="grid grid-cols-1   ">
      {categories.map((category, index) => (
        <div key={index} className="relative group overflow-hidden">
           <Link to={`/filterCategories/${category.text}`}>
          <img
            src={category.img}
            alt={category.text}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0  flex flex-col justify-center items-center text-center transition-opacity duration-300">
            <div className="text-2xl text-white mb-4">
              {category.etc && <p className="text-lg">{category.etc}</p>}
              <p className="text-4xl font-bold">{category.text}</p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <button className="bg-transparent opacity-100 border-2 border-white text-white w-36 p-3 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                {category.text}
              </button>
             
              <button className="bg-black text-white w-36 p-3 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                Shop Now
              </button>
             
             
            </div>
          </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MoreCategories;
