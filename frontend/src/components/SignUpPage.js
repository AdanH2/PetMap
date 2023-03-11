import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const SignUpPage = () => {
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const navigate = useNavigate();

    const signUp = async (e) => {
        e.preventDefault();
        
        if(password !== secondPassword){
            alert("Passwords do not match!")
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            try {
                await axios.post('http://localhost:5000/users', {
                    passwordhash: hashedPassword,
                    username: userName,
                    first_name: firstName,
                    last_name: lastName,
                    email: email
                });
                navigate('/home');
            } catch (error) {
                console.log(error);
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

    return (
        <div className="container">
            <h1 className="title">Sign Up</h1>
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
};

export default SignUpPage;