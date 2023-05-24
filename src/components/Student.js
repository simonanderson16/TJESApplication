import React from 'react'

function Student({firstname, lastname, emailAddress, address, birthday}) {


  // TODO: Need to hide some information based on who is logged in 
  return (
    <>
      <h3>Student: {firstname} {lastname}</h3>
      <p>{emailAddress}</p>
    </>
  )
}

export default Student