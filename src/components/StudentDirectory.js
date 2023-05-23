
import Student from "./Student";
export default function StudentDirectory({userCollection}) {
    console.log("Student directory", userCollection[0])
    return (
        <div className="student-directory-container">
            <p>Student Directory</p>
            {userCollection.map((item,index)=>
            <div key = {index}>
                <Student 
                    key = {item}
                    name = {item.firstName}
                />
            </div>
        )}
        </div>
    )
}