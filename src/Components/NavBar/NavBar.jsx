import { useEffect, useState } from "react";
import { Si4Chan } from "react-icons/si";
// import { FaSlack, FaUser } from "react-icons/fa";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { Color } from "../Home/Color";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggine, seIssLogne] = useState(true);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    if (localStorage.getItem("id")) {
      const user = localStorage.getItem("name");
      seIssLogne(false);
      toast.success("👋🏻 Welcome Back ", user, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      seIssLogne(true);
    }
  }, [isLoggine]);
  const handleLogout = () => {
    localStorage.clear("id");
    toast.success("LogOuted");
    seIssLogne(true);
    setShowMenu(false);
  };
  return (
    <div>
      {/* Desktop Navbar */}

        <ToastContainer />
        
    
      <div
        className="hidden md:flex justify-between items-center w-full h-[70px] px-4 "
        style={{ background: Color.primary, color: Color.secondary }}
      >
        <div className="text-2xl flex justify-center items-center gap-3">
          <Si4Chan />
          <div className="text-4xl">shoezee</div>
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
            <Link to="/moreCategories">More Categories</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="flex gap-6 text-2xl">
          <Link to="/cart">
            <FaCartShopping />
          </Link>
          <div className="">
            <button
              onClick={handleToggleMenu}
              className="flex items-center   rounded"
            >
              <FaUser className="mr-3" />
            </button>
            {showMenu && (
              <div className="z-[4] absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                <button
                  className="absolute top-2 right-2 text-gray-500"
                  onClick={handleToggleMenu}
                >
                  <IoMdClose />
                </button>
                <ul className="p-2">
                  {isLoggine ? (
                    <div>
                      <Link to="/login" onClick={() => setShowMenu(false)}>
                        <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                          Login
                        </li>
                      </Link>

                      <Link to={"/register"}>
                        <li
                          className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setShowMenu(false)}
                        >
                          Regiter
                        </li>
                      </Link>
                    </div>
                  ) : (
                    <li
                      onClick={handleLogout}
                      className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                    >
                      LogOut
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className="md:hidden flex justify-between items-center w-full h-[70px] px-4 shadow-md"
        style={{ background: Color.primary, color: Color.secondary }}
      >
       <div className="text-2xl flex justify-center items-center gap-3">
          <Si4Chan />
          <div className="text-4xl">shoezee</div>
        </div>
       <div className="flex gap-9">
       <div className="text-2xl">
          <FaCartShopping />
        </div>
        <IoMdMenu onClick={() => setOpen(true)} className="text-2xl" />
       </div>
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
              <Link to="/" onClick={() => setOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={() => setOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex items-center text-lg gap-2"
              >
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
