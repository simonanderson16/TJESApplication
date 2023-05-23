import {collection, getDocs} from "firebase/firestore"
import {doc, updateDoc} from "firebase/firestore"
import {useEffect, useState} from 'react'


export default function ClassPage({userCollection, classCollection, gradeCollection}){
    let userType = 'student';
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

    function listOfStudents(){

    }

    function classTitle(){
        console.log(classCollection)
        let title = classCollection[0].name;
        return title;
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
                <h1 style={{float: "left", display: "inline-block"}} >t</h1>
                <h1 style={{float: "right", display: "inline-block"}} >t</h1>
            </div>
            <div className="student-list-container">

            </div>
        </div>
    )

}