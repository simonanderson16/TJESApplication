import {collection, getDocs} from "firebase/firestore"
import {doc, getDoc} from "firebase/firestore"
import {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import {db} from "../firebase"
import ClassPageNames from "./ClassPageNames"
import ClassPageGrade from "./ClassPageGrade"
import { getUser } from "../App";


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
    const [isAdmin, setIsAdmin] = useState(false);
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
    
    const getIsAdmin = async () => {
        const response = await getUser();
        if (response?.userObject?.userType === 'admin')
            setIsAdmin(true);
        else
            setIsAdmin(false);
    }
    getIsAdmin();
    return(
        <div className="class-page-container">
        <div className="class-title-teacher-container">
             <ClassPageNames document={isDocSnap} userCollection={isUsers} admin={isAdmin}/>
        </div>
        <div className='admin-Controls'>

        </div>
    </div>
    )

}