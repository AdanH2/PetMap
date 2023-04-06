import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RequireAuth } from "react-auth-kit";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import Home from "./components/Home";
import Map from "./components/Map";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";

function App() {
    return (
        <Router>
            <div className="columns">
                <div className="column">
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        
                        <Route path="/map" element={
                                <RequireAuth loginPath="/login">
                                    <Map />
                                </RequireAuth>
                            }
                        />
                        <Route path="/profile" element={
                                <RequireAuth loginPath="/login">
                                    <Profile />
                                </RequireAuth>
                            }
                        />
                        <Route path="/home" element={
                                <RequireAuth loginPath="/login">
                                    <ProductList />
                                </RequireAuth>
                            }
                        />
                        <Route path="/add" element={
                                <RequireAuth loginPath="/login">
                                    <AddProduct />
                                </RequireAuth>
                            }
                        />
                        <Route path="/edit/:id" element={
                                <RequireAuth loginPath="/login">
                                    <EditProduct />
                                </RequireAuth>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;