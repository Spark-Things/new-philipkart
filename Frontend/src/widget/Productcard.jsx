import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Sass/Productcard.css";

function Productcard({ data }) {
  // console.log(data);
  return (
    <>
        {data ? (
          data.map((item,index) => {
            return (
            <Link to={`products/${item._id}`} >
              <div className="cardLayout" key={index}>
                <div className="imageconatiner">
                    <img src={item?.photo} />
                </div>
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
