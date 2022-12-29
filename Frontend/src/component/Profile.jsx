import React, { useState, useEffect } from "react";

function Profile() {
  useEffect(() => {
    fetch("http://localhost:5000/myprofile", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUser(result);
        console.log(User);
      });
  }, []);

  const [User, setUser] = useState([]);

  console.log(User);

  return (
    <div className="profilrcontainer">
      { User.length > 0 ? (
        User.map((data) => {
          return <span>{data.name}</span>;
        })
      ) : (
        <span>Loading .. .. .. .. .. .. </span>
      )}
      <span>hello spark</span>
    </div>
  );
}

export default Profile;
