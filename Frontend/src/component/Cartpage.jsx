import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cartpage() {
  const [items, setitems] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/getcartItems", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "authorization" : "Bearer " +localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setitems(result);
        console.log(result);
      });
  }, []);

  return (
    <div>
      <div>
        {items ? (
          items.map((product) => {
            return (
              <Link to={`/products/${product._id}`}>
                <div className="">
                  <a>{product.title}</a>
                </div>
              </Link>
            );
          })
        ) : (
          <a>Loding...</a>
        )}
      </div>
      <Link to={"/checkout"}>
        <button>CheckOut</button>
      </Link>
    </div>
  );
}

export default Cartpage;
