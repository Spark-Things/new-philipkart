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
      .then((result) => {
        setproduct(result);
      });
  }, []);

  const addtoCart = () => {
    fetch(`http://localhost:5000/addtocart/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const addtoWishlist = () => {
    fetch(`http://localhost:5000/addtowishlist/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="productdetailconatiner">
      <div className="productImageConatiner"></div>
      <div className="productdiscConatiner">
        {product ? (
          <span className="title">{product.title}</span>
        ) : (
          <span>Loading...</span>
        )}
        <em>Special price</em>
        {product ? <h1>₹{product.price}</h1> : <span>Loading...</span>}
        {product ? <p>{product.discription}</p> : <span>Loading...</span>}

        <div>
          <button
            onClick={() => addtoCart()}
            style={{ backgroundColor: "rgb(30, 116, 255)" }}
          >
            Add to cart
          </button>
          <button
            onClick={() => addtoWishlist()}
            style={{ backgroundColor: " rgb(22, 232, 255)" }}
          >
            Add to wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productdetail;
