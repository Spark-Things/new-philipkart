import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Productdetail() {
  const { id } = useParams();
  const [product, setproduct] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => 
      { setproduct(result) });
  }, []);

  return (
    <div className="productdetailconatiner">
      <div className="productImageConatiner"></div>
      <div className="productdiscConatiner">
        {product ? <h4>{product.title}</h4> : <span>Loading...</span>}
      </div>
    </div>
  );
}

export default Productdetail;
