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
        <span>Best Of {category}</span>
        <Link to={`/seeall/${category}`}>
            <button>See All</button>
        </Link>
      </div>
            <Productcard data={Data} />
    </div>
  );
}

export default Panelcontainer;
