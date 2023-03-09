import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div style={{textAlign:'center'}}>
        <div className="title">
            Welcome to PetMap!!!
        </div>
        <div>
            <Link to="/login" className="button is-primary mt-2">Login</Link>
        </div>
    </div>
  )
};

export default Home;