import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <span className="logo">Philipkart</span>
        </Link>
           <div className="SeachbarContainer">
             <input className="Seachbar" type="search" name="" id="" placeholder="Search" />
           </div>
        <div>
          <Link to="/cart">
            <span>Cart</span>
          </Link>
          <Link to="/wishlist">
            {" "}
            <span>wishlist</span>
          </Link>

          <Link to="/Addproduct">
            <span>Add product</span>
          </Link>
          {localStorage.getItem("User") ? (
            <Link to="/profile">
              <span>Profile</span>
            </Link>
          ) : (
            <Link to="/Signin">
              <span>SignIn</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
