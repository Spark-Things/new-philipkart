import React, { useEffect, useState } from "react";
import Productcard from "../widget/Productcard";
import { Link } from "react-router-dom";

function Panelcontainer({ category }) {
  const [Data, setData] = useState();
  useEffect(() => {
    fetch(`http://localhost:5000/product/${category}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);
  return (
    <div className="container">
      <div className="panel1">
        <span>BEST OF {category}</span>
      </div>
      {Data ? (
        <Link to={`/seeall/${category}`}>
            <Productcard data={Data} />
        </Link>
      ) : (
        <span>loading..</span>
      )}
    </div>
  );
}

export default Panelcontainer;
