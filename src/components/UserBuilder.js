import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

function UserBuilder({ userType }) {
    //console.log(getAuth());
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
                <p>Set User Password:</p>
                <input id="userbuilder-password" type="password" />
                <p id="userbuilder-error-message"></p>
            </form>
            <div>
                <button id="userbuilder-submit" onClick={async () => {
                    const auth = getAuth();
                    const email = document.getElementById('userbuilder-email').value;
                    const password = document.getElementById('userbuilder-password').value
                    try{
                        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                        setDoc(doc(db, 'User', Math.random().toString()), {
                            firstName: document.getElementById('userbuilder-firstname').value,
                            lastName: document.getElementById('userbuilder-lastname').value,
                            emailAddress: email,
                            address: document.getElementById('userbuilder-address').value,
                            birthday: document.getElementById('userbuilder-birthday').value,
                            userType: userType,
                            uid: userCredential.user.uid
                        });
                        document.getElementById('userbuilder-form').submit();
                    } catch(error) {
                        document.getElementById('userbuilder-error-message').innerHTML = error;
                    }
                }}>Save</button>
                <button id="userbuilder-discard" onClick={() => document.getElementById('userbuilder-form').submit()}>Discard</button>
            </div>
        </>
    );
}

export default UserBuilder;