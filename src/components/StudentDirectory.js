
import StudentCollectionList from "./StudentCollectionList";
import {useState, useEffect} from 'react'

export default function StudentDirectory({userCollection}) {
    //TODO: Add search bar that searches students by email
    // TODO: Make "add student" which is only viewable by an admin
    const [searchString, setSearchString] = useState('');
    const [filterSearch, setFilterSearch] = useState(false);

    //function where if user hits enter on textarea, 
    const handleSearch = (event) => {
        setSearchString(event.target.value)
    }
    
      const handleEnteredSearch = (event) => {
        if (event.key === "Enter"){
            // Prevent page refresh
            // SRC: https://stackoverflow.com/questions/50193227/basic-react-form-submit-refreshes-entire-page
            if (searchString.trim() === ''){ // if they hit enter on empty field
                setFilterSearch(false)
                event.preventDefault();
            }
            else{ // if they hit enter on non-empty field
                setFilterSearch(true)
                event.preventDefault();
            }
            event.preventDefault(); 
        }
        return false
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
            (<>
                <StudentCollectionList studentCollection = {userCollection.filter((user) => user.firstName === searchString)}/> 
            </>) : 
            (<>
                <StudentCollectionList studentCollection = {userCollection.filter((user) => user.userType==='student')}/> 
            </>)
            }
        </div>
    )
}