
import img from '../../../Assets/mainkeBRand.jpg';

const MoreBRand = () => {
  return (
    <div
    data-aos="zoom-in-up"
      className='relative grid  shadow-xl rounded-xl min-h-[500px]  bg-cover bg-center'
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className='flex flex-col justify-center items-center  text-center md:text-left bg-black bg-opacity-0 hover:bg-opacity-50 rounded-lg'>
        <h2 className='text-3xl md:text-4xl font-bold mb-4 text-white'>
          Discover the Best in Athletic Wear
        </h2>
        {/* <p className='text-lg mb-6 font-bold  bg-opacity-40 p-2 text-white md:block hidden '>
          Explore our exclusive collection of Nike shoes designed for performance and style. <br/> Find your perfect pair and elevate your game with the latest trends in athletic footwear.
        </p> */}
        <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
          <button className='bg-black w-36 p-3 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105'>
            Explore More
          </button>
          <button className='bg-black w-36 p-3 text-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105'>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreBRand;
