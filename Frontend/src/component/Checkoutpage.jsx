import React,{useEffect,useState} from 'react'

function Checkoutpage({TotalAmount}) {

    const [clientSec, setclientSec] = useState("");

  return (
    <div>Checkoutpage {TotalAmount}</div>
  )
}

export default Checkoutpage