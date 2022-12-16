import React,{useState} from 'react'

function Signuppage() {

  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [name, setname] = useState()

  const signup = () => {
    fetch("http://localhost:5000/signup",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body: JSON.stringify({
          email,
          password,
          name
      })
    }).then(res => console.log(res.json()))
    .catch(err => console.log(err))
  }
  return (
    <div className="">
      <div className="">
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          name="name"
          onChange={(e) => setname(e.target.value)}
        />
      </div>
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
      <button className="loginbtn" onClick={() => signup()}>
        Signup
      </button>
    </div>
  )
}

export default Signuppage