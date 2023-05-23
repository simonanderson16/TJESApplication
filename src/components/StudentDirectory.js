
import StudentCollectionList from "./StudentCollectionList";
import {useState, useEffect} from 'react'

export default function StudentDirectory({userCollection}) {
    //TODO: Add search bar that searches students by email
    // TODO: Make "add student" which is only viewable by an admin
    const {enteredSearch, setEnteredSearch} = useState("")
    const {filterSearch, setFilterSearch} = useState(false)

    //function where if user hits enter on textarea, 
    const handleSearch = (event) => {
        setEnteredSearch(event.target.value)
    }
    
      const handleEnteredSearch = (event) => {
        if (event.key === "Enter"){
            // Prevent page refresh
            // SRC: https://stackoverflow.com/questions/50193227/basic-react-form-submit-refreshes-entire-page
            if (enteredSearch.strip() === ""){
                setFilterSearch(false)
            }
            else{
                setFilterSearch(true)
            }
            event.preventDefault(); 
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
                    value = {enteredSearch}
                    onChange={handleSearch}
                    onKeyDown = {handleEnteredSearch}
                    />
                </form>  
            </div>
            <StudentCollectionList studentCollection = {userCollection.filter((user) => user.userType==='student')}/> 
        </div>
    )
}