import React, { useState, useEffect } from "react";

function Profile() {
  const [User, setUser] = useState();
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
        setUser(result),
          // console.log(result);
          console.log(User);
      })
      .catch(err => console.log(err))
  }, []);

  const onLogout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("jwt");
  };

  console.log(User);

  return (
    <div className="profilrcontainer">
        <span className="">Hello ,{User?.name}</span>
      <br />

      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Profile;
