import {collection, getDocs} from "firebase/firestore"
import {doc, getDoc} from "firebase/firestore"
import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import {db} from "../firebase"
import ClassPageNames from "./ClassPageNames"



/*
const [gradeCollection, setGradeCollection] = useState([])
    useEffect(() => {
        getDocs(collection(db, collectionName3))
        .then((allDocs) => 
        {let data = []
          allDocs.forEach((doc) => {
            data.push({...doc.data(), id:doc.id})
          })
          console.log(data)
          setGradeCollection(data)
        }) 
    },[])  
*/
export default function ClassPage({userCollection, classCollection}){
    const [isDocSnap, setDocSnap] = useState();
    const classID = useParams().id;
    const docRef = doc(db, "Class", classID)
    const [isUsers, setUsers] = useState([]);
    useEffect(() => {
        const data = async() => {
            console.log("hey")
            const dataGrab = await getDoc(docRef)
            if(dataGrab.exists()){
                setDocSnap(dataGrab.data())
            }
            else{
                console.log("no doc yet bucko")
            }
        };
        data();
        if(userCollection){
            setUsers(userCollection)
        }
    },[userCollection])
    
    function studentsGrade(){

    }

    function getTeacherName(){
        let teacher = classCollection[0].teacher.id
        for(let i = 0; i < classCollection.length(); i++){
            if(userCollection[i].id === teacher){
                return (userCollection[i].firstName + " " + userCollection[i].lastName)
            }
        }

    }

    //Teacher function
    function editStudentGrade(){

    }

    //Admin function
    function editTeacher(){

    }

    //Admin function
    function editStudents(){

    }
    return(
        <div className="class-page-container">
        <div className="class-title-teacher-container">
             <ClassPageNames document={isDocSnap} userCollection={isUsers}/>
        </div>
        <div className="student-list-container">

        </div>
    </div>
    )

}