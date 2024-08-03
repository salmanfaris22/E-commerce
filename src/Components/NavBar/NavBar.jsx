import { useState } from "react";
import { Si4Chan } from "react-icons/si";
// import { FaSlack, FaUser } from "react-icons/fa";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { Color } from "../Home/Color";
import { Link } from "react-router-dom";
const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
    {/* Desktop Navbar */}
    <div
      className="hidden md:flex justify-between items-center w-full h-[70px] px-4 "
      style={{ background: Color.primary, color: Color.secondary }}
    >
      <div className="text-2xl">
        <Si4Chan />
      </div>
      <ul className="flex gap-8 font-medium">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/mens">Mens</Link>
        </li>
        <li>
          <Link to="/womens">Womens</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="flex gap-6 text-2xl">
        <Link to="/cart">
          <FaCartShopping />
        </Link>
        <Link to="/login">
          <FaUser />
        </Link>
      </div>
    </div>

    {/* Mobile Navbar */}
    <div className="md:hidden flex justify-between items-center w-full h-[70px] px-4 shadow-md" style={{ background: Color.primary, color: Color.secondary }}>
      <div className="text-2xl">
        <FaCartShopping />
      </div>
      <IoMdMenu onClick={() => setOpen(true)} className="text-2xl" />
    </div>

    {/* Mobile Menu */}
    {open && (
      <div className="fixed top-0 right-0 h-full w-[80vw] md:w-[50vw] z-[100] bg-white shadow-lg transition-transform transform translate-x-0 ease-in-out duration-300">
        <div className="flex justify-between items-center p-4">
          <div className="text-2xl">
            <IoCloseSharp onClick={() => setOpen(false)} />
          </div>
        </div>
        <ul className="flex flex-col gap-6 p-4">
          <li>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/products" onClick={() => setOpen(false)}>Products</Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </li>
          <li>
            <Link to="/login" onClick={() => setOpen(false)} className="flex items-center text-lg gap-2">
              <FaUser />
              Login
            </Link>
          </li>
        </ul>
      </div>
    )}
  </div>
  );
};

export default NavBar;
