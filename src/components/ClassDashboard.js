
import ClassDashboardRow from "./ClassDashboardRow";
import "../classDashboardStyles.css"
import { useReducer, useRef, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function ClassDashboard({classCollection, gradeCollection, userCollection}) {
    // console.log("dash,class", classCollection)
    // console.log("dash,grade", gradeCollection)
    // console.log("dash,user", userCollection)
    console.log(classCollection)

    const textInputRef = useRef(null);

    const performSearch = () => {
        const inputValue = textInputRef.current.value;
        const filteredValues = Object.values(classCollection).filter((classItem) => classItem.name === inputValue);
        console.log(filteredValues);
    }

    let userType = 'admin';

    return (
        <div className="class-dashboard-container">
            <h1>{userType==='admin' ? "All Classes" : "My Classes"}</h1>
            {userType==='admin' ?
            <> 
            <button>Add Class</button>
            <div className="admin-class-search">
                <input type="text" placeholder="Search Class by Name" ref={textInputRef}/>
                <button onClick={performSearch}>Search</button>
            </div>
            </>
            : null}
            {Object.keys(classCollection).map((item,index)=>
                <div key = {index}>
                    <ClassDashboardRow name={classCollection[item].name} teacher={classCollection[item].teacher}/>
                </div>
            )}
        </div>
    )
}