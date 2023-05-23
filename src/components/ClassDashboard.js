import ClassDashboardRow from "./ClassDashboardRow";
import "../classDashboardStyles.css"

export default function ClassDashboard() {

    let userType = 'admin';

    return (
        <div className="class-dashboard-container">
            <h1>{userType==='admin' ? "All Classes" : "My Classes"}</h1>
            {userType==='admin' ?
            <> 
            <button>Add Class</button>
            <div className="admin-class-search">
                <input type="text" placeholder="Search Class by Name"/>
                <button>Search</button>
            </div>
            </>
            : null}
            <ClassDashboardRow/>
            <ClassDashboardRow/>
            <ClassDashboardRow/>
            <ClassDashboardRow/>
            <ClassDashboardRow/>

        </div>
    )
}