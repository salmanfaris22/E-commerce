import { useEffect, useState } from "react";
import { Si4Chan } from "react-icons/si";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { Color } from "../Home/Color";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { userAPI } from "../API/API_URL";

// eslint-disable-next-line react/prop-types
const NavBar = ({ setAdmin }) => {
  useEffect(() => {
    AOS.init();
  }, []);
  const [open, setOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(true);
  const [admin, OpenAdmin] = useState(false);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (localStorage.getItem("id")) {
      setIsLoggedin(false);
    } else {
      setIsLoggedin(true);
    }

    const AdminCheack = async () => {
      const user = localStorage.getItem("id");
      if (user) {
        try {
          const response = await axios.get(`${userAPI}/${user}`);
          const currentCart = response.data.admin;
          console.log("admin",currentCart);
          if (currentCart) {
            OpenAdmin(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    AdminCheack();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("id");
    toast.success("Logged Out");
    setIsLoggedin(true);
    setShowMenu(false);
  };

  return (
    <div>
      {/* Toast Container */}
      <ToastContainer />
      {showMenu && (
        <div className="absolute  right-0 z-[999] mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
          <button
            className="absolute top-2 right-2 text-gray-500"
            onClick={handleToggleMenu}
          >
            <IoMdClose className="text-2xl" />
          </button>
          <ul className="p-2 z-20">
            {isLoggedin ? (
              <div className="z-[999]">
                <Link to="/login" onClick={() => setShowMenu(false)}>
                  <li className="py-1 z-50 px-2 hover:bg-gray-100 cursor-pointer">
                    Login
                  </li>
                </Link>
                <Link to="/register">
                  <li
                    className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setShowMenu(false)}
                  >
                    Register
                  </li>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                  <Link to={"/trackOrder"} onClick={() => setShowMenu(false)}>
                    Trak Order
                  </Link>
                </li>
                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                  About
                </li>
                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                  Report Bug
                </li>
                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/contact">Contact</Link>
                </li>
                <li
                  onClick={handleLogout}
                  className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
                {admin && (
                  <li
                    onClick={() => setAdmin(true)}
                    className="py-1 px-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Admin Logine
                  </li>
                )}
              </div>
            )}
          </ul>
        </div>
      )}

      {/* Desktop Navbar */}
      <div
        data-aos="fade-down"
        className="hidden md:flex justify-between items-center w-full h-[70px] z-[8888] px-4"
        style={{ background: Color.primary, color: Color.secondary }}
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
        <ul className="flex gap-5 font-medium">
          <li data-aos="zoom-out-down" data-aos-duration="500">
            <Link to="/">Home</Link>
          </li>
          <li data-aos="zoom-out-down" data-aos-duration="800">
            <Link to="/allCategories">All Categories</Link>
          </li>
          <li data-aos="zoom-out-down" data-aos-duration="1100">
            <Link to="/filterCategories/Men">Mens</Link>
          </li>
          <li data-aos="zoom-out-down" data-aos-duration="1400">
            <Link to="/filterCategories/Women">Womens</Link>
          </li>
          <li data-aos="zoom-out-down" data-aos-duration="1700">
            <Link to="/brandsPage">Brands</Link>
          </li>

          <li data-aos="zoom-out-down" data-aos-duration="2000">
            <Link to="/moreCategories">More Categories</Link>
          </li>
        </ul>
        <div className="flex gap-6 text-2xl">
          <Link to="/cart">
            <FaCartShopping data-aos="zoom-out-down" data-aos-duration="2000" />
          </Link>
          <div className="relative">
            <button
              onClick={handleToggleMenu}
              className="flex items-center rounded"
            >
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
      <div
        className="md:hidden flex justify-between items-center w-full h-[70px] px-4 shadow-md"
        style={{ background: Color.primary, color: Color.secondary }}
      >
        <div className="text-2xl flex items-center gap-3">
          <Si4Chan />
          <div className="text-4xl">shoezee</div>
        </div>
        <div className="flex gap-6">
          <Link to="/cart" className="text-2xl">
            <FaCartShopping />
          </Link>
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

            {isLoggedin ? (
              <li className="flex text-1xl items-center  text-lg gap-4">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center text-lg gap-2 bg-slate-100 p-3 rounded-lg"
                >
                  <FaUser />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center text-lg gap-2 bg-slate-100 p-3 rounded-lg"
                >
                  Register
                </Link>
              </li>
            ) : (
              <div className="text-1xl flex flex-col gap-4">
                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                  <Link to={"/trackOrder"} onClick={() => setShowMenu(false)}>
                    Trak Order
                  </Link>
                </li>
                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                  About
                </li>
                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                  Report Bug
                </li>
                <li className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/contact">Contact</Link>
                </li>

                <li
                  onClick={handleLogout}
                  className="cursor-pointer text-lg flex items-center gap-2"
                >
                  <FaUser />
                  Logout
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
