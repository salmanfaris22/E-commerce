import "./App.css";
import Footer from "./Components/Footer/Footer";
import NavBar from "./Components/NavBar/NavBar";
import RoutesPage from "./Rountes/Routes";

function App() {
  return (
    <>
      <div>
        <NavBar />
        <RoutesPage />
        <Footer/>
      </div>
    </>
  );
}

export default App;
