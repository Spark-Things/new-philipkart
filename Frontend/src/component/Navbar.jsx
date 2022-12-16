import React from 'react';
import { Link } from 'react-router-dom'

function Navbar() {
  return (
   <>
      <div className='navbar'>
         <Link to="/">
            <a>LOGO</a>
         </Link>
             
             <div>
                   <a>ABOUT</a>
                   <Link to="/cart">
                      <a>Cart</a>
                   </Link>
                  
                   <a>wishlist</a>
                   <Link to="/Addproduct">
                   <a>Add product</a>
                   </Link>

                   <Link to="/Signin"><a>SignIn</a></Link>
                   <Link to="/Signup"><a>SignUp</a></Link>
                   <Link to="/profile">
                       <span>Profile</span>
                   </Link>
             </div>
      </div>   
   </>
   )
}

export default Navbar