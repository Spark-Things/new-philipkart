import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Wishlist() {
  const [list, setlist] = useState([]);
  var total = 0;

  useEffect(() => {
    fetch("http://localhost:5000/getWishlist", {
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

  const removeFromcart = (id) => {
    fetch(`http://localhost:5000/deleteItemfromWishlist/${id}`,{
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
    <div  className="Cartscreen">
      <div>
        {list.length > 0 ? (
          (
            list.map((product, index) => {
                 total = total + product?.price
              return (
                <div className="pList" key={index}>
                  <div>
                    <img src={product.photo} /> 
                    <Link to={`/products/${product._id}`}>
                      <div className="ttc">
                        <span>{product?.title}</span>
                        <p>{product?.discription}</p>
                      </div>
                    </Link>
                  </div>
                  <span>₹{product?.price}</span>
                  <button onClick={() => removeFromcart(product?._id)}>
                    Remove
                  </button>
                </div>
              );
            })
          ) 
        ) : (
          <a>Your wishlist Is empty</a>
        )}
      </div>
      <div>
      <span>{total}</span><br/>
      <Link to={"/checkout"}>
        <button>CheckOut</button>
      </Link>
      </div>
    </div>
  );
}

export default Wishlist;
