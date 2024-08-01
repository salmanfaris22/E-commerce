
import { Link } from "react-router-dom";
import { Color } from "./Color"
const Home = () => {
    console.log(Color.main);
  return (
    <div
    style={{color:Color.main}}
    >
    <Link to={"/login"}>
    <button>Logine</button>
    </Link>
      
     
     

    </div>
  )
}

export default Home