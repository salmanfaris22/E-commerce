import ImgMain from "../../Assets/main.webp";
import NikeImg from "../../Assets/nikeMian.webp";
import JorImg from "../../Assets/jordan.webp";
import Categories from "./Categories";
import Iteam from "./ItemList/Iteam";
import About from "./about/about";
const Home = () => {
  return (
    <div className="p-6">
    <div className="grid md:grid-cols-3 md:grid-rows-4 gap-6 grid-cols-2">
      <img 
        src={NikeImg} 
        alt="" 
        className="md:col-span-2 md:row-span-4 col-span-2 transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg rounded-lg" 
      />
      <img 
        src={JorImg} 
        alt="" 
        className="md:row-span-2 transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg rounded-lg" 
      />
      <div className="md:row-span-2 flex flex-col justify-center items-center p-4 bg-white shadow-lg rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
        <img 
          src={ImgMain} 
          alt="" 
          className="mb-4" 
        />
        
      </div>
    </div>
    <div className="mt-6">
      <Categories />
      <About/>
      <Iteam />
    </div>
  </div>
  );
};

export default Home;
