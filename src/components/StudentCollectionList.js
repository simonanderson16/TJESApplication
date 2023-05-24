import React from 'react'
import Student from './Student'
function StudentCollectionList({studentCollection}) {
  //console.log("result",studentCollection)
  return (
    <>
      {studentCollection.length === 0 ? 
      (<>
        <h1>No Results</h1>
      </>):(
        <>
        {Object.keys(studentCollection).map((key, index) => 
            <div key = {index} className = "userContainer">
                <Student 
                    firstname = {studentCollection[key].firstName}
                    lastname = {studentCollection[key].lastName}
                    email = {studentCollection[key].email}
                    address = {studentCollection[key].address}
                    birthday = {studentCollection[key].birthday}
                />
            </div>  
        )}
        </>
      )}
        
    </>
  )
}

export default StudentCollectionList