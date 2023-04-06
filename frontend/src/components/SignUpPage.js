import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";

const SignUpPage = () => {
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const navigate = useNavigate();
    const signIn = useSignIn();
    const isAuthenticated = useIsAuthenticated();

    const signUp = async (e) => {
        e.preventDefault();
        
        if(password !== secondPassword){
            alert("Passwords do not match!")
        } else {
            try {
                const response = await axios.post('http://localhost:5000/users/register', {
                    password: password,
                    username: userName,
                    first_name: firstName,
                    last_name: lastName,
                    email: email
                });
                if (signIn(
                    {
                        token: response.data.token,
                        expiresIn: 3600,
                        tokenType: "Bearer",
                        authState: { 
                            email: response.data.email,
                            username: userName
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
    }

    const togglePassword = () => {
        var x = document.getElementsByName("passwordText");

        if (x[0].type === "password"){
            x[0].type = "text";
            x[1].type = "text";
        } else {
            x[0].type = "password";
            x[1].type = "password";
        }
    }

    if (isAuthenticated()) {
        navigate('/home');
    } else {
        return (
            <div className="container" style={{paddingTop: '10px'}}>
                <h1 className="title">Sign Up!!!</h1>
                <form onSubmit={signUp}>
                    <div className="field">
                        <input
                            className="input"
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <input
                            className="input"
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <input
                            className="input"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

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
                            name="passwordText"
                            className="input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <div className="field">
                        <input
                            name="passwordText"
                            className="input"
                            type="password"
                            placeholder="Re-enter Password"
                            value={secondPassword}
                            onChange={(e) => setSecondPassword(e.target.value)}
                            required
                        />

                        <input type="checkbox" style={{marginTop: '20px'}} onClick={togglePassword}/>  Show Password
                    </div>

                    <div className="field">
                        <button className="button is-primary" style={{marginTop: '10px'}}>Sign Up</button>
                    </div>
                </form>
            </div>
        )
    }
};

export default SignUpPage;