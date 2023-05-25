import React, {useState} from 'react'
import Student from './Student'
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUser } from "../App";
import { doc, deleteDoc } from "firebase/firestore";
import {db} from "../firebase.js"


function StudentCollectionList({studentCollection}) {
  //console.log("result",studentCollection)
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);


  const getIsAdmin = async () => {
    const response = await getUser();
    if (response?.userObject?.userType === 'admin')
        setIsAdmin(true);
    else
        setIsAdmin(false);
  }


    
  const deleteStudent = async (e) =>{
    await deleteDoc(doc(db, "User", e.id));// delete student doc
    navigate(0); // Refresh the page
  }
  getIsAdmin();

  return (
    <>
      {studentCollection.length === 0 ? 
      (<>
        <h1>No Results</h1>
      </>):(
        <>
        {Object.keys(studentCollection).map((key, index) => 
            <div key = {index} className = "userContainer">
                <Student 
                    firstname = {studentCollection[key].firstName}
                    lastname = {studentCollection[key].lastName}
                    emailAddress = {studentCollection[key].emailAddress}
                    address = {studentCollection[key].address}
                    birthday = {studentCollection[key].birthday}
                />
                <div hidden={!isAdmin} className="delete">
                  <FaTrashAlt  className="home-button" onClick={() => deleteStudent(studentCollection[key])} />
                </div>
            </div>  
        )}
        </>
      )}
        
    </>
  )
}

export default StudentCollectionList