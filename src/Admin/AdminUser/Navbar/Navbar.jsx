import { useState } from "react";
import { Si4Chan } from "react-icons/si";
import {FaUser } from "react-icons/fa6";

import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";

const NavBarAdmin = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Toast Container */}

      {/* Desktop Navbar */}
      <div
        data-aos="fade-down"
        className="hidden md:flex justify-between items-center w-full h-[70px] z-[8888] px-4"
      >
        <div className="text-2xl flex items-center gap-3">
          <Si4Chan />
          <div
            className="text-4xl"
            data-aos="zoom-out-down"
            data-aos-duration="2000"
          >
            shoezee
          </div>
        </div>

        <div className="flex gap-5 font-semibold">
            <div>Users</div>
            <div>AddProduct</div>
            <div>Edit/Remove</div>
            <div>Orders</div>
            <div>DashBoard</div>
        </div>

        <div className="flex gap-6 text-2xl">
          <div className="relative">
            <button className="flex items-center rounded">
              <FaUser
                className="mr-3 "
                data-aos="zoom-out-down"
                data-aos-duration="2300"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center w-full h-[70px] px-4 shadow-md">
        <div className="text-2xl flex items-center gap-3">
          <Si4Chan />
          <div className="text-4xl">shoezee</div>
        </div>
        <div className="flex gap-6">
          <IoMdMenu
            onClick={() => setOpen(true)}
            className="text-2xl cursor-pointer"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed top-0 right-0 h-full w-[80vw] md:w-[50vw] z-[100] bg-white shadow-lg transition-transform transform translate-x-0 ease-in-out duration-300">
          <div className="flex justify-between items-center p-4">
            <IoCloseSharp
              onClick={() => setOpen(false)}
              className="text-2xl cursor-pointer"
            />
          </div>
          <ul className="flex flex-col gap-6 p-4">
            <li>
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/allCategories" onClick={() => setOpen(false)}>
                All Categories
              </Link>
            </li>
            <li>
              <Link to="/filterCategories/Men" onClick={() => setOpen(false)}>
                Mens
              </Link>
            </li>
            <li>
              <Link to="/filterCategories/Women" onClick={() => setOpen(false)}>
                Womens
              </Link>
            </li>
            <li>
              <Link to="/moreCategories" onClick={() => setOpen(false)}>
                More Categories
              </Link>
            </li>

            <li>
              <Link to="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBarAdmin;
