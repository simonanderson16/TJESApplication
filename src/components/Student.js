import React from 'react'

function Student({firstname, lastname, emailAddress, address, birthday}) {


  return (
    <>
      <h3 style = {{fontWeight: 'bold'}}>{firstname} {lastname}</h3>
      {emailAddress ? 
        (<p style = {{fontWeight: 'bold'}}>Email: {emailAddress} </p>):
        (<p style = {{fontWeight: 'bold'}}>Email: N/A</p>)
      }

      {address ? 
        (<p style = {{fontWeight: 'bold'}}>Address: {address} </p>):
        (<p style = {{fontWeight: 'bold'}}>Address: N/A</p>)
      }

      {birthday ? 
        (<p style = {{fontWeight: 'bold'}}>Birthday: {birthday} </p>):
        (<p style = {{fontWeight: 'bold'}}>Birthday: N/A</p>)
      }
    </>
  )
}

export default Student