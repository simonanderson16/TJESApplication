import React, {useState} from 'react'
import Student from './Student'
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUser } from "../App";
import { doc, deleteDoc,updateDoc, collection, getDocs, arrayRemove } from "firebase/firestore";
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


  

  // Need to delete all references to a student in Class docs  
  const deleteStudent = async (e) =>{
    const classCollection = collection(db, "Class")
    getDocs(classCollection)
    .then((allDocs) => {
      allDocs.forEach((classdoc) => {
        const classDocRef = classdoc.ref
        classdoc.data().grades.forEach((gradeArrayItem)=>{
          if (gradeArrayItem.student.id === e.id){
            updateDoc(classDocRef,{
              grades: arrayRemove(gradeArrayItem)
            })            
          }
        })
      })
    })
    await deleteDoc(doc(db, "User", e.id));// delete student doc
    navigate(0); // Refresh the page
  }
  getIsAdmin();

  //SEE IF DELETE BUTTONS CAN DELETE ALL REFERENCES AS WELL
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
                  <FaTrashAlt 
                    color = 'rgb(34,34,78)' 
                    size='30px' 
                    cursor='pointer'
                    onMouseOver={({target})=>target.style.color="red"}
                    onMouseOut={({target})=>target.style.color = 'rgb(34,34,78)' }
                    onClick={() => deleteStudent(studentCollection[key])} 
                  />
                </div>
            </div>  
        )}
        </>
      )}
        
    </>
  )
}

export default StudentCollectionList