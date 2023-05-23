import React from 'react'
import Student from './Student'
function StudentCollectionList({studentCollection}) {
  console.log("Student",studentCollection[0])
  return (
    <>
        {Object.keys(studentCollection).map((key, index) => 
            <div key = {index}>
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
  )
}

export default StudentCollectionList