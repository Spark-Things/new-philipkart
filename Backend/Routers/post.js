const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require("../middleware/RequireLogin");
const cloudinary = require("../Cloudinary");

router.get("/allproducts", (req, res) => {
  Post.find()
    .populate("author", "_id name email")
    .then((post) => res.json(post))
    .catch((err) => res.json({ error: err }));
});

router.post("/addproduct", requireLogin, async (req, res) => {
  const { title, discription, price, category, Brand,image} = req.body;

  const result = await cloudinary.uploader.upload(image, {
    folder: "philipkart"
  });

  if (!title || !discription || !price || !category || !Brand) {
    res.json({ error: "please add all feild" });
  }

  console.log(result.secure_url);

  req.user.password = undefined;
  const post = new Post({
    title,
    discription,
    price,
    image: {
      url: result.secure_url
    },
    category,
    Brand,
    author: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      res.json({ error: err });
    });
});

router.get("/myproducts", requireLogin, (req, res) => {
  Post.find({ author: req.user._id })
    .populate("author", "_id name email")
    .then((result) => res.json({ result }))
    .catch((err) => res.json({ error: err }));
});

router.get("/product/:category", (req, res) => {
  Post.find({ category: req.params.category })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.get("/products/:id", (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
