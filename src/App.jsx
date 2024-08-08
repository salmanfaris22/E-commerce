import {   createContext, useEffect, useState } from "react";

import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import RoutesPage from "./Rountes/Routes";
import NavBarAdmin from "./Admin/AdminUser/Navbar/Navbar";

import AminRoutes from "./Rountes/AminRoutes";
export const Color = createContext()
function App() {
  const [admin, setAdmin] = useState(false);
  const [color,setColor]=useState({
    main:"white",
    primery:"black",
    secondry:"grey"
  })
 useEffect(()=>{
  if(localStorage.getItem("admin")){
    setAdmin(true)
  }
 },[])



  return (
    <>
     <Color.Provider value={{color,setColor}}>
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
      </Color.Provider>
    </>
  );
}

export default App;
