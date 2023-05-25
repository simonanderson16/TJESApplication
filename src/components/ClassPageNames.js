
import { collection, query, where, getDocs } from "firebase/firestore";
import {db} from "../firebase"
import ClassPageGrade from "./ClassPageGrade"

export default function ClassPageNames({document, userCollection, admin}){

    const dictGrade = {}
    const dictId = {}
    const listOfStu = []
    const actualListOfStu = []
    const studentData = []
    const testIdea = []
    let totalGrade = 0;
    function averageGrade(){
        for(let i=0; i < document.grades.length; i++){
            totalGrade += document.grades[i].grade
        }
        totalGrade = totalGrade/document.grades.length
        return totalGrade
    }

    function getTeacherName(){
        if(userCollection.length != 0){
            if(document){
            averageGrade()
            let teacherId = document.teacher.id
            for(let i = 0; i < userCollection.length; i++){
                if(userCollection[i].id === teacherId){
                    return userCollection[i].firstName + " " + userCollection[i].lastName
                }
            }
            return "failed"
        }
        }
    }

    function testListOfStudents(){
        if(document){
            for(let i = 0; i < document.grades.length; i++){
                listOfStu.push(document.grades[i].student.id)
                dictGrade[document.grades[i].student.id] = i
            }
        }

        if(document){
            for(let j = 0; j < listOfStu.length; j++){
                for(let k = 0; k < userCollection.length;k++){
                    if(userCollection[k].id === listOfStu[j]){
                        actualListOfStu.push(userCollection[k].firstName + " " + userCollection[k].lastName + ", Grade: " + document.grades[dictGrade[userCollection[k].id]].grade);
                        testIdea.push({name: userCollection[k].firstName + " " + userCollection[k].lastName, grade: document.grades[dictGrade[userCollection[k].id]].grade })
                        dictId[(userCollection[k].id).toString()] = k
                        
                    }
                }

            }
        }
        console.log(testIdea)
        return testIdea
    }
    /*
    function listOfStudents(){
        let listOfStu = [];
        let actualListOfStu = [];
        if(document){
            for(let i = 0; i < document.students.length; i++){
                listOfStu.push(document.students[i].id)
            }
        }

        if(document){
            for(let j=0; j < listOfStu.length; j++){
                for(let k=0; k < userCollection.length; k++){
                    if(userCollection[k].id === listOfStu[j]){
                        actualListOfStu.push(userCollection[k].firstName + " " + userCollection[k].lastName);
                    }
                }
            }
            
        }
        return actualListOfStu
        
    }
    */
    function classTitle(){
        if(document){
            getStudents()
            return document.name
        }
        
    }

    const getStudents = async () =>{
        
        const q = query(collection(db,"User"),where("userType",'==',"student"));
        const querySnapShot = await getDocs(q)
        querySnapShot.forEach((doc) => {
            studentData.push(doc.data().firstName + " " + doc.data().lastName)
        })

    }
    return (
        <>
            <h1 style={{ display: "inline-block"}}> {classTitle()}<br></br>{getTeacherName()}</h1>
            <br></br>
            Average Grade of Class: {totalGrade} 
            <h3>Students:</h3>
            {testListOfStudents().map((item,index) => {
                return <div key={index}>
                    <li>{item.name} {item.grade}</li>
                </div>
            } )}
            <br></br>
            <ClassPageGrade document={document} dictId={dictId} dictGrade={dictGrade} userCollection={userCollection} listId={listOfStu} studentCollection={studentData} admin={admin}/>
            <br></br>
            
 
        </>
    )
}