const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config/Keys');
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    //authorization === Bearer json-token like fsdhlkasdfsdahfghjfbsjfgjfsdjfhfgaskfgsdjfsd
    return res.status(401).json({ error: "you must loged in" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "you must loged in" });
    }
    const { _id } = payload;
    User.findById(_id).then((userdata) => {
      // console.log(userdata);
      req.user = userdata;
      next();
    });
  });
};
