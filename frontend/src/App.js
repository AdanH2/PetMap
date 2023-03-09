import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Home from "./components/Home";
 
function App() {
  return (
    <Router>
    <div className="container">
      <div className="columns">
        <div className="column is-half is-offset-one-quarter">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/home" element={<ProductList />}/>
            <Route path="/add" element={<AddProduct />}/>
            <Route path="/edit/:id" element={<EditProduct />}/>
          </Routes>
        </div>
      </div>
    </div>
    </Router>
  );
}
 
export default App;