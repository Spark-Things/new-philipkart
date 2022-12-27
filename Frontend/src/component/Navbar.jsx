import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <a>garibkart</a>
        </Link>

        <div>
          <Link to="/search">
            <a>Search</a>
          </Link>
          <Link to="/cart">
            <a>Cart</a>
          </Link>
          <Link to="/wishlist">   <a>wishlist</a></Link>
       
          <Link to="/Addproduct">
            <a>Add product</a>
          </Link>
          <Link to="/Signin">
            <a>SignIn</a>
          </Link>
          <Link to="/Signup">
            <a>SignUp</a>
          </Link>
          <Link to="/profile">
            <span>Profile</span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
