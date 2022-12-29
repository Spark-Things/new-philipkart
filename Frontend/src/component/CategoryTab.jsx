import React from 'react';
import { useEffect,useState } from "react";
import { Link } from 'react-router-dom';

function CategoryTab() {
  var cat = ["Shoes","Mobile","TV","Electronic","Other"];
  return (
    <div className="catagorycontainer">
    {
      cat ?
      cat.map((item) => {
        return(
          <Link to={`/seeall/${item}`}>
                       <a>{item}</a>
          </Link>
        )
      }) : <span>loading....</span>
    }
</div>
  )
}

export default CategoryTab