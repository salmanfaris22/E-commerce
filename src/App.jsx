import React,{   useEffect, useState } from "react";

import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import RoutesPage from "./Rountes/Routes";
import { toast } from "react-toastify";
// import NavBarAdmin from "./Admin/AdminUser/Navbar/Navbar";

const AminRoutes =  React.lazy(()=>import("./Rountes/AminRoutes") )

const NavBarAdmin = React.lazy(()=>import('./Admin/AdminUser/Navbar/Navbar'));
function App() {
  const [admin, setAdmin] = useState(false);

 useEffect(()=>{
  if(localStorage.getItem("admin")){
    setAdmin(true)
  }

  const x =localStorage.getItem("name")
  if(x){
    
    toast.success(`welcome back ${x}`)
  }
 
 },[])



  return (
    <>
  
      {admin ? (
        <div className=" ">
          <React.Suspense fallback={<div>....loeading</div>}>
          <NavBarAdmin  setAdmin={setAdmin}/>
          <AminRoutes/>
          </React.Suspense>
        
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
