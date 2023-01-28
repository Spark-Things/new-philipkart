import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Wishlist() {
  const [list, setlist] = useState();

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
  return (
    <div  className="Cartscreen">
      <div>
      {list ? (list.map((item) => {
         return(
              <Link to={`/products/${item._id}`}>
                <div className="pList">
                  <span>{item.title}</span>
                  <button>Remove</button>
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

export default Wishlist;
