export default function ClassDashboard({classCollection, gradeCollection, userCollection}) {
    console.log("dash,class", classCollection)
    console.log("dash,grade", gradeCollection)
    console.log("dash,user", userCollection)
    return (
        <div className="class-dashboard-container">
            <p>Class Dashboard</p>
        </div>
    )
}