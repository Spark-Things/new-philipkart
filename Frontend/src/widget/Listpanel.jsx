import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import '../Sass/Listpanel.css'

function Listpanel({data}) {

  return (
    <>
   {data ? data.map((item) =>
      {
        return(
          <Link to={`/products/${item._id}`}>
          <div className='Lcontainer'>
             <div className='imgConatiner'>
               
             </div>
             <div className='ppdetailcontainer'>
               <h2>{item.title}</h2>
               <p>{item.discription}</p>
             </div>
             <div className='detailcontainer'>
                 <h2>₹{item.price}</h2>
                 <span>free delivery</span>
                 <h4>Top Discount On Sale</h4>
                 <h5>upto ₹5200 off on Exchange</h5>
             </div>
          </div>
          </Link>
        )
      }
    
    ) : <span>loading..</span> }
    </>
  )
}

export default Listpanel