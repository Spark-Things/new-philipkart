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
        "authorization" : "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res => res.json())
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

  const addtoWishlist = () => {
    fetch(`http://localhost:5000/addtowishlist/${id}`,{
      method: "POST",
      headers : {
        "Content-type": "application/json",
        "authorization" : "Bearer " + localStorage.getItem("jwt")
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
        <button onClick={() => addtoWishlist()}>Add to wishlist</button>
      </div>
    </div>
  );
}

export default Productdetail;
