const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../config/Keys");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/RequireLogin");
const {v4} = require('uuid');
const stripe = require('stripe')("sk_test_51KwjDaSEPDWRfwRTNP0dRnmZZ0nj2sclaIwtF4KEr58wfHyedg9bAc1f0BFEbjGlgM6hvZJyfCSnziHa7QoX0Ipr00ir9sEeSj");


router.get("/checkout", requireLogin, (req, res) => {
  res.json({ msg: "tum to bade paise vale ho" });
});

router.post("/signup", (req, res) => {
  const { name, email, password, cnfpassword } = req.body;

  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  ) {
    return res.json({ error: "Invalid Email" });
  }
  if (!name || !email || !password || !cnfpassword) {
    return res.json({ error: "pehle dang se form bhar le jyada hero mat ban" });
  }

  if (password !== cnfpassword) {
    return res.json({
      error:
        "Dono Password same daal , tuje kya laga validation nahi rakha hoga !!",
    });
  }
  bcrypt
    .hash(password, 12)
    .then((hashedpassword) => {
      User.findOne({ email: email }).then((savedUser) => {
        if (savedUser) {
          return res.json({ error: "Tu fir aa gaya tu jaa ree signin kar" });
        }
        const user = new User({
          name,
          email,
          password: hashedpassword,
        });

        user.save()
          .then(res.json({ msg: "saved user successfully" }))
          .catch((err) => {
            res.json({ error: err });
          });
      });
    })

    .catch((err) => {
      res.json({ error: err });
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  ) {
    return res.json("Invalid Email");
  }
  if (email == undefined || password == undefined) {
    return res.status(402).send("Enter valid email and password");
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.send({ msg: "Please signup first" });
      } else {
        bcrypt.compare(password, savedUser.password).then((doMatch) => {
          if (doMatch) {
            // res.json({msg : "Successfully Logged In"})
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            const { email, name, _id } = savedUser;
            res.json({ token: token, user: { email, name, _id } });
          } else {
            res.json({ msg: "Enter valid email and password" });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/myprofile", requireLogin, (req, res) => {
  const { _id } = req.user;
  User.findById({ _id})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.post("/payment",requireLogin,(req,res) => {
  const user = req.user;
  const {paymentInfo} = req.body;
  console.log(paymentInfo.id);
  if(!user){
     return res.status(301).json({error : "you must have logged in"});
  }
  User.findOne({_id : user._id}).populate("cart")
  .then((result) => {
    let price = 0
    result.cart.forEach(item => {
       price = price + item.Quantity*item.price
    })

    const prevCustomer = stripe.customers.list({email:paymentInfo.email})
    const isExitingCustomer = prevCustomer?.data?.length > 0;
     let newCustomer
    if(!isExitingCustomer){
        let email = paymentInfo?.email
        let source = paymentInfo?.id
       newCustomer = stripe.customers.create({email, source})
    }
     
    const charge = stripe.charges.create({
      currency:"INR",
      amount: price*100,
      receipt_email: paymentInfo?.email,
      customer: isExitingCustomer? prevCustomer?.data[0]?.id : newCustomer?.id,
      discription: "payment done"
    },{
      idemtotencykey:v4()
    })
    res.status(200).json({msg:"Payment is successful"})
  })
})


if(process.env.NODE_ENV == 'production'){
  const path = require('path');
   router.get('/',(res,req) => {
    router.use(express.static(path.resolve(__dirname,'client','build')));
    res.sendFile(path.resolve(__dirname,'Frontend','build','index.html'))
   })
}

module.exports = router;
