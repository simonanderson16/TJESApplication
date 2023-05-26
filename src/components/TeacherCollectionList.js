import React,{useState} from 'react'
import Teacher from './Teacher'
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUser } from "../App";
import {db} from "../firebase.js"
import {doc, deleteDoc, collection, getDocs,} from "firebase/firestore";
import Popups from './PopupComponents/Popup.js';
function TeacherCollectionList({teacherCollection}) {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false)
  const [deleteTeacher, setDeleteTeacher] = useState()


  const getIsAdmin = async () => {
    const response = await getUser();
    if (response?.userObject?.userType === 'admin')
        setIsAdmin(true);
    else
        setIsAdmin(false);
  }

  const deleteTeacherInitial = (e) =>{
    setButtonPopup(true)
    setDeleteTeacher(e)
  }
    
  const deleteTeacherFinal = async () =>{
    const classCollection = collection(db, "Class")
    getDocs(classCollection)
    .then((allDocs) => {
      allDocs.forEach((classdoc) => {
        if (classdoc.data().teacher.id === deleteTeacher.id){
          console.log(deleteTeacher.id, classdoc.id)
          deleteDoc(doc(db,"Class",classdoc.id))
        }
      })
    })
    await deleteDoc(doc(db, "User", deleteTeacher.id));// delete student doc
    navigate(0); // Refresh the page
  }
  getIsAdmin();
  return (
    <>
      {teacherCollection.length === 0 ? 
      (<>
        <h1>No Results</h1>
      </>):(
        <>
        {Object.keys(teacherCollection).map((key, index) => 
            <div key = {index} className = "userContainer">
                <Teacher 
                    firstname = {teacherCollection[key].firstName}
                    lastname = {teacherCollection[key].lastName}
                    emailAddress = {teacherCollection[key].emailAddress}
                    address = {teacherCollection[key].address}
                    birthday = {teacherCollection[key].birthday}
                />
                <div hidden={!isAdmin} >
                  <FaTrashAlt  
                    color = 'rgb(34,34,78)' 
                    size='30px' 
                    cursor='pointer'
                    onMouseOver={({target})=>target.style.color="red"}
                    onMouseOut={({target})=>target.style.color = 'rgb(34,34,78)' } 
                    onClick={() => deleteTeacherInitial(teacherCollection[key])} 
                  />
                </div>
                <Popups trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <h1> 
                      Are you sure you want to delete this teacher?
                    </h1>
                    <button className="add-student-button"
                      hidden={!isAdmin} onClick={() => deleteTeacherFinal()}>
                        delete
                    </button>
                  </Popups>
            </div>  
            
        )}
        </>
      )}
        
    </>
  )
}

export default TeacherCollectionList