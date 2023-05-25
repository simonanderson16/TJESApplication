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
        <button onClick={handleSetChangeGrade}>Edit Student Grade</button>
        : null}
        {changeGrade ? (<>
            <h3>Change Grade</h3>
            <p>New Grade:</p> 
            <input type="text" placeholder="Enter Grade" onChange={handleNewGrade}></input>
            <p>Student:</p>
            {userCollection ? (<>
            <select value={currentStudent} onChange={handleSelectStudentChange}>
                <option value={null}>Select Student</option>
                {listId.map((student, index) => {return <option key={index} value={student}>{userCollection[dictId[student]].firstName + " " + userCollection[dictId[student]].lastName}</option>})}
            </select>
            <br></br>
            <button onClick={handleSubmitButton}>Submit Change</button>
            </>

            ): (null)}
        </>)
        : (null)}

        {admin ? 
        (<>
        <button onClick={handleSetEditStu}>Edit Student List</button>
        </>) 
        : (null)}
        {editStu ? (<>
            <h3>Add/Remove Students</h3>
            {studentCollection.length > 0 ? (<>
            <p>Student List:</p>
            <select value={editSelection} onChange={handleEditSelection}>
                <option value={null}>Select Student</option>
                {studentCollection.map((student,index) => {return <option key={index} value={student}>{student}</option>})}
            </select>
            <br></br>
            <button onClick={handleEditButton}>Add/Remove Student</button>
            </>) : (null)}
        </>) 
        : (null)}
        </>
    )
}