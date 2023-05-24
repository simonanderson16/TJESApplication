
import ClassDashboardRow from "./ClassDashboardRow";
import "../classDashboardStyles.css"
import { useReducer, useRef, useState } from "react";
import { collection, query, where, getDocs, addDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function ClassDashboard({classCollection, gradeCollection, userCollection}) {

    let userType = 'admin';

    const teacherCollection = userCollection.filter((user) => user.userType === 'teacher');

    const [searchString, setSearchString] = useState('');
    const [filterSearch, setFilterSearch] = useState(false);
    const [addingClass, setAddingClass] = useState(false);
    const [currentTeacherSelection, setCurrentTeacherSelection] = useState();
    const [addClassName, setAddClassName] = useState();


    const handleAddClassButton = (event) => {
        setAddingClass(true);
      };

      const handleSelectChange = (event) => {
        setCurrentTeacherSelection(event.target.value);
      };

      const handleSetClassName = (event) => {
        setAddClassName(event.target.value)
      }

      const addClass = async (className, teacherId) => {
        const teacherRef = doc(db, "User", teacherId);
      
        const classRef = await addDoc(collection(db, "Class"), {
          name: className,
          teacher: teacherRef,
        });
      
        // Add a subcollection "Grades" to the newly created class document
        await addDoc(collection(classRef, "Grades"), {
            // empty for now
        });
      };

      const handleSubmitButton = (event) => {
        setAddingClass(false);
        if(currentTeacherSelection === 'Select Teacher') {
            console.log("No selection")
            return;
        } else {
            console.log(currentTeacherSelection);
            addClass(addClassName, currentTeacherSelection);
        }
      };


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
            <button onClick={handleAddClassButton}>Add Class</button>
            </>
            : null}
            {addingClass ? 
            (<>
                <h3>Add Class</h3>
                <p>Class Name:</p>
                <input type="text" placeholder="Class Name" onChange={handleSetClassName}></input>
                <p>Teacher:</p>
                <select value={currentTeacherSelection} onChange={handleSelectChange}>
                    <option value={null}>Select Teacher</option>
                    {teacherCollection.map((teacher, index) => {return <option key={index} value={teacher.id}>{teacher.firstName + " " + teacher.lastName}</option>})}
                </select>
                <button onClick={handleSubmitButton}>submit</button>
            </>)
            :
            (null)}
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