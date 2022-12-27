import React, { useState, useEffect } from "react";

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

  return(
    <div>
       {list ? list.map((item) => {
         return(
           <span>{item.title}</span>
         )
       }) : <span>Losding.....</span>}
    </div>
  );
}

export default Wishlist;
