import React, { useState, useEffect } from "react";
import Listpanel from "../widget/Listpanel";
import { useParams } from "react-router-dom";

function Listproduct() {
  const { category } = useParams();
  // console.log(category);
  useEffect(() => {
    fetch(`process.env.backendURL/product/${category}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => setList(result))
      .catch((err) => console.log(err));
  }, [category]);

  const [List, setList] = useState();

  return (
    <div className="maincontainer">
      <div style={{ display: "flex", width: "100%" }}>
        <div className="FilterList">
          <div className="">
              <span>Sort By Price</span>
              <ul>
                 <li><input type="radio" name="price"/>Price Low to High</li>
                 <li><input type="radio" name="price"/>Price High to Low</li>
                 <li><input type="radio" name="price"/>Less than 5000</li>
              </ul>
          </div>
        </div>
        <div>
          {" "}
          <Listpanel data={List} />
        </div>
      </div>
    </div>
  );
}

export default Listproduct;
