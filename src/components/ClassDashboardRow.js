import "../classDashboardStyles.css"
import { getDocs, doc, getDoc, collection, query, where } from "firebase/firestore"
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function ClassDashboardRow({name, teacher}) {

    const teacherID = teacher.id;
    const [teacherName, setTeacherName] = useState();
    const [classID, setClassID] = useState();

    const classCollectionsRef = collection(db, "Class");
    const navigate = useNavigate();


    useEffect(() => {
        const getClassID = async () => {
            const q = query(collection(db, "Class"), where("name", "==", name));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
            setClassID(doc.id);
            });
        };
        getClassID();
    }, [])

    getDoc(doc(db, "User", teacherID))
        .then((doc) => setTeacherName(doc.data().firstName + " " + doc.data().lastName))


    const goToClassPage = () => {
        navigate(`/classes/class/${classID}`)
    }

    return (
        <div className="class-dashboard-row" onClick={goToClassPage}>
            <p className="class-name">{name}</p>
            <p className="teacher-name">Teacher: {teacherName}</p>
        </div>
    )
}