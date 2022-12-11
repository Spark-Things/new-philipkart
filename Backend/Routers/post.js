const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const requireLogin = require("../middleware/RequireLogin");

router.get("/allproducts", (req, res) => {
  Post.find()
    .populate("author", "_id name email")
    .then((post) => res.json(post))
    .catch((err) => res.json({ error: err }));
});

router.post("/addproduct", requireLogin, (req, res) => {
  const { title, discription, price,category,Brand } = req.body;

  if (!title || !discription || !price || !category || !Brand) {
    res.json({ error: "please add all feild" });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    discription,
    price,
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


router.get("/product/:category",(req,res)=>{
  Post.find({category: req.params.category})
  .then(result => res.json(result))
  .catch(err => console.log(err))
});


router.get("/products/:id",(req,res) => {
   Post.findOne({_id :req.params.id})
   .then(result => res.json(result))
   .catch(err => res.json(err))

})



module.exports = router;
