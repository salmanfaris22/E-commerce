import img1 from "../../Assets/men.avif";

const Categories = () => {
  return (
    <div className="p-4">


      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-6">
        {['Women', 'Men', 'Kids', 'Accessories'].map((category) => (
          <div key={category} className="relative h-[300px] bg-white shadow-md rounded-lg overflow-hidden group">
            <img 
              src={img1} 
              alt={category}
              className="w-full h-full object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:blur-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-white text-black p-3 rounded-md">{category}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
