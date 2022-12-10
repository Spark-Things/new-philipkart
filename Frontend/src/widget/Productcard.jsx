import React, { useState, useEffect } from "react";
import "./Productcard.css";
import { Link } from "react-router-dom";

function Productcard({ data }) {
  console.log(data);
  return (
    <>
        {data ? (
          data.map((item) => {
            return (
              <div className="cardLayout">
                <div className="imageconatiner"></div>
                <div className="detailcontainer">
                  <h5>{item.title}</h5>
                  <span>{item.price}</span>
                  <span>{item.discription}</span>
                </div>
              </div>
            );
          })
        ) : (
          <span>loading..</span>
        )}
    </>
  );
}

export default Productcard;
