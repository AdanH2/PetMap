import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from "react-auth-kit";
import axios from "axios";

const ResetPassword = () => {
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // call axios.post("/users/forgotPassword")
    const resetPassword = async (e) => {
        e.preventDefault();

        const value = { password };

        try {
            const response = await axios.post(
                `http://localhost:5000/users/forgotPassword`, 
                value
            );

            alert("Use the following link to reset password: " + response.data.message);
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
                    <div className="title">Reset Password</div>
                    <div className="field">
                        <input
                            className="input"
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="field">
                        <input
                            className="input"
                            type="text"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="field" style={{marginTop:'20px'}}>
                        <button className="button is-success is-light" onClick={(e) => resetPassword(e)}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ResetPassword;