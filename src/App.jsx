import { useState } from "react";

import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import RoutesPage from "./Rountes/Routes";
import NavBarAdmin from "./Admin/AdminUser/Navbar/Navbar";

import AminRoutes from "./Rountes/AminRoutes";

function App() {
  const [admin, setAdmin] = useState(false);

  return (
    <>
      {admin ? (
        <div className=" ">
          <NavBarAdmin />
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
