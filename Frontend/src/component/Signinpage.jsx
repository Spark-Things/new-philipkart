import React, { useState } from "react";

function Signinpage() {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const login = () => {
    fetch("http://localhost:5000/signin", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => console.log(res.json()))
      .catch((err) => console.log(err));
  };
  return (
    <div className="">
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
    </div>
  );
}

export default Signinpage;
