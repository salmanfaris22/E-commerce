import React, { createContext, useEffect, useState } from "react";

import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import RoutesPage from "./Rountes/Routes";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { userAPI } from "./Components/API/API_URL";

// import NavBarAdmin from "./Admin/AdminUser/Navbar/Navbar";

export const CArtss = createContext();

const AminRoutes = React.lazy(() => import("./Rountes/AminRoutes"));

const NavBarAdmin = React.lazy(() => import("./Admin/AdminUser/Navbar/Navbar"));

function App() {
  const [admin, setAdmin] = useState(false);
  const [cartt, setCartt] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    async function TotelCart() {
      const user = localStorage.getItem("id");

      const response = await axios.get(`${userAPI}/${user}`);
      const currentCart = response.data.cart;

      setCartt(Object.keys(currentCart).length);
    }
    TotelCart();
  }, [cartItems]);

  return (
    <>
      {admin ? (
        <div className=" ">
          <React.Suspense fallback={<div>....loeading</div>}>
            <NavBarAdmin setAdmin={setAdmin} />
            <AminRoutes />
          </React.Suspense>
        </div>
      ) : (
        <CArtss.Provider value={{ cartItems, setCartItems }}>
          <div>
            <NavBar setAdmin={setAdmin} cartt={cartt} />
            <RoutesPage />
            <Footer />
          </div>
        </CArtss.Provider>
      )}
    </>
  );
}

export default App;
