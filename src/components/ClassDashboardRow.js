import "../classDashboardStyles.css"


export default function ClassDashboardRow() {
    return (
        <div className="class-dashboard-row">
            <p className="class-name"> Class Name </p>
            <p className="teacher-name"> Teacher </p>
            <p className="row-grade"> Grade </p>
        </div>
    )
}