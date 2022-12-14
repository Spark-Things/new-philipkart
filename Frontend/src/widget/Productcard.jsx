import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Productcard.css";

function Productcard({ data }) {
  // console.log(data);
  return (
    <>
        {data ? (
          data.map((item) => {
            return (
            <Link to={`products/${item._id}`} >
              <div className="cardLayout">
                <div className="imageconatiner"></div>
                <div className="detailcontainer">
                  <h5>{item.title}</h5>
                  <span>{item.price}</span>
                  <span>{item.discription}</span>
                </div>
              </div>
              </Link>  
            );
          })
        ) : (
          <span>loading..</span>
        )}
    </>
  );
}

export default Productcard;
