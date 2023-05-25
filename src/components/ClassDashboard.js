
import ClassDashboardRow from "./ClassDashboardRow";
import "../classDashboardStyles.css"
import { useEffect, useReducer, useRef, useState } from "react";
import { collection, query, where, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getUser } from "../App";
import { useNavigate } from "react-router-dom";

export default function ClassDashboard({classCollection, gradeCollection, userCollection}) {

    const [currentUser, setCurrentUser] = useState();
    const [userType, setUserType] = useState();
    const [userID, setUserID] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            let user = await getUser();
            setCurrentUser(user)
        }
        getUserData();
        // console.log(currentUser)
    }, [])

    useEffect(() => {
        if(currentUser) {
            setUserType(currentUser.userObject.userType);
            setUserID(currentUser.id);
            window.addEventListener('beforeunload', function(event) {
                localStorage.setItem("userID", currentUser.id);
                localStorage.setItem("userType", currentUser.userObject.userType);
            })
        }
    }, [currentUser])

useEffect(() => {
  const storedUserID = localStorage.getItem("userID");
  const storedUserType = localStorage.getItem("userType");
  if (storedUserID && storedUserType) {
    setUserID(storedUserID);
    setUserType(storedUserType);
  }
}, []);

    // console.log("current user" , currentUser)
    // const userType = currentUser.userObject.userType;
    // const userID = currentUser.id;
    // let userType = 'admin';
    // let userID = '7c07MnIzeKYIxaIwjAZR';


    useEffect(() => {
        const getClassesForTeacher = async() => {

        }
        getClassesForTeacher();
    }, [])

    const teacherCollection = userCollection.filter((user) => user.userType === 'teacher');

    const [searchString, setSearchString] = useState('');
    const [filterSearch, setFilterSearch] = useState(false);
    const [addingClass, setAddingClass] = useState(false);
    const [deletingClass, setDeletingClass] = useState(false);
    const [currentTeacherSelection, setCurrentTeacherSelection] = useState();
    const [currentDeleteClassSelection, setCurrentDeleteClassSelection] = useState();
    const [addClassName, setAddClassName] = useState();
    const [filteredCollection, setFilteredCollection] = useState([])

    const handleAddClassButton = (event) => {
        setAddingClass(true);
      };

      const handleDeleteClassButton = (event) => {
        setDeletingClass(true);
      };

      const handleSelectChange = (event) => {
        setCurrentTeacherSelection(event.target.value);
      };

      const handleClassSelectChange = (event) => {
        setCurrentDeleteClassSelection(event.target.value);
      };

      const handleSetClassName = (event) => {
        setAddClassName(event.target.value)
      }

      const addClass = async (className, teacherId) => {
        const teacherRef = doc(db, "User", teacherId);
      
        const classRef = await addDoc(collection(db, "Class"), {
          name: className,
          teacher: teacherRef,
          grades: [],
        });
        navigate(0); // refresh page
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

      const deleteClass = async (classID) => {
        const classRef = doc(db, "Class", classID);
        await deleteDoc(classRef);
        navigate(0); // refresh page
      };


      const handleConfrimDeleteButton = (event) => {
        if(currentDeleteClassSelection === '' || !currentDeleteClassSelection) {
            console.log("No selection")
            return;
        } else {
            console.log("Class to be deleted: ", currentDeleteClassSelection);
            deleteClass(currentDeleteClassSelection);
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
                let tmp = classCollection.filter((item)=>item.name === searchString)
                setFilteredCollection(tmp)
                console.log("classCollection", tmp)
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
            <button className='admin-class-dashboard-button' onClick={handleAddClassButton}>Add Class</button>
            <button className='admin-class-dashboard-button' onClick={handleDeleteClassButton}>Delete Class</button>
            </>
            : null}
            {addingClass ? 
            (<div className="add-class-box" style={{backgroundColor: "#eee"}}>
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
                <div className="cancel-submit-buttons">
                    <button className='admin-class-dashboard-button' onClick={() => setAddingClass(false)}>Cancel</button>
                    <button className='admin-class-dashboard-button' onClick={handleSubmitButton}>Submit</button>
                </div>
            </div>)
            :
            (null)}
            {deletingClass ? 
            (<div className="delete-class-box" style={{backgroundColor: "#eee"}}>
                <h3>Delete Class</h3>
                <div className="delete-class-dropdown">
                    <p>Class:</p>
                    <select value={currentDeleteClassSelection} onChange={handleClassSelectChange}>
                        <option value={null}>{''}</option>
                        {classCollection.map((classItem, index) => {return <option key={index} value={classItem.id}>{classItem.name}</option>})}
                    </select>
                </div>
                <div className="cancel-submit-buttons">
                    <button className='admin-class-dashboard-button' onClick={() => setDeletingClass(false)}>Cancel</button>
                    <button className='admin-class-dashboard-button' onClick={handleConfrimDeleteButton}>Confirm Delete</button>
                </div>
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
                (Object.keys(filteredCollection).map((item,index)=>
                    <div key = {index}>
                        <ClassDashboardRow name={filteredCollection[item].name} teacher={filteredCollection[item].teacher}/>
                    </div>
                )) 
                : 
                (userType === 'teacher' ?
                    (//user is a teacher
                    Object.keys(classCollection).map((item,index)=> {
                    return classCollection[item].teacher.id === userID ?
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
                )
            }
            {/* {Object.keys(classCollection).map((item,index)=>
                <div key = {index}>
                    <ClassDashboardRow name={classCollection[item].name} teacher={classCollection[item].teacher}/>
                </div>
            )} */}
        </div>
    )
}