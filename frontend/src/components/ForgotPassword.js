import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import axios from "axios";

const ForgotPassword = () => {
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const forgotPassword = async (e) => {
        e.preventDefault();

        const value = { email };

        try {
            const response = await axios.post(
                `http://localhost:5000/users/forgotPassword`, 
                value
            );

            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    if (isAuthenticated()) {
        navigate('/home');
    } else {
        return (
            <div className="container" style={{paddingTop: '10px'}}>
                <form className="box" style={{marginBottom: '-10px'}}>
                    <div className="title">Forgot Password</div>
                    <div className="field">
                        <input
                            className="input"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field" style={{marginTop:'20px'}}>
                        <button className="button is-success is-light" onClick={(e) => forgotPassword(e)}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ForgotPassword;