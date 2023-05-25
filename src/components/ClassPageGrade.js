import {useState} from 'react'
import {doc, updateDoc,getDocs, arrayUnion, arrayRemove, collection, where, query } from "firebase/firestore"
import {db} from "../firebase"
import { useNavigate, useParams } from "react-router-dom";
export default function ClassPageGrade({document,dictGrade,dictId,userCollection, listId, studentCollection, admin}){
    const [changeGrade, setChangeGrade] = useState(false)
    const [newGrade, setNewGrade] = useState();
    const [currentStudent, setCurrentStudent] = useState();
    const [editStu, setEditStu] = useState(false);
    const [editSelection, setEditSelection] = useState();
    let totalGrade;
    const classID = useParams().id;
    const navigate = useNavigate();
    const handleSetChangeGrade = (e) => {
        setChangeGrade(true)
}

    const handleNewGrade = (e) => {
        setNewGrade(e.target.value)
    }

    const handleSelectStudentChange = (e) => {
        setCurrentStudent(e.target.value)
    }

    const handleSubmitButton = (e) =>{
        setChangeGrade(false)
        if(currentStudent === 'Select Student' || !currentStudent){
            return;
        }
        if(!Number(newGrade)) {
            return;
        }
        else{
            changingGrade(newGrade,currentStudent)
        }
    }
    const changingGrade = async(newgrade,id) => {
        const userRef = doc(db,"User",currentStudent)
        const removDict = {
            grade: Number(document.grades[dictGrade[userCollection[dictId[currentStudent]].id]].grade),
            student: userRef
        }

        const addDict = {
            grade: Number(newGrade),
            student: userRef
        }
        
        const classRef = doc(db,"Class",classID)
       await updateDoc(classRef, {
            grades: arrayRemove(removDict)
        })

        await updateDoc(classRef, {
            grades: arrayUnion(addDict)
        })

        navigate(0);
    }

    const handleSetEditStu = (e) =>{
        setEditStu(true)
    } 
    const handleEditSelection = (e) => {
        setEditSelection(e.target.value)
    }

    const handleEditButton = async() => {
        let idGrab;
        setEditStu(false)
        if(editSelection === '' || !editSelection){
            return;
        }
        for(let i = 0; i < userCollection.length; i++){
            if(userCollection[i].firstName + " " + userCollection[i].lastName === editSelection){
                idGrab = userCollection[i].id
            }
        }
        const userRef = doc(db,"User",idGrab)
        const classRef = doc(db,"Class",classID)
        for(let j=0; j < listId.length;j++){
            if(listId[j] === idGrab){
                const removeDict = {
                    grade: Number(document.grades[dictGrade[userCollection[dictId[idGrab]].id]].grade),
                    student: userRef
                }
                await updateDoc(classRef, {
                    grades: arrayRemove(removeDict)
                })
                navigate(0);
                return;
            }
        }
                const addDict = {
                    grade: Number(0),
                    student: userRef
                }
                await updateDoc(classRef, {
                    grades: arrayUnion(addDict)
                })
                navigate(0);
            }

    return(
        <>
        
        {!admin ? 
        <button className='edit-student-list-button' onClick={handleSetChangeGrade}>Edit Student Grades</button>
        : null}
        {changeGrade ? (<div className='add-remove-container'>
            <h3>Change Grade</h3>
            {userCollection ? (<>
            <div className='input-row'>
                <h4>Student:</h4>
                <select className='add-remove-select' value={currentStudent} onChange={handleSelectStudentChange}>
                    <option value={null}>Select Student</option>
                    {listId.map((student, index) => {return <option key={index} value={student}>{userCollection[dictId[student]].firstName + " " + userCollection[dictId[student]].lastName}</option>})}
                </select>
            </div>
            <div className='input-row'>
                <h4>New Grade:</h4> 
                <input className='add-remove-select' type="text" placeholder="Enter Grade" onChange={handleNewGrade}></input>
            </div>
            <button className='edit-student-list-button' onClick={handleSubmitButton}>Submit Change</button>

            </>

            ): (null)}
            
        </div>)
        : (null)}

        {admin ? 
        (<>
        <button className='edit-student-list-button' onClick={handleSetEditStu}>Edit Student List</button>
        </>) 
        : (null)}
        {editStu ? (<div className='add-remove-container'>
            <h3>Add/Remove Students</h3>
            {studentCollection.length > 0 ? (<>
            <p>If the chosen student is in the class, they will be removed. Otherwise, they will be added.</p>
            <select className='add-remove-select' value={editSelection} onChange={handleEditSelection}>
                <option value={null}>Select Student</option>
                {studentCollection.map((student,index) => {return <option key={index} value={student}>{student}</option>})}
            </select>
            <button className='add-remove-submit' onClick={handleEditButton}>Add/Remove Student</button>
            
            </>) : (null)}
        </div>) 
        : (null)}
        </>
    )
}