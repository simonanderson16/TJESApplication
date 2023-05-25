import React,{useState} from 'react'
import Teacher from './Teacher'
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUser } from "../App";
import { doc, deleteDoc } from "firebase/firestore";
import {db} from "../firebase.js"

function TeacherCollectionList({teacherCollection}) {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);


  const getIsAdmin = async () => {
    const response = await getUser();
    if (response?.userObject?.userType === 'admin')
        setIsAdmin(true);
    else
        setIsAdmin(false);
  }


    
  const deleteTeacher = async (e) =>{
    await deleteDoc(doc(db, "User", e.id));// delete student doc
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
                <div hidden={!isAdmin} className="delete">
                  <FaTrashAlt  className="home-button" onClick={() => deleteTeacher(teacherCollection[key])} />
                </div>
            </div>  
            
        )}
        </>
      )}
        
    </>
  )
}

export default TeacherCollectionList