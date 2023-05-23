import React from 'react'

function Student({firstname, lastname, email, address, birthday}) {


  // TODO: Need to hide some information based on who is logged in 
  return (
    <div>Student: {firstname} {lastname}</div>
  )
}

export default Student