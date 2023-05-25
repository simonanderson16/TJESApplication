import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css'


function Login() {
    const auth = getAuth();

    const navigate = useNavigate();

    const signin = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            navigate("/home");
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = "Incorrect Username or Password";
            document.getElementById('login-error-message').innerHTML = errorMessage;
        }
    }

    return (
        <div>
            <h1>TJES Dashboard Login</h1>
            <div className="login-container">
                <input className="login-input" placeholder="Email" id="login-input-email" />
                <div><input className="login-input" type="password" placeholder="Password" id="login-input-password" /></div>
                <button className="login-button" onClick={() => {
                    const email = document.getElementById('login-input-email').value;
                    const password = document.getElementById('login-input-password').value;
                    signin(email, password);
                }}>Sign In</button>
            </div>
            <p id="login-error-message"></p>
        </div>
    );
}

export default Login;