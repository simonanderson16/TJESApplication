import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

function UserBuilder({ isStudent }) {

    
    return (
        <>
            <form id="userbuilder-form">
                <p>User First Name:</p>
                <input id="userbuilder-firstname" />
                <p>User Last Name:</p>
                <input id="userbuilder-lastname" />
                <p>User Email Address:</p>
                <input id="userbuilder-email" />
                <p>User Address:</p>
                <input id="userbuilder-address" />
                <p>User Birthday:</p>
                <input id="userbuilder-birthday" type="date" />
                <p hidden={isStudent}>Set User Password:</p>
                <input hidden={isStudent} id="userbuilder-password" type="password" />
                <p id="userbuilder-error-message"></p>
            </form>
            <div>
                <button style={{border: 'none',
                                borderRadius: '5px',
                                padding: '10px',
                                backgroundColor: 'rgb(34, 34, 78)',
                                color: '#eee',
                                cursor: 'pointer',
                                transition: 'all 0.4s ease'}} 
                        id="userbuilder-submit" onClick={async () => {
                    const auth = isStudent ? null : getAuth();
                    const email = document.getElementById('userbuilder-email').value;
                    const password = isStudent ? null : document.getElementById('userbuilder-password').value
                    try {
                        const userCredential = isStudent ? null : await createUserWithEmailAndPassword(auth, email, password);
                        setDoc(doc(db, 'User', Math.random().toString()), {
                            firstName: document.getElementById('userbuilder-firstname').value,
                            lastName: document.getElementById('userbuilder-lastname').value,
                            emailAddress: email,
                            address: document.getElementById('userbuilder-address').value,
                            birthday: document.getElementById('userbuilder-birthday').value,
                            userType: isStudent ? 'student' : 'teacher',
                            uid: isStudent ? '' : userCredential.user.uid
                        });
                        document.getElementById('userbuilder-form').submit();
                    } catch (error) {
                        document.getElementById('userbuilder-error-message').innerHTML = error;
                    }
                }}>Save</button>
                <button style = {{border: 'none',
                                borderRadius: '5px',
                                padding: '10px',
                                backgroundColor: 'rgb(34, 34, 78)',
                                color: '#eee',
                                cursor: 'pointer',
                                transition: 'all 0.4s ease'}}
                        id="userbuilder-discard" onClick={() => document.getElementById('userbuilder-form').submit()}>Discard</button>
            </div >
        </>
    );
}

export default UserBuilder;