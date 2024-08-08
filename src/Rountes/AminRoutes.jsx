import { Route, Routes } from "react-router";
import Home from "../Admin/AdminUser/Home/Home";
import UserDetails from "../Admin/AdminUser/Product/UserDetails/UserDetails";
import AddProduct from "../Admin/AdminUser/Product/EidProduct/AddProduct";
import DeletProduct from "../Admin/AdminUser/Product/EidProduct/DeletProduct";
import EditProduct from "../Admin/AdminUser/Product/EidProduct/EditPRoduct";
import UserInfo from "../Admin/AdminUser/Product/UserDetails/UserInfo";
import DashBoard from "../Admin/DashBoeard/DashBoard";





const AminRoutes = () => {
 

  return (
    <div>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<UserDetails />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/DeletProduct" element={<DeletProduct/>}/>
        <Route path="/EditProduct/:id" element={<EditProduct/>}/>
        <Route path="/UserInfo/:id" element={<UserInfo/>}/>
        <Route path="/DashBoard" element={<DashBoard/>}/>
      </Routes>
 
    </div>
  );
};

export default AminRoutes;
