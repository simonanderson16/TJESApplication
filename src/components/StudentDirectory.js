
import StudentCollectionList from "./StudentCollectionList";
import {useState, useEffect} from 'react'
import { getFirestore, getDocs, collection, where, query } from "firebase/firestore"; 
import {db} from "../firebase.js"

export default function StudentDirectory({userCollection}) {
    //TODO: Add search bar that searches students by email
    // TODO: Make "add student" which is only viewable by an admin
    const [searchString, setSearchString] = useState('')
    const [filterSearch, setFilterSearch] = useState(false);
    const [filteredCollection, setFilteredCollection] = useState([])


    //function where if user hits enter on textarea, 
    const handleSearch = async (event) => {
        setSearchString(event.target.value)
        console.log(searchString)
        
   
    }
    
      const handleEnteredSearch = async (event) => {
        if (event.key === "Enter"){
            // Prevent page refresh
            // SRC: https://stackoverflow.com/questions/50193227/basic-react-form-submit-refreshes-entire-page
            event.preventDefault(); 
            let tempArray = searchString.split(' ')
            const q = query(collection(db, "User"),where("firstName", "in", tempArray), where("userType", "==", "student" ) );
            let data = []
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            });
            console.log("Data",data)
            setFilteredCollection(data)
            if (searchString.trim() === ''){ // if they hit enter on empty field
                setFilterSearch(false)
                event.preventDefault();
            }
            else{ // if they hit enter on non-empty field
                setFilterSearch(true)
                event.preventDefault();
            }
        }
      }


    return (
        <div className="student-directory-container">
            <h1>Student Directory</h1>
            <div className = "Search">
                <form >
                    <label> Search by name </label>
                    <input
                    type = "text"
                    required
                    value = {searchString}
                    onChange={handleSearch}
                    onKeyDown = {handleEnteredSearch}
                    />
                </form>  
                {searchString}
            </div>

            {filterSearch === true ? 
            (<div className = "studentContainer">
                <div>True</div>
                <StudentCollectionList studentCollection={filteredCollection}/>
            </div>):
            (<div className = "studentContainer">
                <div>False</div>
                <StudentCollectionList studentCollection={userCollection.filter((user) => user.userType==='student')}/>
            </div>)}

            
        </div>
    )
}