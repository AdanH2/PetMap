import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    const saveLoginInfo = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/users', {
                passwordhash: password,
                username: userName,
                salt: "ajsnfhtsgenvxtws"
            });
            navigate('/home');
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
                    <button className="button is-primary">Log In</button>
                </div>
            </form>
        </div>
    )
};

export default Login;