import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Wishlist() {
  const [list, setlist] = useState([]);
  var TotalAmount = 0;

  useEffect(() => {
    fetch("https://new-philipkart.vercel.app/getWishlist", {
      method: "get",
      headers: {
        "Content-type": "application/json",
        "authorization" : "Bearer " + localStorage.getItem("jwt")
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setlist(result);
        console.log(result);
      })
      .catch((err) => console.log(err));
  }, []);

  const removeFromWishlist = (id) => {
    fetch(`https://new-philipkart.vercel.app/deleteItemfromWishlist/${id}`,{
      method:"delete",
      headers: {
        "Content-Type": "application/json ",
        authorization : "Bearer " + localStorage.getItem("jwt")
      },
    })
    .then((res) => res.json())
    .then((result) => {
      // console.log(result);
      setlist(result)
    })
  }

  return (
    <div className="Cartscreen">
    <div className="listContainer">
      {list.length > 0 ? (
        list.map((product, index) => {
          TotalAmount += product?.price;
          return (
            <div className="pList" key={index}>
              <div>
                <img src={product?.photo} /> 
                <Link to={`/products/${product?._id}`}>
                  <div className="ttc">
                    <span>{product?.title}</span>
                    <p>{product?.discription}</p>
                  </div>
                </Link>
              </div>
              <span>1</span>
              <span>₹{product?.price}</span>
              <button onClick={() => removeFromWishlist(product?._id)}>  Remove
              </button>
            </div>
          );
        })
      ) : (
        <a>Your cart Is empty</a>
      )}
    </div>
    <div className="checkoutContainer">
       <span className="totalAmount">₹ {TotalAmount}</span>
         <Link to={"/checkout"}>
           <button>Buy Now</button>
        </Link>
    </div>
  </div>
  );
}

export default Wishlist;
