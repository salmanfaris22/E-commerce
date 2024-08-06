import { useState } from "react";
import { Si4Chan } from "react-icons/si";
import { FaUser } from "react-icons/fa6";
import { Link } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const NavBarAdmin = ({setAdmin}) => {
  const [open, setOpen] = useState(false);
 const handleLockOut =()=>{
    localStorage.clear("admin")
    setAdmin(false)
 }
  return (
    <div className=" fixed top-0"
    onMouseEnter={()=>setOpen(!open)}
    onMouseLeave={()=>setOpen(!open)}
    >
      <div className="flex gap-6 h-[100vh] fixed top-0 w-[50px] z-[999999] ">
        <Si4Chan 

         
          className="cursor-pointer  z-[9999] text-3xl"
        />
      </div>
      <div
        className={`${
          open ? "w-[200px]" : "w-[50px]"
        } transition-all duration-300 fixed flex  shadow-lg flex-col text-black bg-white items-center h-[100vh] z-[8888] px-4`}
      >
        <div className="text-2xl flex flex-col mt-10 items-center gap-3">
         
          {open && (
            <div className="text-4xl">shoezee</div>
          )}
        </div>

        <ul className={`flex flex-col gap-5  font-semibold mt-12 ${open ? "block" : "hidden"}`}>
          <Link to={"/user"}>
          <li>Users</li>
          </Link>
         <Link to={"/AddProduct"}><li>AddProduct</li></Link>
     
          <li>Edit/Remove</li>
          <li>Orders</li>
          <li>DashBoard</li>
        </ul>

        <div className={`flex gap-6 text-2xl ${open ? "block" : "hidden"}`}>
          <div className="relative">
            <button className="flex items-center rounded mt-10">
              <FaUser onClick={handleLockOut} className="mr-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBarAdmin;
