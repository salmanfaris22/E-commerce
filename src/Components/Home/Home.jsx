import ImgMain from "../../Assets/main.webp";
import NikeImg from "../../Assets/nikeMian.webp";
import JorImg from "../../Assets/jordan.webp";
import Categories from "./Categories";
import Iteam from "./ItemList/Iteam";
import About from "./about/about";
import Garendy from "./MorePages/Garendy";
import Brand from "./MorePages/Brand";
import BrandSection from "./MorePages/MoreBRand";

const Home = () => {
  return (
    <div className="p-6 ">
      <div className="grid grid-cols-3 grid-rows-2 ">
        <div className="col-span-2 row-span-2  relative  " data-aos="fade-up-right">
          <img
            src={NikeImg}
            alt=""
            className=" transition-transform h-[100%] w-[100%] bg-black hover:opacity-50 duration-300 ease-in-out transform hover:scale-105 shadow-lg rounded-lg"
          />
          
          <div className="h-[100%] w-[100%] rounded-lg flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-opacity-40 bg-black transition duration-300 absolute top-0  right-0 ">
          <button className="text-white bg-black p-4  border hover:border-black hover:bg-white hover:text-black transition duration-300 rounded-lg">

            Shop Now
          </button>
          </div>
        </div>
        <div
          className="col-span-1  "
          data-aos="fade-left"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="500"
        >
                
          
          <img
            src={JorImg}
            alt=""
            className="md:row-span-1 z-[10] h-[100%] w-[100%] transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-lg rounded-lg"
          />
                <div className="h-[100%] w-[100%] rounded-lg z-[3] flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-opacity-40 bg-black transition duration-300 absolute top-0  right-0 ">
          <button className="text-white bg-black p-4  border hover:border-black hover:bg-white hover:text-black transition duration-300 rounded-lg">

            Shop Now
          </button>
          </div>
        </div>

        <div className="col-span-1" data-aos="fade-up-left">
          <img src={ImgMain} alt="" className="mb-4  h-[100%] w-[100%]" />
                
          <div className="h-[100%] w-[100%] rounded-lg flex justify-center items-center opacity-0 hover:opacity-100 hover:bg-opacity-40 bg-black transition duration-300 absolute top-0  right-0 ">
          <button className="text-white bg-black p-4  border hover:border-black hover:bg-white hover:text-black transition duration-300 rounded-lg">

            Shop Now
          </button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <Categories />
        <BrandSection />
        <Iteam />
        <Brand />
        <About />

        <Garendy />
      </div>


     
    </div>
  );
};

export default Home;
