import React, { useEffect, useState } from "react";
import Productcard from "./Productcard";
import { Link } from "react-router-dom";

function Panelcontainer({ category }) {
  const [Data, setData] = useState();
  useEffect(() => {
    fetch(`https://philipkart.onrender.com/product/${category}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, [Data]);
  return (
    <div className="container">
      <div className="panel1">
        <span>Best Of {category}</span>
        <Link to={`/seeall/${category}`}>
            <button>See All</button>
        </Link>
      </div>
      <div className="productCardConatiner">  
          <Productcard data={Data} />
      </div>         
    </div>
  );
}

export default Panelcontainer;
