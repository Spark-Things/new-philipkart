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


  const addtoCart = () => {
    fetch(`http://localhost:5000/addtocart/${id}`,{
      method: "POST",
      headers : {
        "Content-type": "application/json",
        "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzkzMDFhZThiODA5NDkwOGQ1NjQzNGUiLCJpYXQiOjE2NzA1ODE1NjB9.wyYZqVjMdsMI4b9IaZ6Ygs8Rj75yeUIfDLMdcvUvuxM"
      }
    })
    .then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }



  return (
    <div className="productdetailconatiner">
      <div className="productImageConatiner"></div>
      <div className="productdiscConatiner">
        {product ? <h4>{product.title}</h4> : <span>Loading...</span>}
        <button onClick={() => addtoCart()}>Add to cart</button>
      </div>
    </div>
  );
}

export default Productdetail;
