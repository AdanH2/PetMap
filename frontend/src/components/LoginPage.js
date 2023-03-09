import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axios.get(`http://localhost:5000/users/${userName}`);
            const retrievedPassword = response.data.passwordhash;

            bcrypt.compare(password, retrievedPassword, function(err, isMatch){
                if(err){
                    alert("Incorrect Username.");
                    throw err;
                } else if(!isMatch){
                    alert("Incorrect Password.")
                    console.log("Passwords do not match.");
                } else {
                    navigate('/home');
                    alert("Welcome Back!")
                    console.log("Passwords match.");
                }
            });    
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className="title">Login</h1>
            <form>
                <div className="field">
                    <input
                        className="input"
                        type="text"
                        placeholder="User Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>

                <div className="field">
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </form>

            <div className="field">
                <button className="button is-primary" style={{marginTop:'10px'}} onClick={(e) => loginUser(e)}>Log In</button>
            </div>
        </div>
    )
};

export default LoginPage;