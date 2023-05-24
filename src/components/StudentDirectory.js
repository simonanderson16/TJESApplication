import UserBuilder from "./UserBuilder";
import StudentCollectionList from "./StudentCollectionList";
import { useState, useEffect } from 'react'
import { getFirestore, getDocs, collection, where, query, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { getAuth } from "firebase/auth";

export default function StudentDirectory({ userCollection, isAdmin }) {
    //TODO: Add search bar that searches students by email
    // TODO: Make "add student" which is only viewable by an admin
    const [searchString, setSearchString] = useState('');
    const [filterSearch, setFilterSearch] = useState(false);
    const [filteredCollection, setFilteredCollection] = useState([]);
    const [buildingUser, setBuildingUser] = useState(false);

    //console.log(isAdmin);

    //function where if user hits enter on textarea, 
    const handleSearch = async (event) => {
        setSearchString(event.target.value);

    }

    const handleEnteredSearch = async (event) => {
        if (event.key === "Enter") {
            // Prevent page refresh
            // SRC: https://stackoverflow.com/questions/50193227/basic-react-form-submit-refreshes-entire-page
            event.preventDefault();
            console.log("string", searchString);
            const q = query(collection(db, "User"), where("userType", "==", "student"), where("firstName", "<=", searchString));
            let data = []
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            console.log("Data", data)
            setFilteredCollection(data)
            if (searchString.trim() === '') { // if they hit enter on empty field
                setFilterSearch(false)
                event.preventDefault();
            }
            else { // if they hit enter on non-empty field
                setFilterSearch(true)
                event.preventDefault();
            }
        }
    }


    return (
        <div className="student-directory-container">
            <h1>Student Directory</h1>
            <button hidden={!isAdmin} onClick={() => setBuildingUser(true)}>Add Student</button>
            <div hidden={!buildingUser}>
                <UserBuilder
                    userType={'student'}
                ></UserBuilder>
            </div>
            <div className="Search">
                <form >
                    <label> Search by name </label>
                    <input
                        type="text"
                        required
                        value={searchString}
                        onChange={handleSearch}
                        onKeyDown={handleEnteredSearch}
                    />
                </form>
                {searchString}
            </div>

            {filterSearch === true ?
                (<><StudentCollectionList studentCollection={filteredCollection} /></>) :
                (<><StudentCollectionList studentCollection={userCollection.filter((user) => user.userType === 'student')} /></>)}


        </div>
    )
}