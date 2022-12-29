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
              <h5>{item.title}</h5>
             </div>
             <div className='detailcontainer'>
                 <h3>{item.price}</h3>
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