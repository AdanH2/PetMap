import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const Login = () => {
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const saveLoginInfo = async (e) => {
        e.preventDefault();

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        try {
            await axios.post('http://localhost:5000/users', {
                passwordhash: hashedPassword,
                username: userName,
                salt: salt
            });
            //navigate('/home');
        } catch (error) {
            console.log(error);
        }
    }

    const loginUser = async (e) => {
        e.preventDefault();
        
        try{
            const response = await axios.get(`http://localhost:5000/users/${userName}`);
            const retrievedPassword = response.data.passwordhash;

            bcrypt.compare(password, retrievedPassword, function(err, isMatch){
                if(err){
                    throw err;
                } else if(!isMatch){
                    console.log("Passwords do not match.");
                } else {
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
            <form onSubmit={saveLoginInfo}>
                <div className="field">
                    <input
                        className="input"
                        type="text"
                        placeholder="User Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className="field">
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="field">
                    <button className="button is-primary">Sign Up</button>
                </div>
            </form>

            <div className="field">
                <button className="button is-primary" onClick={(e) => loginUser(e)}>Log In</button>
            </div>
        </div>
    )
};

export default Login;