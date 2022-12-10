import { useState } from 'react'
import './App.css'
import Navbar from '../src/component/Navbar';
import Home from '../src/component/Home';
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import Listproduct from './component/Listproduct';
import Productdetail from './component/Productdetail';
import Profile from './component/Profile';
import Addproduct from './component/Addproduct';

function App() {
  return (
    <div className='App'>
           <Router>
           <Navbar />
           {/* <Home/> */}
            <Routes>
              <Route path='/' exact  element={<Home/>}/>
              <Route path='/seeall/:category' element={<Listproduct />}/>
              <Route path='/products/:id' element={<Productdetail/>} />
              <Route path='/profile' element={<Profile/>} />
              <Route path='/Addproduct' element={<Addproduct />} />
              </Routes>
           </Router>
    </div>
  )
}

export default App
