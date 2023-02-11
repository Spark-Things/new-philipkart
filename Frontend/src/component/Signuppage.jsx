import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

function Signuppage() {

  // const [email, setemail] = useState();
  // const [password, setpassword] = useState();
  // const [cnfpassword, setCnfpassword] = useState();
  // const [name, setname] = useState();

  const navigate = useNavigate();

  const signup = () => {
     const name = document.getElementById("name").value;
     const password = document.getElementById("password").value;
     const email = document.getElementById("email").value;
     const cnfpassword = document.getElementById("cnfpassword").value;

    fetch("http://localhost:5000/signup",{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body: JSON.stringify({
          name,
          email,
          password,
          cnfpassword
      })
    })
    .then(res => res.json())
    .then(result =>
      { 
        if(result.error){
            document.getElementById('error').innerHTML = `<span>${result.error}</span>`;
        }else{
          console.log(result);
          navigate("/Signin");
        }
      
      })
    .catch(err => {
      console.log(err);
  
    })
  }
  return (
    <div className="LoginpageScreen">
      <div>
      <div className="">
        <label htmlFor="name">Name : </label>
        <input
          type="password"
          name="name"
          id='name'
          placeholder='Eg. Tony Stark'
          // onChange={(e) => setname(e.target.value)}
        />
      </div>
      <div className="">
        <label htmlFor="email">Email : </label>
        <input
          type="password"
          id='email'
          name="email"
          placeholder='Eg. tonystark3000@gmail.com'
          // onChange={(e) => setemail(e.target.value)}
        />
      </div>
      <div className="">
        <label htmlFor="password">password : </label>
        <input
          type="text"
          id='password'
          name="password"
          // onChange={(e) => setpassword(e.target.value)}
        />
      </div>
      <div className="">
        <label htmlFor="cnfpassword">Confirm password : </label>
        <input
          type="text"
          id='cnfpassword'
          name='cnfpassword'
          // onChange={(e) => setCnfpassword(e.target.value)}
        />
      </div>
      <button className="loginbtn" onClick={() => signup()}>
        Signup
      </button>


      <div className="" id='error'>
          
      </div>
      <span>Already a Customer ? <Link to="/signin">Sign in here</Link></span>
      </div>
    </div>
  )
}

export default Signuppage