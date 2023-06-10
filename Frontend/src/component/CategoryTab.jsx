import React from 'react';
import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';

function CategoryTab() {
  var cat = ["Shoes","Mobile","TV","Electronic"];
  return (
    <div className="catagorycontainer">
    {
      cat ?
      cat.map((item) => {
        return(
          <Link to={`/seeall/${item}`}>
                       <span>{item}</span>
          </Link>
        )
      }) : <span>loading....</span>
    }
</div>
  )
}

export default CategoryTab