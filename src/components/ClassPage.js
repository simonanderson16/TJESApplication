import {collection, getDocs} from "firebase/firestore"
import {doc, getDoc} from "firebase/firestore"
import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import {db} from "../firebase"
import ClassPageNames from "./ClassPageNames"
import ClassPageGrade from "./ClassPageGrade"



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
    


    //Teacher function
    function editStudentGrade(){

    }

    //Admin function
    function editStudents(){

    }
    return(
        <div className="class-page-container">
        <div className="class-title-teacher-container">
             <ClassPageNames document={isDocSnap} userCollection={isUsers}/>
        </div>
        <div className='admin-Controls'>

        </div>
    </div>
    )

}