import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cartpage() {
  const [items, setitems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/getcartItems", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setitems(result.cart);
        console.log(result);
      });
  }, []);

  const removeFromcart = (id) => {
    fetch(`http://localhost:5000/deleteItem/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json ",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setitems(result);
      });
  };

  return (
    <div className="Cartscreen">
      <div>
        {items.length > 0 ? (
          items.map((product, index) => {
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
        ) : (
          <a>Your cart Is empty</a>
        )}
      </div>
      <Link to={"/checkout"}>
        <button>CheckOut</button>
      </Link>
    </div>
  );
}

export default Cartpage;
