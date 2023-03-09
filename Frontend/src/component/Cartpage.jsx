import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cartpage() {
  const [items, setitems] = useState();

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
        // console.log(result);
      });
  }, []);

  const removeFromcart = (id) => {
    fetch(`http://localhost:5000/deleteItem/${id}`,{
      method:"put",
      headers: {
        "Content-Type": "application/json ",
        authorization : "Bearer " + localStorage.getItem("jwt")
      },
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      setitems(result)
    })
  }


  return (
    <div  className="Cartscreen">
      <div>
        {items ? (
          items.map((product) => {
            return (
              <Link to={`/products/${product._id}`}>
                <div className="pList">
                  <span>{product?.title}</span>
                  <button onClick={() => removeFromcart(product?._id)}>Remove</button>
                </div>
               </Link>
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
