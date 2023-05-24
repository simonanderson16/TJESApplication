
import ClassDashboardRow from "./ClassDashboardRow";
import "../classDashboardStyles.css"
import { useReducer, useRef, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function ClassDashboard({classCollection, gradeCollection, userCollection}) {

    let userType = 'admin';

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

    // console.log("dash,class", classCollection)
    // console.log("dash,grade", gradeCollection)
    // console.log("dash,user", userCollection)
    console.log(classCollection)

    const textInputRef = useRef(null);

    const performSearch = () => {
        const inputValue = textInputRef.current.value;
        const filteredValues = Object.values(classCollection).filter((classItem) => classItem.name === inputValue);
        console.log(filteredValues);
    }

    return (
        <div className="class-dashboard-container">
            <h1>{userType==='admin' ? "All Classes" : "My Classes"}</h1>
            {userType==='admin' ?
            <> 
            <button>Add Class</button>
            <div className="admin-class-search">
                {/* <input type="text" placeholder="Search Class by Name" ref={textInputRef}/>
                <button onClick={performSearch}>Search</button> */}
                <form >
                    <label> Search by class name </label>
                    <input
                    type = "text"
                    required
                    value = {searchString}
                    onChange={handleSearch}
                    onKeyDown = {handleEnteredSearch}
                    />
                </form>  
            </div>
            </>
            : null}
            {filterSearch === true ? 
            (Object.keys((classCollection).filter((classItem) => classItem.name === searchString)).map((item,index)=>
                <div key = {index}>
                    <ClassDashboardRow name={classCollection[item].name} teacher={classCollection[item].teacher}/>
                </div>
            )) : 
            (Object.keys(classCollection).map((item,index)=>
            <div key = {index}>
                <ClassDashboardRow name={classCollection[item].name} teacher={classCollection[item].teacher}/>
            </div>
        ))
            }
            {/* {Object.keys(classCollection).map((item,index)=>
                <div key = {index}>
                    <ClassDashboardRow name={classCollection[item].name} teacher={classCollection[item].teacher}/>
                </div>
            )} */}
        </div>
    )
}