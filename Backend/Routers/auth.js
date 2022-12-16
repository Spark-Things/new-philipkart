const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../Keys");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/RequireLogin");

router.get("/checkout", requireLogin, (req, res) => {
  res.json({ msg: "tum to bade paise vale ho" });
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ error: "pehle dang se form bhar le jyada hero mat ban" });
  } else {
    bcrypt
      .hash(password, 12)
      .then((hashedpassword) => {
        User.findOne({ email: email }).then((savedUser) => {
          if (savedUser) {
           return res.json({ Error: "Tu fir aa gaya tu jaa ree signin kar" });
          }

          const user = new User({
            name,
            email,
            password: hashedpassword,
          });

          user
            .save()
            .then(
              res.json({ msg: "saved user successfully" }))
            .catch((err) => {
              res.json({ error: err });
            });
        });
      })

      .catch((err) => {
        res.json({ error: err });
      });
  }
});

router.post("/signin", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (email == undefined || password == undefined) {
    res.status(402).send("Enter valid email and password");
  } else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (!savedUser) {
          return res.send({ msg: "Please signup first" });
        } else {
          bcrypt.compare(password, savedUser.password).then((doMatch) => {
            if (doMatch) {
              // res.json({msg : "Successfully Logged In"})
              const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
              res.json({ token: token });
            } else {
              res.json({ msg: "Enter valid email and password" });
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = router;
