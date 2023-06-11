import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

function Profile() {
  const [User, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("process.env.backendURL/myprofile", {
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
    navigate('/');
  };

  console.log(User);

  return (
    <div className="profilecontainer">
         <div className="header">
           <span className="User">Hello,<span>{User?.name}</span></span>
           <button onClick={onLogout}>Logout</button>
         </div>
        <div className="OrderContainer">
            <span>Your Orders</span>
            <div className="">
                 You have No Order Previously
            </div>
        </div>
    </div>
  );
}

export default Profile;
