import React from 'react'
import Teacher from './Teacher'
function TeacherCollectionList({teacherCollection}) {
  console.log("result",teacherCollection)
  return (
    <>
      {teacherCollection.length === 0 ? 
      (<>
        <h1>No Results</h1>
      </>):(
        <>
        {Object.keys(teacherCollection).map((key, index) => 
            <div key = {index}>
                <Teacher 
                    firstname = {teacherCollection[key].firstName}
                    lastname = {teacherCollection[key].lastName}
                    email = {teacherCollection[key].email}
                    address = {teacherCollection[key].address}
                    birthday = {teacherCollection[key].birthday}
                />
            </div>  
        )}
        </>
      )}
        
    </>
  )
}

export default TeacherCollectionList