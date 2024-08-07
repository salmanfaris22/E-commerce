import {   useEffect, useState } from "react";

import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import RoutesPage from "./Rountes/Routes";
import NavBarAdmin from "./Admin/AdminUser/Navbar/Navbar";

import AminRoutes from "./Rountes/AminRoutes";

function App() {
  const [admin, setAdmin] = useState(false);
  
 useEffect(()=>{
  if(localStorage.getItem("admin")){
    setAdmin(true)
  }
 },[])



  return (
    <>
      {admin ? (
        <div className=" ">
          <NavBarAdmin  setAdmin={setAdmin}/>
          <AminRoutes/>
        </div>
      ) : (
        <div>
          <NavBar setAdmin={setAdmin} />
          <RoutesPage />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
