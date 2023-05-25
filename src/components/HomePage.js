import { useNavigate } from "react-router-dom";
import { user } from '../App.js';
import "../HomePageStyles.css"

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
                <button className="homepage-box" onClick={goToClassDashboard}>Class Dashboard</button>
                <button className="homepage-box" onClick={goToStudentDirectory}>Student Directory</button>
                <button className="homepage-box" onClick={goToTeacherDirectory}>Teacher Directory</button>
                <button className="homepage-box" onClick={goToCalendar}>Calendar</button>
            </div>
        </div>
    )
}
