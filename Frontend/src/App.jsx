import { useState } from 'react'
import './Sass/App.css'
import Navbar from '../src/component/Navbar';
import Home from '../src/component/Home';
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import Listproduct from './component/Listproduct';
import Productdetail from './component/Productdetail';
import Profile from './component/Profile';
import Addproduct from './component/Addproduct';
import CategoryTab from './component/CategoryTab';
import Cartpage from './component/Cartpage';
import Signinpage from './component/Signinpage';
import Signuppage from './component/Signuppage';
import Checkoutpage from './component/Checkoutpage';
import SearchBar from './widget/SearchBar';
import Wishlist from './component/Wishlist';

function App() {
  return (
    <div className='App'>
           <Router>
           <Navbar />
           <CategoryTab />
           {/* <Home/> */}
            <Routes>
              <Route path='/' exact  element={<Home/>}/>
              <Route path='/seeall/:category' element={<Listproduct />}/>
              <Route path='/products/:id' element={<Productdetail/>} />
              <Route path='/profile' element={<Profile/>} />
              <Route path='/Addproduct' element={<Addproduct />} />
              <Route path='/cart' element={<Cartpage />} />
              <Route path='/Signin' element={<Signinpage />} />
              <Route path='/Signup' element={<Signuppage />} />
              <Route path='/Checkout' element={<Checkoutpage />} />
              <Route path='/search' element={<SearchBar />}/>
              <Route path='/wishlist' element={<Wishlist />}/>
              </Routes>
           </Router>
    </div>
  )
}

export default App
