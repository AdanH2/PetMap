import { Link } from "react-router-dom";
import NavBar from "./NavBar";


const Home = () => {
  return (
    <div>
      <NavBar/>
      <div style={{textAlign:'center'}}>
          <div className="title">
              Welcome to PetMap!!!
          </div>
      </div>
    </div>
  )
};

export default Home;