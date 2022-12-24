import React, { useState, useEffect } from "react";

function Wishlist() {
  const [list, setlist] = useState();

  useEffect(() => {
    fetch("http://localhost:5000/getWishlist", {
      method: "get",
      headers: {
        "Content-type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2E3MWI4MWU2M2M1OTkzZTAzMzg2MjMiLCJpYXQiOjE2NzE4OTU5NDN9.JAK0FHaYBUiDQxJDQJHarYQrjCiUewhDTTkiPDpOdVE",
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
