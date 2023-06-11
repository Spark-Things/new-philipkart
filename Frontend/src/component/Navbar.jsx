import React,{useState} from "react";
import { Link } from "react-router-dom";
import Searchcontent from "../widget/Searchcontent";

function Navbar() {

   const [search, setsearch] = useState();
   const [searchResult, setsearchResult] = useState()

   const fetchSearch = (query) => {
    setsearch(query)
    fetch('https://philipkart.onrender.com/search-result',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({ 
        query
      })
    })
    .then(res => res.json())
    .then(result => {
     setsearchResult(result.item);
     console.log(result.item);
    })
    .catch(err => console.log(err))
   }

  return (
    <>
      <div className="navbar">
        <Link to="/">
          <span className="logo">Philipkart</span>
        </Link>
           <div className="SeachbarContainer">
              <input className="Seachbar" type="search" name="" id="" placeholder="Search here" 
              onChange={(e) => fetchSearch(e.target.value) }/>
               {search ? <Searchcontent searchData={searchResult} /> : null}
           </div>
        <div className="rn">
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
