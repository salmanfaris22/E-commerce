import { Link } from "react-router-dom";


const Default = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <Link to={'/'}>
      <button className="bg-black p-3 text-white font-bold rounded-lg ml-6"> Back</button>
      </Link>
    </div>
  );
};

export default Default;
