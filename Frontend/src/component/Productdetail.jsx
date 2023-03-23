import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Productdetail() {
  const { id } = useParams();
  const [product, setproduct] = useState();
  const [Quantity, setQuantity] = useState(1);

  if(Quantity < 1){
    setQuantity(1);
  }

  var Op =  Math.floor(Math.random()*10000);

  function getDiscount(Op,price){
    var ans = (price*100)/Op;
    console.log(ans);
    return 100 - Math.floor(ans);
  }


  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setproduct(result);
      });
  }, []);

  const addtoCart = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/addtocart/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  const addtoWishlist = (id) => {
    fetch(`http://localhost:5000/addtowishlist/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div className="productdetailconatiner">
      <div className="productImageConatiner">
        <img src={product?.photo} />
      </div>
      <div className="productdiscConatiner">
        {product ? (
          <span className="title">{product.title}</span>
        ) : (
          <span>Loading...</span>
        )}
        <em>Special price</em>
        <div className="prices">
        {product ? <h1>₹{product?.price}</h1> : <span>Loading...</span>}
          <span>Rs. {product?.price + 5500}</span> 
          <span className="discount">SAVE {getDiscount(product?.price + 5500,product?.price)} %</span>
        </div>
        {product ? <p>{product?.discription}</p> : <span>Loading...</span>}
         <div>
              <button onClick={() => setQuantity(Quantity -1)} className="quentityBtn"> - </button>
                <span>{ Quantity }</span>
             <button  onClick={() => setQuantity(Quantity + 1)} className="quentityBtn"> + </button>
         </div>
        <div>
          <button
            onClick={() => addtoCart(product._id)}
            style={{ backgroundColor: "rgb(30, 116, 255)" }}
          >
            Add to cart
          </button>
          <button
            onClick={() => addtoWishlist(product._id)}
            style={{ backgroundColor: "rgb(255, 183, 76)" }}
          >
            Add to wishlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productdetail;
