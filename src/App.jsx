import { useState } from "react";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import RoutesPage from "./Rountes/Routes";
import NavBarAdmin from "./Admin/AdminUser/Navbar/Navbar";

function App() {
  const [admin, setAdmin] = useState(true);

  return (
    <>
      {admin ? (
        <div>
          <NavBarAdmin />
          <RoutesPage/>
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
