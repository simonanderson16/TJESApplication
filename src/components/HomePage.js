import { Link, useNavigate } from "react-router-dom";
import "../HomePageStyles.css"
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import {useState, useEffect} from 'react';

export default function HomePage() {



    const navigate = useNavigate();

    const goToClassDashboard = () => {
        navigate("/classes");
    }

    const goToStudentDirectory = () => {
        navigate("/students");
    }

    const goToTeacherDirectory = () => {
        navigate("/teachers");
    }

    const goToCalendar = () => {
        navigate("/calendar");
    }

    return (
        <div className="homepage-container">
            <h1>Home</h1>
            <div className="homepage-grid">
                {/* <div className="homepage-box">
                    <Link to="classes">Class Dashboard</Link>
                </div> */}
                <button className="homepage-box" onClick={goToClassDashboard}>Class Dashboard</button>
                <button className="homepage-box" onClick={goToStudentDirectory}>Student Directory</button>
                <button className="homepage-box" onClick={goToTeacherDirectory}>Teacher Directory</button>
                <button className="homepage-box" onClick={goToCalendar}>Calendar</button>
                {/* <div className="homepage-box">
                    <Link to="students">Student Directory</Link>
                </div>
                <div className="homepage-box">
                    <Link to="teachers">Teacher Directory</Link>
                </div>
                <div className="homepage-box">
                    <Link to="calendar">Calendar</Link>
                </div> */}
            </div>
        </div>
    )
}
