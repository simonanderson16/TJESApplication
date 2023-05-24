
import TeacherCollectionList from "./TeacherCollectionList";
import { useState, useEffect } from 'react'
import { getFirestore, getDocs, collection, where, query } from "firebase/firestore";
import { db } from "../firebase.js";
import UserBuilder from "./UserBuilder";
import { getUser } from "../App";

export default function TeacherDirectory({ userCollection }) {
    // TODO: Make "add student" which is only viewable by an admin
    const [searchString, setSearchString] = useState('');
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
        setSearchString(event.target.value)
    }

    const handleEnteredSearch = async (event) => {
        if (event.key === "Enter") {
            // Prevent page refresh
            // SRC: https://stackoverflow.com/questions/50193227/basic-react-form-submit-refreshes-entire-page
            event.preventDefault();
            let nameArray = searchString.split(' ')
            const q = query(collection(db, "User"), where("firstName", "in", nameArray), where("userType", "==", "teacher"));

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

    getIsAdmin();

    return (
        <div >
            <h1>Teacher Directory</h1>
            <button hidden={!isAdmin} onClick={() => setBuildingUser(true)}>Add Teacher</button>
            <div hidden={!buildingUser}>
                <UserBuilder
                    isStudent={false}
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
                (<><TeacherCollectionList teacherCollection={filteredCollection} /></>) :
                (<><TeacherCollectionList teacherCollection={userCollection.filter((user) => user.userType === 'teacher')} /></>)}
        </div>
    )
}