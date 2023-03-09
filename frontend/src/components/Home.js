import { Link } from "react-router-dom";


const Home = () => {
  return (
    <div style={{textAlign:'center'}}>
        <div className="title">
            Welcome to PetMap!!!
        </div>
        <div>
            <Link to="/login" className="button is-primary mt-2" style={{marginRight: '20px'}}>Login</Link>
            <Link to="/signup" className="button is-primary mt-2">Sign Up</Link>
        </div>
    </div>
  )
};

export default Home;