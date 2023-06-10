import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Checkoutpage from "./Checkoutpage";
import StripeCheckout from "react-stripe-checkout";

function Cartpage() {
  const [items, setitems] = useState();
  const [Checkout, setCheckout] = useState(false);
  let  productprice = 0;
  var TotalAmount = 0;

  useEffect(() => {
    fetch("process.env.backendURLgetcartItems", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setitems(result.cart);
      });
  }, []);

  const removeFromcart = (id) => {
    fetch(`process.env.backendURLdeleteItem/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json ",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setitems(result);
      });
  };

  const handleCheckout = (paymentInfo) => {
    console.log(paymentInfo);
    fetch("process.env.backendURLpayment", {
      method: "POST",
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        paymentInfo,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };

  return (
    <div className="Cartscreen">
      <div className="listContainer">
        {items ? (
          items.map((product, index) => {
            productprice = product?.price*product?.Quantity;
            TotalAmount += productprice;
            return (
              <div className="pList" key={index}>
                <div>
                  <img src={product.photo} />
                  <Link to={`/products/${product._id}`}>
                    <div className="ttc">
                      <span>{product?.title}</span>
                      <p>{product?.discription}</p>
                    </div>
                  </Link>
                </div>
                <span>{product?.Quantity}</span>
                <span>₹{product?.price}</span>
                <button onClick={() => removeFromcart(product?._id)}>
                  {" "}
                  Remove
                </button>
              </div>
            );
          })
        ) : (
          <a>Your cart Is empty</a>
        )}
      </div>
      <div className="checkoutContainer">
        <span className="totalAmount">₹ {TotalAmount}</span>
        <StripeCheckout
          name="my_store"
          amount={TotalAmount * 100}
          image={items ? items[0]?.photo : null}
          currency="INR"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          stripeKey="pk_test_51KwjDaSEPDWRfwRTTQbKmjZBYnK1nYwuCeX98OY8msPZ6vTkaGRYlZQAKoJPHOTWJyzeSRMsPij0cH4xQk7K59vg00VOY0HoXK"
          token={(payInfo) => handleCheckout(payInfo)}
        >
          <button onClick={() => setCheckout(true)}>CheckOut</button>
        </StripeCheckout>
      </div>
    </div>
  );
}

export default Cartpage;
