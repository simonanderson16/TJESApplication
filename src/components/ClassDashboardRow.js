import "../classDashboardStyles.css"
import { getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "../firebase";
import { useState } from "react";


export default function ClassDashboardRow({name, teacher}) {

    const teacherID = teacher.id;
    const [teacherName, setTeacherName] = useState();
    

    getDoc(doc(db, "User", teacherID))
        .then((doc) => setTeacherName(doc.data().firstName + " " + doc.data().lastName))


    console.log("teacher: ", teacher.id)

    return (
        <div className="class-dashboard-row">
            <p className="class-name">Class Name: {name}</p>
            <p className="teacher-name">Teacher: {teacherName}</p>
        </div>
    )
}