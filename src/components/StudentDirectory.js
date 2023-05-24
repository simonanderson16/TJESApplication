import UserBuilder from "./UserBuilder";
import StudentCollectionList from "./StudentCollectionList";
import { useState, useEffect } from 'react'
import { getFirestore, getDocs, collection, where, query, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { getAuth } from "firebase/auth";
import { getUser } from "../App";
import "./Directory.css"

export default function StudentDirectory({ userCollection }) {
    //TODO: Add search bar that searches students by email
    const [searchString, setSearchString] = useState('')
    const [filterSearch, setFilterSearch] = useState(false);
    const [filteredCollection, setFilteredCollection] = useState([]);
    const [buildingUser, setBuildingUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const getIsAdmin = async () => {
        const response = await getUser();
        if (response?.userObject?.userType === 'admin')
            setIsAdmin(true);
        else
            setIsAdmin(false);
    }

    //function where if user hits enter on textarea, 
    const handleSearch = async (event) => {
        setSearchString(event.target.value);
    }

    const handleEnteredSearch = async (event) => {
        if (event.key === "Enter") {
            // Prevent page refresh
            // SRC: https://stackoverflow.com/questions/50193227/basic-react-form-submit-refreshes-entire-page
            event.preventDefault();
            let nameArray = searchString.split(' ')
            const q = query(collection(db, "User"), where("firstName", "in", nameArray), where("userType", "==", "student"));
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
    const buttonStyle = {
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: 'rgb(34, 34, 78)',
        color: '#eee',
        cursor: 'pointer',
        transition: 'all 0.4s ease'
      };
    getIsAdmin();

    return (
        <div >
            <h1>Student Directory</h1>
            <button style={{border: 'none',
                            borderRadius: '5px',
                            padding: '10px',
                            backgroundColor: 'rgb(34, 34, 78)',
                            color: '#eee',
                            cursor: 'pointer',
                            transition: 'all 0.4s ease'}} 
                    hidden={!isAdmin} onClick={() => setBuildingUser(true)}>Add Student</button>
            <div hidden={!buildingUser}>
                <UserBuilder
                    isStudent={true}
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
                (<div className="studentContain">
                    <StudentCollectionList studentCollection={filteredCollection} />
                </div>) :
                (<div className="studentContain">
                    <StudentCollectionList studentCollection={userCollection.filter((user) => user.userType === 'student')} />
                </div>)}
        </div>
    )
}