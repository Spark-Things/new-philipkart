import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signinpage() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const navigate = useNavigate();

  const login = () => {
    fetch("process.env.backendURL/signin", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.msg) {
          console.log(result.msg);
          return;
        } else {
          localStorage.setItem("jwt", result.token);
          localStorage.setItem("User", JSON.stringify(result.user));
          if (
            localStorage.getItem("User") != undefined &&
            localStorage.getItem("jwt") != undefined
          ) {
            navigate("/");
          }
          console.log(result);
          console.log(result.user);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="LoginpageScreen">
      <div>
        <div className="">
          <label htmlFor="email">Email : </label>
          <input
            type="text"
            name="email"
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="password">password : </label>
          <input
            type="password"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <button className="loginbtn" onClick={() => login()}>
          Login
        </button>

        <span>
          New User ? <Link to="/Signup">Sign Up here</Link>
        </span>
      </div>
    </div>
  );
}

export default Signinpage;
