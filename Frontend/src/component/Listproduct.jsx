import React, { useState, useEffect } from "react";
import Listpanel from "../widget/Listpanel";
import { useParams } from "react-router-dom";

function Listproduct() {
  const { category } = useParams();
  // console.log(category);
  useEffect(() => {
    fetch(`http://localhost:5000/product/${category}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => setList(result))
      .catch((err) => console.log(err));
  }, []);

  const [List, setList] = useState();

  return (
    <div className="maincontainer">
      list
      <Listpanel data={List} />
    </div>
  );
}

export default Listproduct;
