import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';


function Login() {
    const auth = getAuth();
    const [userID, setUserID] = useState();

    const signin = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log('success!');
            console.log(userCredential.user);
            console.log(auth.currentUser.uid);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            document.getElementById('login-error-message').innerHTML = errorMessage;
        }
    }

    return (
        <div>
            <h1>TJES SIS Sign In</h1>
            <input className="login-input" placeholder="Email" id="login-input-email" />
            <div><input className="login-input" type="password" placeholder="Password" id="login-input-password" /></div>
            <button className="login-input" onClick={() => {
                const email = document.getElementById('login-input-email').value;
                const password = document.getElementById('login-input-password').value;
                signin(email, password);
            }}>Sign In</button>
            <p id="login-error-message"></p>
        </div>
    );
}

export default Login;