import React from 'react';
import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';

function CategoryTab() {
  const [cat, setcat] = useState()
   useEffect(() => {
    fetch("http://localhost:5000/allproducts",{
      method: "get",
      headers:{
        "Content-Type" : "application/json"
      }
     })
     .then(res => res.json())
     .then(result => setcat(result))
   }, [])

  return (
    <div className="catagorycontainer">
    {
      cat ?
      cat.map((item) => {
        return(
          <Link to={`/seeall/${item.category}`}>
                       <a>{item.category}</a>
          </Link>
        )
      }) : <span>loading....</span>
    }
</div>
  )
}

export default CategoryTab