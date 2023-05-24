
import ClassDashboardRow from "./ClassDashboardRow";
import "../classDashboardStyles.css"
import { useEffect, useReducer, useRef, useState } from "react";
import { collection, query, where, getDocs, addDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function ClassDashboard({classCollection, gradeCollection, userCollection}) {

    let userType = 'teacher';
    let userID = '7c07MnIzeKYIxaIwjAZR'; // ID for john doe

    classCollection.forEach((singleClass) => {
        if(singleClass.teacher.id === userID) {
            console.log(singleClass.name);
        }
    })

    useEffect(() => {
        const getClassesForTeacher = async() => {

        }
        getClassesForTeacher();
    }, [])

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
        if(currentTeacherSelection === '' || !currentTeacherSelection) {
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
            (<div className="add-class-box">
                <h3>Add Class</h3>
                <div className="class-name-input">
                    <p>Class Name:</p>
                    <input type="text" placeholder="e.g. Biology" onChange={handleSetClassName}></input>
                </div>
                <div className="class-name-input">
                    <p>Teacher:</p>
                    <select value={currentTeacherSelection} onChange={handleSelectChange}>
                        <option value={null}>{''}</option>
                        {teacherCollection.map((teacher, index) => {return <option key={index} value={teacher.id}>{teacher.firstName + " " + teacher.lastName}</option>})}
                    </select>
                </div>
                <button onClick={handleSubmitButton}>Submit</button>
            </div>)
            :
            (null)}
            {userType==='admin' ? 
            <div className="admin-class-search">
                {/* <input type="text" placeholder="Search Class by Name" ref={textInputRef}/>
                <button onClick={performSearch}>Search</button> */}
                <form >
                    <label> Search Class by Name: </label>
                    <input
                    type = "text"
                    required
                    value = {searchString}
                    onChange={handleSearch}
                    onKeyDown = {handleEnteredSearch}
                    />
                </form>  
            </div>
            : null
            }
            {filterSearch === true ? 
                (Object.keys((classCollection).filter((classItem) => classItem.name === searchString)).map((item,index)=>
                    <div key = {index}>
                        <ClassDashboardRow name={classCollection[item].name} teacher={classCollection[item].teacher}/>
                    </div>
                )) 
                : userType === 'teacher' ?
                    (//user is a teacher
                    Object.keys(classCollection).map((item,index)=> {
                    return classCollection[item].teacher.id == userID ?
                    <div key = {index}>
                        <ClassDashboardRow name={classCollection[item].name} teacher={classCollection[item].teacher}/>
                    </div>
                    : null
                    }))
                    :
                    (//user is an admin and has not searched
                    Object.keys(classCollection).map((item,index)=>
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