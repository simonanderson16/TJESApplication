import React from 'react'

function Teacher({firstname, lastname, emailAddress, address, birthday}) {


  // TODO: Need to hide some information based on who is logged in 
  return (
    <>
      <h3>Teacher: {firstname} {lastname}</h3>
      <p>{emailAddress}</p>
    </>
  )
}

export default Teacher