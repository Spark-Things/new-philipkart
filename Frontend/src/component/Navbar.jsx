import React from 'react';
import { Link } from 'react-router-dom'

function Navbar() {
  return (
   <>
      <div className='navbar'>
             <a>LOGO</a>
             <div>
                   <a>ABOUT</a>
                   <a>Cart</a>
                   <a>wishlist</a>
                   <Link to="/Addproduct">
                   <a>Add product</a>
                   </Link>
                   <Link to="/profile">
                       <span>Profile</span>
                   </Link>
             </div>
      </div>   
   </>
   )
}

export default Navbar