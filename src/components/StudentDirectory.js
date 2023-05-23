
import Student from "./Student";
import StudentCollectionList from "./StudentCollectionList";
export default function StudentDirectory({userCollection}) {
    //TODO: Add search bar that searches students by email
    // TODO: Make "add student" which is only viewable by an admin
    return (
        <div className="student-directory-container">
            <p>Student Directory</p>
            <StudentCollectionList studentCollection = {userCollection.filter((user) => user.userType==='student')}/> 
        </div>
    )
}