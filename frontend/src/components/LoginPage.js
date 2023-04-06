import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSignIn, useIsAuthenticated } from "react-auth-kit";

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    const signIn = useSignIn();
    const isAuthenticated = useIsAuthenticated();

    const loginUser = async (e) => {
        e.preventDefault();

        const values = { userName, password }
        
        try{
            const response = await axios.post(
                `http://localhost:5000/users/login`, 
                values
            );
            if (signIn(
                {
                    token: response.data.token,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: { 
                        email: response.data.email,
                        username: values.userName
                    },
                }
            )){
                alert(response.data.message);
                navigate('/home');
            };
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    const togglePassword = () => {
        var x = document.getElementById("passwordText");

        if (x.type === "password"){
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    if (isAuthenticated()) {
        navigate('/home');
    } else {
        return (
            <div className="container" style={{paddingTop: '10px'}}>
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
                            id="passwordText"
                            className="input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <input type="checkbox" style={{marginTop: '20px'}} onClick={togglePassword}/>  Show Password
                </form>

                <div className="field">
                    <button className="button is-primary" style={{marginTop:'10px'}} onClick={(e) => loginUser(e)}>Log In</button>
                </div>
            </div>
        )
    }
};

export default LoginPage;