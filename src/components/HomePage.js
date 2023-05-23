import { Link } from "react-router-dom";
import "../HomePageStyles.css"

export default function HomePage() {
    return (
        <div className="homepage-container">
            <h1>Home</h1>
            <div className="homepage-grid">
                <div className="homepage-box">
                    <Link to="classes">Class Dashboard</Link>
                </div>
                <div className="homepage-box">
                    <Link to="students">Student Directory</Link>
                </div>
                <div className="homepage-box">
                    <Link to="teachers">Teacher Directory</Link>
                </div>
                <div className="homepage-box">
                    <Link to="calendar">Calendar</Link>
                </div>
            </div>
        </div>
    )
}