const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const User = mongoose.model("User");
const requireLogin = require("../middleware/RequireLogin");
const cloudinary = require("../Cloudinary");

router.get("/allproducts", (req, res) => {
  Post.find()
    .populate("author", "_id name email")
    .then((post) => res.json(post))
    .catch((err) => res.json({ error: err }));
});

router.post("/addproduct", requireLogin, async (req, res) => {
  const { title, discription, price, category, Brand, image } = req.body;

  // const result = await cloudinary.uploader.upload(image, {
  //   folder: "philipkart"
  // });

  if (!title || !discription || !price || !category || !Brand) {
    res.json({ error: "please add all feild" });
  }

  // console.log(result.secure_url);

  req.user.password = undefined;
  const post = new Post({
    title,
    discription,
    price,
    image,
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

router.post("/addtocart/:id", requireLogin, (req, res) => {
  Post.find({ _id: req.params.id }).then((result) => {
    //  res.json(result);
    User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $push: { cart: result[0] },
      },
      { new: true }
    )
      .select("email name _id cart wishlist")
      .exec((err, result) => {
        if (err) return res.json(err);
        else {
          res.json(result);
        }
      });
  });
});

router.post("/addtowishlist/:id", requireLogin, (req, res) => {
  Post.find({ _id: req.params.id }).then((result) => {
    User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $push: { wishlist: result[0] },
      },
      { new: true }
    )
      .select("email name _id cart wishlist")
      .exec((err, result) => {
        if (err) return res.json(err);
        else {
          res.json(result);
        }
      });
  });
});

router.delete("/deleteItem/:id", requireLogin, (req, res) => {
  User.findById({ _id: req.user._id })
  .populate("cart","_id")
  .exec((err,item) => {
    if(err || !item){
       return res.status(422).json({error : err})
    }

     if(item.cart._id.toString() == req.params.id.toString()){
      console.log("hii");
     }

  })
  // .then((result) => {
  //   result.cart.filter((item) => {
  //     // console.log(item.id);
  //     console.log(item);
  //     console.log(req.params.id);

  //     if (item._id == req.params.id) {
  //       item
  //         .remove()
  //         .then((result) => res.json(result))
  //         .catch((err) => res.json(err));
  //     }else{
  //       console.log("LLG");
  //     }
  //   });
  });

  // Post.findByIdAndRemove({ _id: req.params.id }).then((result) => {
  //   User.findById({ _id: req.user._id },{
  //     $pull: {cart: result._id}
  //   })
  //   .populate("cart")
  //   .exec((err, user) => {
  //     if (err || !user) {
  //       return res.json({ error: err });
  //     }else{
  //       res.json(user)
  //     }
  // res.json(user.cart);
  // console.log(result.id);

  // user.cart.map((item) => {
  //   console.log(item._id.slice(""));
  // })
  // user.cart.map((item) => {
  //   if (item.id == result.id) {
  //     console.log("cumming");
  //     item
  //       .delete()
  //       .then((result) => res.json(result))
  //       .catch((err) => res.json(err));
  //   } else {
  //     console.log(user.cart);
  //     console.log("itemid", item.id);
  //     console.log(result.id);
  //   }
  // });
  // });
  // });
// });

router.get("/getcartItems", requireLogin, (req, res) => {
  User.findById({ _id: req.user._id })
    .then((result) => res.json(result.cart))
    .catch((err) => res.json(err));
});

router.get("/getWishlist", requireLogin, (req, res) => {
  User.findById({ _id: req.user._id })
    .then((result) => res.json(result.wishlist))
    .catch((err) => res.json(err));
});

module.exports = router;
