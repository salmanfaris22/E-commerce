import { Route, Routes } from "react-router";
import Home from "../Admin/AdminUser/Home/Home";
import UserDetails from "../Admin/AdminUser/Product/UserDetails";
import AddProduct from "../Admin/AdminUser/Product/AddProduct";


const AminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserDetails />} />
        <Route path="/AddProduct" element={<AddProduct />} />
      </Routes>
    </div>
  );
};

export default AminRoutes;
